import stylexPlugin from '@stylexjs/unplugin/vite';
import { fileURLToPath, URL } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  addons: ['@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: [
    '../../packages/components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  viteFinal: async (baseConfig) =>
    mergeConfig(baseConfig, {
      plugins: [
        stylexPlugin({
          classNamePrefix: 'rmc',
          dev: true,
          devMode: 'full',
          useCSSLayers: true,
        }),
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('../../packages/components/src', import.meta.url)),
        },
      },
    }),
};

export default config;
