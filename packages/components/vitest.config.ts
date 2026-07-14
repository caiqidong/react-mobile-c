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
        'src/dialog/**/*.tsx',
        'src/hooks/**/*.ts',
        'src/icon/**/*.tsx',
        'src/image/**/*.tsx',
        'src/input/**/*.tsx',
        'src/loading/**/*.tsx',
        'src/overlay/**/*.tsx',
        'src/popup/**/*.tsx',
        'src/textarea/**/*.tsx',
        'src/toast/**/*.tsx',
      ],
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'lcov'],
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
    setupFiles: ['./src/test/setup.ts'],
  },
});
