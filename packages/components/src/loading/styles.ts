import * as stylex from '@stylexjs/stylex';

import { colors, fontSize, radius, spacing } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: {
    alignItems: 'center',
    color: colors.primary,
    display: 'inline-flex',
    flexDirection: 'column',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  spinner: {
    animationDuration: '800ms',
    animationIterationCount: 'infinite',
    animationName: stylex.keyframes({ to: { transform: 'rotate(360deg)' } }),
    animationTimingFunction: 'linear',
    borderColor: 'currentColor',
    borderRadius: radius.round,
    borderRightColor: 'transparent',
    borderStyle: 'solid',
    boxSizing: 'border-box',
  },
  small: { borderWidth: '2px', height: '0.2667rem', width: '0.2667rem' },
  medium: { borderWidth: '2px', height: '0.4267rem', width: '0.4267rem' },
  large: { borderWidth: '3px', height: '0.64rem', width: '0.64rem' },
  text: {
    color: 'currentColor',
    fontSize: fontSize.sm,
  },
  fullscreen: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  fullscreenContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    borderRadius: radius.lg,
    color: colors.white,
    minHeight: '1.28rem',
    minWidth: '1.28rem',
    padding: spacing.base,
  },
});
