import * as stylex from '@stylexjs/stylex';

import { colors } from './tokens.stylex';

export const mobileRootStyles = stylex.create({
  root: {
    boxSizing: 'border-box',
    color: colors.textPrimary,
    fontFamily: 'sans-serif',
    minHeight: '100dvh',
    WebkitTapHighlightColor: 'transparent',
  },
});
