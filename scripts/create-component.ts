import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

async function main() {
  const [, , rawName, ...flags] = process.argv;
  const dryRun = flags.includes('--dry-run');

  if (!rawName || !/^[A-Z][A-Za-z0-9]*$/.test(rawName)) {
    throw new Error('Usage: pnpm create:component <PascalCaseName> [--dry-run]');
  }

  const componentName = rawName;
  const directoryName = componentName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
  const sourceDirectory = path.join(process.cwd(), 'packages/components/src');
  const componentDirectory = path.join(sourceDirectory, directoryName);
  const files = new Map([
    [
      'types.ts',
      `import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';\nimport type { HTMLAttributes } from 'react';\n\nexport interface ${componentName}Props extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {\n  className?: StyleXStyles;\n}\n`,
    ],
    [
      'styles.ts',
      `import * as stylex from '@stylexjs/stylex';\n\nexport const styles = stylex.create({\n  root: {},\n});\n`,
    ],
    [
      'index.tsx',
      `import * as stylex from '@stylexjs/stylex';\nimport { forwardRef } from 'react';\n\nimport { styles } from './styles';\nimport type { ${componentName}Props } from './types';\n\nexport const ${componentName} = forwardRef<HTMLDivElement, ${componentName}Props>(\n  ({ className, ...props }, ref) => (\n    <div {...props} {...stylex.props(styles.root, className)} ref={ref} />\n  ),\n);\n\n${componentName}.displayName = '${componentName}';\n\nexport type { ${componentName}Props } from './types';\n`,
    ],
    [
      'index.stories.tsx',
      `import type { Meta, StoryObj } from '@storybook/react';\n\nimport { ${componentName} } from './index';\n\nconst meta = {\n  component: ${componentName},\n  tags: ['autodocs'],\n  title: 'Components/${componentName}',\n} satisfies Meta<typeof ${componentName}>;\n\nexport default meta;\ntype Story = StoryObj<typeof meta>;\n\nexport const Default: Story = {\n  args: { children: '${componentName}' },\n};\n`,
    ],
    [
      path.join('__tests__', `${directoryName}.test.tsx`),
      `import { cleanup, render, screen } from '@testing-library/react';\nimport { afterEach, describe, expect, it, vi } from 'vitest';\n\nvi.mock('@stylexjs/stylex', () => ({\n  create: (styles: object) => styles,\n  props: () => ({}),\n}));\n\nimport { ${componentName} } from '../index';\n\nafterEach(cleanup);\n\ndescribe('${componentName}', () => {\n  it('renders content and forwards its ref', () => {\n    const ref = { current: null as HTMLDivElement | null };\n    render(<${componentName} ref={ref}>${componentName}</${componentName}>);\n\n    expect(screen.getByText('${componentName}')).toBe(ref.current);\n  });\n});\n`,
    ],
  ]);

  const indexPath = path.join(sourceDirectory, 'index.ts');
  const indexSource = await readFile(indexPath, 'utf8');
  const exportStatement = `export * from './${directoryName}';`;

  if (indexSource.includes(exportStatement)) {
    throw new Error(`${componentName} is already exported from src/index.ts.`);
  }

  if (dryRun) {
    process.stdout.write(`Would create ${componentDirectory}\n`);
    for (const fileName of files.keys()) process.stdout.write(`  ${fileName}\n`);
    process.stdout.write(`Would add ${exportStatement} to packages/components/src/index.ts\n`);
    return;
  }

  await Promise.all(
    [...files].map(async ([fileName, content]) => {
      const filePath = path.join(componentDirectory, fileName);
      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, content, { flag: 'wx' });
    }),
  );
  await writeFile(indexPath, `${indexSource.trimEnd()}\n${exportStatement}\n`);

  process.stdout.write(`Created ${componentName} in packages/components/src/${directoryName}.\n`);
}

void main();
