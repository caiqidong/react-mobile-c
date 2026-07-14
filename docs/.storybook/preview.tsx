import * as stylex from '@stylexjs/stylex';
import type { Decorator, Preview } from '@storybook/react';

import '../../packages/components/src/style.css';
import { brandTheme, darkTheme } from '../../packages/components/src/styles/theme';
import './preview.css';

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as 'light' | 'dark' | 'brand';
  const themeStyles = theme === 'dark' ? darkTheme : theme === 'brand' ? brandTheme : null;

  return (
    <div
      {...(themeStyles ? stylex.props(themeStyles) : {})}
      className={`rmc-docs-theme rmc-docs-theme--${theme}`}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      defaultValue: 'light',
      description: 'Component theme',
      name: 'Theme',
      toolbar: {
        dynamicTitle: true,
        icon: 'paintbrush',
        items: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
          { title: 'Brand', value: 'brand' },
        ],
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    a11y: {
      test: 'todo',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'padded',
    options: {
      storySort: {
        order: ['Foundation', 'Components'],
      },
    },
    viewport: {
      viewports: {
        android: {
          name: 'Android · 360 × 800',
          styles: { height: '800px', width: '360px' },
          type: 'mobile',
        },
        iphone: {
          name: 'iPhone · 390 × 844',
          styles: { height: '844px', width: '390px' },
          type: 'mobile',
        },
      },
    },
  },
};

export default preview;
