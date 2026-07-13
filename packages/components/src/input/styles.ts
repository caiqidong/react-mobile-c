import * as stylex from '@stylexjs/stylex';

import { colors, duration, fontSize, radius, spacing } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.bgWhite,
    borderColor: colors.borderBase,
    borderRadius: radius.base,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    display: 'flex',
    gap: spacing.sm,
    minHeight: '0.5867rem',
    paddingInline: spacing.md,
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, box-shadow',
    ':focus-within': {
      borderColor: colors.primary,
      boxShadow: `0 0 0 2px ${colors.primaryLight}`,
    },
  },
  disabled: {
    backgroundColor: colors.bgBase,
    color: colors.textDisabled,
  },
  input: {
    backgroundColor: 'transparent',
    borderStyle: 'none',
    color: colors.textPrimary,
    flex: 1,
    fontFamily: 'inherit',
    fontSize: fontSize.base,
    lineHeight: 1.5,
    minWidth: 0,
    outline: 'none',
    paddingBlock: spacing.sm,
    paddingInline: 0,
    width: '100%',
    '::placeholder': {
      color: colors.textTertiary,
    },
  },
  clear: {
    alignItems: 'center',
    backgroundColor: colors.textTertiary,
    borderRadius: '9999px',
    borderStyle: 'none',
    color: colors.white,
    cursor: 'pointer',
    display: 'inline-flex',
    flexShrink: 0,
    fontSize: fontSize.xs,
    height: '0.2133rem',
    justifyContent: 'center',
    lineHeight: 1,
    padding: 0,
    width: '0.2133rem',
  },
  count: {
    color: colors.textTertiary,
    flexShrink: 0,
    fontSize: fontSize.xs,
    whiteSpace: 'nowrap',
  },
  adornment: {
    alignItems: 'center',
    color: colors.textSecondary,
    display: 'inline-flex',
    flexShrink: 0,
  },
});
