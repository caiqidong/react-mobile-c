import * as stylex from '@stylexjs/stylex';

import { colors, fontSize, lineHeight, spacing } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.bgWhite,
    borderBottomColor: colors.borderLight,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    boxSizing: 'border-box',
    color: colors.textPrimary,
    display: 'flex',
    gap: spacing.md,
    minHeight: '1.1733rem',
    paddingBlock: spacing.base,
    paddingInline: spacing.lg,
    width: '100%',
  },
  clickable: {
    cursor: 'pointer',
    ':active': { backgroundColor: colors.bgBase },
  },
  icon: { color: colors.textSecondary, display: 'inline-flex', flexShrink: 0 },
  body: { flex: 1, minWidth: 0 },
  title: { fontSize: fontSize.base, lineHeight: lineHeight.base },
  description: {
    color: colors.textTertiary,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.base,
    marginTop: spacing.xs,
  },
  value: {
    color: colors.textSecondary,
    flexShrink: 0,
    fontSize: fontSize.base,
    textAlign: 'right',
  },
  arrow: { color: colors.textTertiary, flexShrink: 0, fontSize: fontSize.lg },
});
