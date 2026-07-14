import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(rootDirectory, 'packages/components/dist');
const componentsDirectory = path.join(rootDirectory, 'packages/components');
const expectedFiles = [
  'index.cjs',
  'index.cjs.map',
  'index.d.ts',
  'index.mjs',
  'index.mjs.map',
  'style.css',
];

await Promise.all(expectedFiles.map((file) => access(path.join(outputDirectory, file))));

const esmEntry = await import(pathToFileURL(path.join(outputDirectory, 'index.mjs')).href);
const require = createRequire(import.meta.url);
const cjsEntry = require(path.join(outputDirectory, 'index.cjs'));
const css = await readFile(path.join(outputDirectory, 'style.css'), 'utf8');

if (!esmEntry.mobileRootStyles || !cjsEntry.mobileRootStyles) {
  throw new Error('The ESM or CJS entry did not expose the expected public API.');
}

for (const exportName of [
  'Button',
  'Dialog',
  'Icon',
  'Image',
  'Input',
  'Loading',
  'Overlay',
  'Popup',
  'Textarea',
  'Toast',
  'brandTheme',
  'colors',
  'darkTheme',
  'fade',
  'hairline',
  'px2rem',
  'safeArea',
  'scale',
  'slideUp',
  'spacing',
  'textOverflow',
  'useClickAway',
  'useControllableValue',
  'useKeyboard',
  'useLazyRender',
  'useLockScroll',
  'useMountedRef',
  'useScroll',
  'useTap',
  'waitForFont',
]) {
  if (!esmEntry[exportName] || !cjsEntry[exportName]) {
    throw new Error(`The ESM or CJS entry is missing the ${exportName} export.`);
  }
}

const cssGzipBytes = gzipSync(css).byteLength;
const cssGzipLimit = 30 * 1024;

if (cssGzipBytes >= cssGzipLimit) {
  throw new Error(
    `The production CSS is ${(cssGzipBytes / 1024).toFixed(2)} KiB gzip, exceeding the 30 KiB limit.`,
  );
}

const declarationFiles = await readdir(outputDirectory, { recursive: true });
if (declarationFiles.some((file) => file.startsWith('demo/') || file.startsWith('test/'))) {
  throw new Error('Internal demo or test declarations leaked into the published package.');
}

for (const sourceMapFile of ['index.cjs.map', 'index.mjs.map']) {
  const sourceMap = JSON.parse(await readFile(path.join(outputDirectory, sourceMapFile), 'utf8'));
  if (!Array.isArray(sourceMap.sources) || sourceMap.sources.length === 0) {
    throw new Error(`${sourceMapFile} does not contain source mappings.`);
  }
}

const temporaryDirectory = await mkdtemp(path.join(tmpdir(), 'react-mobile-c-treeshake-'));
try {
  const consumerEntry = path.join(temporaryDirectory, 'entry.mjs');
  const fullConsumerEntry = path.join(temporaryDirectory, 'full-entry.mjs');
  const packageScopeDirectory = path.join(temporaryDirectory, 'node_modules/@react-mobile-c');
  await mkdir(packageScopeDirectory, { recursive: true });
  await symlink(componentsDirectory, path.join(packageScopeDirectory, 'components'), 'dir');
  await writeFile(
    consumerEntry,
    "import { Button } from '@react-mobile-c/components'; globalThis.ReactMobileC = { Button };",
  );
  await writeFile(
    fullConsumerEntry,
    "import * as ReactMobileC from '@react-mobile-c/components'; globalThis.ReactMobileC = ReactMobileC;",
  );
  const viteRequire = createRequire(path.join(componentsDirectory, 'package.json'));
  const { build } = await import(pathToFileURL(viteRequire.resolve('vite')).href);
  const buildConsumer = async (input) => {
    const result = await build({
      build: {
        minify: 'terser',
        rollupOptions: {
          external: [/^react(?:\/.*)?$/, /^react-dom(?:\/.*)?$/],
          input,
        },
        write: false,
      },
      configFile: false,
      logLevel: 'silent',
    });
    const outputs = Array.isArray(result) ? result : [result];
    return outputs
      .flatMap((output) => output.output)
      .filter((output) => output.type === 'chunk')
      .map((output) => output.code)
      .join('\n');
  };
  const consumerCode = await buildConsumer(consumerEntry);
  const fullConsumerCode = await buildConsumer(fullConsumerEntry);
  const consumerGzipBytes = gzipSync(consumerCode).byteLength;
  const fullConsumerGzipBytes = gzipSync(fullConsumerCode).byteLength;

  if (!consumerCode || !fullConsumerCode || consumerGzipBytes >= fullConsumerGzipBytes) {
    throw new Error(
      `A Button-only consumer did not produce a smaller tree-shaken bundle (${consumerGzipBytes} B vs ${fullConsumerGzipBytes} B gzip).`,
    );
  }
} finally {
  await rm(temporaryDirectory, { force: true, recursive: true });
}

if (!css.includes('.rmc')) {
  throw new Error('The StyleX CSS output is missing the configured class name prefix.');
}

if (!css.includes('#1677ff') || !css.includes('.2133rem')) {
  throw new Error('The production CSS is missing the expected design token values.');
}

if (!css.includes('#1a1a1a') || !css.includes('#007a5a') || !css.includes('safe-area-inset')) {
  throw new Error('The production CSS is missing theme or mobile utility styles.');
}

if (
  !css.includes('prefers-reduced-motion') ||
  !css.includes('translateY(100%)') ||
  !css.includes('scale(.8)')
) {
  throw new Error('The production CSS is missing animation or reduced-motion styles.');
}

if (
  !css.includes('object-fit: cover') ||
  !css.includes('cursor: wait') ||
  !css.includes('focus-within')
) {
  throw new Error('The production CSS is missing P0 component styles.');
}

console.log(
  `Verified ${expectedFiles.length} artifacts, ESM/CJS imports, sourcemaps, declaration boundaries, tree shaking, and CSS at ${(cssGzipBytes / 1024).toFixed(2)} KiB gzip.`,
);
