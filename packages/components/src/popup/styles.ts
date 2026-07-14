import * as stylex from '@stylexjs/stylex';

import { colors, duration, radius } from '../styles/tokens.stylex';

const reducedMotion = '@media (prefers-reduced-motion: reduce)';
const springCurve = 'cubic-bezier(0.32, 0.72, 0, 1)';

export const styles = stylex.create({
  panel: {
    backgroundColor: colors.bgWhite,
    boxSizing: 'border-box',
    maxHeight: '100%',
    maxWidth: '100%',
    overflow: 'auto',
    position: 'absolute',
    transitionDuration: {
      default: duration.base,
      [reducedMotion]: '0ms',
    },
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: springCurve,
    willChange: 'opacity, transform',
  },
  bottom: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    bottom: 0,
    left: 0,
    width: '100%',
  },
  top: {
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    left: 0,
    top: 0,
    width: '100%',
  },
  left: {
    bottom: 0,
    left: 0,
    top: 0,
  },
  right: {
    bottom: 0,
    right: 0,
    top: 0,
  },
  center: {
    borderRadius: radius.lg,
    left: '50%',
    maxHeight: 'calc(100% - 0.64rem)',
    maxWidth: 'calc(100% - 0.64rem)',
    top: '50%',
  },
  bottomClosed: { transform: 'translateY(100%)' },
  bottomOpen: { transform: 'translateY(0)' },
  topClosed: { transform: 'translateY(-100%)' },
  topOpen: { transform: 'translateY(0)' },
  leftClosed: { transform: 'translateX(-100%)' },
  leftOpen: { transform: 'translateX(0)' },
  rightClosed: { transform: 'translateX(100%)' },
  rightOpen: { transform: 'translateX(0)' },
  centerClosed: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' },
  centerOpen: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});
