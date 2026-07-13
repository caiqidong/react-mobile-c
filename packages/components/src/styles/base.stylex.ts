import * as stylex from '@stylexjs/stylex';

export const mobileRootStyles = stylex.create({
  root: {
    boxSizing: 'border-box',
    color: '#1f1f1f',
    fontFamily: 'sans-serif',
    minHeight: '100dvh',
    WebkitTapHighlightColor: 'transparent',
  },
});
