import * as stylex from '@stylexjs/stylex';

import { colors, duration, radius } from './tokens.stylex';

export const safeArea = stylex.create({
  top: { paddingTop: 'env(safe-area-inset-top, 0px)' },
  bottom: { paddingBottom: 'env(safe-area-inset-bottom, 0px)' },
  left: { paddingLeft: 'env(safe-area-inset-left, 0px)' },
  right: { paddingRight: 'env(safe-area-inset-right, 0px)' },
  horizontal: {
    paddingLeft: 'env(safe-area-inset-left, 0px)',
    paddingRight: 'env(safe-area-inset-right, 0px)',
  },
  vertical: {
    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    paddingTop: 'env(safe-area-inset-top, 0px)',
  },
});

export const hairline = stylex.create({
  top: {
    position: 'relative',
    '::before': {
      backgroundColor: colors.borderBase,
      content: '""',
      height: '1px',
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      right: 0,
      top: 0,
      transform: 'scaleY(0.5)',
      transformOrigin: '0 0',
    },
  },
  bottom: {
    position: 'relative',
    '::after': {
      backgroundColor: colors.borderBase,
      bottom: 0,
      content: '""',
      height: '1px',
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      right: 0,
      transform: 'scaleY(0.5)',
      transformOrigin: '0 100%',
    },
  },
  surround: {
    position: 'relative',
    '::after': {
      borderColor: colors.borderBase,
      borderRadius: radius.base,
      borderStyle: 'solid',
      borderWidth: '1px',
      boxSizing: 'border-box',
      content: '""',
      height: '200%',
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      transform: 'scale(0.5)',
      transformOrigin: '0 0',
      width: '200%',
    },
  },
});

export const textOverflow = stylex.create({
  ellipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  clamp2: {
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    overflow: 'hidden',
  },
  clamp3: {
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    display: '-webkit-box',
    overflow: 'hidden',
  },
});

export const touchable = stylex.create({
  base: {
    WebkitTapHighlightColor: 'transparent',
    cursor: 'pointer',
    touchAction: 'manipulation',
    transitionDuration: duration.fast,
    transitionProperty: 'opacity',
    transitionTimingFunction: 'ease',
    userSelect: 'none',
    ':active': {
      opacity: 0.7,
    },
  },
});

export const flex = stylex.create({
  center: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  between: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
});
