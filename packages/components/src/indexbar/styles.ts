import * as stylex from '@stylexjs/stylex';

import { colors, fontSize, lineHeight, spacing } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: { boxSizing: 'border-box', position: 'relative', width: '100%' },
  content: { paddingRight: '0.64rem' },
  section: { scrollMarginTop: '1.1733rem' },
  anchor: {
    backgroundColor: colors.bgBase,
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: 600,
    lineHeight: lineHeight.base,
    paddingBlock: spacing.xs,
    paddingInline: spacing.lg,
  },
  sticky: { position: 'sticky', top: 0, zIndex: 1 },
  rail: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
    position: 'absolute',
    right: spacing.xs,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
  },
  indexButton: {
    appearance: 'none',
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: colors.textSecondary,
    cursor: 'pointer',
    fontSize: fontSize.xs,
    lineHeight: lineHeight.tight,
    minHeight: '0.4267rem',
    minWidth: '0.4267rem',
    padding: 0,
  },
  active: { color: colors.primary, fontWeight: 600 },
});
