import * as stylex from '@stylexjs/stylex';

import { colors, fontSize, lineHeight, radius, shadow, spacing } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: {
    backgroundColor: colors.bgWhite,
    borderColor: colors.borderLight,
    borderRadius: radius.base,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxShadow: shadow.sm,
    boxSizing: 'border-box',
    color: colors.textPrimary,
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    borderBottomColor: colors.borderLight,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    display: 'flex',
    gap: spacing.base,
    justifyContent: 'space-between',
    minHeight: '1.0667rem',
    paddingInline: spacing.lg,
  },
  title: { fontSize: fontSize.md, fontWeight: 600, lineHeight: lineHeight.base },
  extra: { color: colors.textSecondary, fontSize: fontSize.sm, flexShrink: 0 },
  body: { fontSize: fontSize.base, lineHeight: lineHeight.relaxed, padding: spacing.lg },
  footer: {
    borderTopColor: colors.borderLight,
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
    padding: spacing.base,
  },
});
