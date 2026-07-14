import * as stylex from '@stylexjs/stylex';

import { colors, fontSize, lineHeight, radius, spacing } from '../styles/tokens.stylex';

export const styles = stylex.create({
  base: {
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    display: 'inline-flex',
    fontSize: fontSize.sm,
    gap: spacing.xs,
    lineHeight: lineHeight.tight,
    whiteSpace: 'nowrap',
  },
  default: {
    backgroundColor: colors.bgWhite,
    borderColor: colors.borderBase,
    color: colors.textSecondary,
  },
  primary: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
    color: colors.primaryDark,
  },
  success: {
    backgroundColor: '#f6ffed',
    borderColor: colors.success,
    color: '#389e0d',
  },
  warning: {
    backgroundColor: '#fffbe6',
    borderColor: colors.warning,
    color: '#d48806',
  },
  danger: {
    backgroundColor: '#fff2f0',
    borderColor: colors.danger,
    color: '#cf1322',
  },
  small: {
    borderRadius: radius.xs,
    minHeight: '0.4267rem',
    paddingInline: spacing.xs,
  },
  medium: {
    borderRadius: radius.sm,
    minHeight: '0.5333rem',
    paddingInline: spacing.sm,
  },
  large: {
    borderRadius: radius.base,
    fontSize: fontSize.base,
    minHeight: '0.6933rem',
    paddingInline: spacing.base,
  },
  close: {
    alignItems: 'center',
    appearance: 'none',
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: 'inherit',
    cursor: 'pointer',
    display: 'inline-flex',
    font: 'inherit',
    height: '1em',
    justifyContent: 'center',
    padding: 0,
    width: '1em',
  },
});
