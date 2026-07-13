import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      exclude: ['src/hooks/index.ts', 'src/hooks/__tests__/**'],
      include: ['src/hooks/**/*.ts'],
      provider: 'v8',
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    environment: 'jsdom',
    restoreMocks: true,
  },
});
