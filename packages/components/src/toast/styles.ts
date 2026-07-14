import * as stylex from '@stylexjs/stylex';

import { colors, duration, fontSize, radius, spacing } from '../styles/tokens.stylex';

const reducedMotion = '@media (prefers-reduced-motion: reduce)';

export const styles = stylex.create({
  viewport: {
    alignItems: 'center',
    display: 'flex',
    inset: 0,
    justifyContent: 'center',
    pointerEvents: 'none',
    position: 'fixed',
  },
  toast: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.82)',
    borderRadius: radius.lg,
    color: colors.white,
    display: 'inline-flex',
    flexDirection: 'column',
    fontSize: fontSize.base,
    gap: spacing.sm,
    maxWidth: 'calc(100% - 0.64rem)',
    minWidth: '1.28rem',
    opacity: 1,
    paddingBlock: spacing.base,
    paddingInline: spacing.md,
    textAlign: 'center',
    transitionDuration: {
      default: duration.fast,
      [reducedMotion]: '0ms',
    },
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: 'ease',
  },
  closed: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  indicator: {
    alignItems: 'center',
    borderColor: 'currentColor',
    borderRadius: radius.round,
    borderStyle: 'solid',
    borderWidth: '2px',
    display: 'inline-flex',
    height: '0.32rem',
    justifyContent: 'center',
    width: '0.32rem',
  },
  success: { color: colors.success },
  error: { color: colors.danger },
  info: { color: colors.info },
  loading: {
    animationDuration: '800ms',
    animationIterationCount: 'infinite',
    animationName: stylex.keyframes({ to: { transform: 'rotate(360deg)' } }),
    animationTimingFunction: 'linear',
    borderRightColor: 'transparent',
  },
  message: { color: colors.white },
});
