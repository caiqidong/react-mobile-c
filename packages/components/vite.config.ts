import stylexPlugin from '@stylexjs/unplugin/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => ({
  plugins: [
    stylexPlugin({
      classNamePrefix: 'rmc',
      dev: mode === 'development',
      devMode: mode === 'development' ? 'full' : 'off',
      useCSSLayers: true,
    }),
    react(),
    dts({
      entryRoot: 'src',
      exclude: ['src/**/*.test.{ts,tsx}'],
      include: ['src'],
      insertTypesEntry: true,
      outDirs: ['dist'],
      tsconfigPath: './tsconfig.json',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    cssCodeSplit: false,
    lib: {
      cssFileName: 'style',
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
      formats: ['es', 'cjs'],
      name: 'ReactMobileC',
    },
    minify: 'terser',
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
    sourcemap: true,
    target: 'es2017',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
}));
