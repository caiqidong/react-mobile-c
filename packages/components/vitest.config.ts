import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      exclude: [
        'src/**/__tests__/**',
        'src/**/*.stories.tsx',
        'src/**/styles.ts',
        'src/**/types.ts',
        'src/hooks/index.ts',
      ],
      include: [
        'src/button/**/*.tsx',
        'src/hooks/**/*.ts',
        'src/icon/**/*.tsx',
        'src/image/**/*.tsx',
        'src/input/**/*.tsx',
        'src/textarea/**/*.tsx',
      ],
      provider: 'v8',
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
        'src/hooks/**': {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    environment: 'jsdom',
    restoreMocks: true,
  },
});
