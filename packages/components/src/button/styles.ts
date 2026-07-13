import * as stylex from '@stylexjs/stylex';

import { colors, duration, fontSize, lineHeight, radius, spacing } from '../styles/tokens.stylex';

export const styles = stylex.create({
  base: {
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 0,
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: 'inherit',
    fontSize: fontSize.base,
    fontWeight: 500,
    gap: spacing.xs,
    justifyContent: 'center',
    lineHeight: lineHeight.base,
    minHeight: '0.5333rem',
    outline: 'none',
    paddingBlock: spacing.sm,
    paddingInline: spacing.base,
    transitionDuration: duration.fast,
    transitionProperty: 'background-color, border-color, color, opacity, transform',
    transitionTimingFunction: 'ease',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    ':active': {
      transform: 'scale(0.98)',
    },
    ':focus-visible': {
      boxShadow: `0 0 0 2px ${colors.primaryLight}`,
    },
  },
  primary: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: colors.primary,
    borderWidth: '1px',
    color: colors.primary,
  },
  text: {
    backgroundColor: 'transparent',
    color: colors.primary,
    minHeight: 'auto',
    paddingBlock: spacing.xs,
    paddingInline: spacing.sm,
  },
  danger: {
    backgroundColor: colors.danger,
    color: colors.white,
  },
  small: {
    borderRadius: radius.sm,
    fontSize: fontSize.sm,
    minHeight: '0.4267rem',
    paddingBlock: spacing.xs,
    paddingInline: spacing.sm,
  },
  medium: {
    borderRadius: radius.base,
  },
  large: {
    borderRadius: radius.lg,
    fontSize: fontSize.md,
    minHeight: '0.64rem',
    paddingBlock: spacing.sm,
    paddingInline: spacing.md,
  },
  block: {
    width: '100%',
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
    ':active': {
      transform: 'none',
    },
  },
  loading: {
    cursor: 'wait',
  },
  spinner: {
    animationDuration: '800ms',
    animationIterationCount: 'infinite',
    animationName: stylex.keyframes({
      to: { transform: 'rotate(360deg)' },
    }),
    animationTimingFunction: 'linear',
    borderColor: 'currentColor',
    borderRadius: radius.round,
    borderRightColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: '2px',
    boxSizing: 'border-box',
    height: '1em',
    width: '1em',
  },
});
