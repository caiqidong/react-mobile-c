import { access, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(rootDirectory, 'packages/components/dist');
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

for (const exportName of ['colors', 'spacing', 'px2rem']) {
  if (!esmEntry[exportName] || !cjsEntry[exportName]) {
    throw new Error(`The ESM or CJS entry is missing the ${exportName} export.`);
  }
}

if (!css.includes('.rmc')) {
  throw new Error('The StyleX CSS output is missing the configured class name prefix.');
}

if (!css.includes('#1677ff') || !css.includes('.2133rem')) {
  throw new Error('The production CSS is missing the expected design token values.');
}

console.log(
  `Verified ${expectedFiles.length} build artifacts, both module formats, and design tokens.`,
);
