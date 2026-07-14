import * as stylex from '@stylexjs/stylex';

import { colors, fontSize, lineHeight, spacing } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: {
    backgroundColor: colors.bgWhite,
    borderBottomColor: colors.borderLight,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    boxSizing: 'border-box',
    color: colors.textPrimary,
    width: '100%',
  },
  safeArea: { paddingTop: 'env(safe-area-inset-top)' },
  content: {
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
    minHeight: '1.1733rem',
    paddingInline: spacing.base,
  },
  side: { alignItems: 'center', display: 'flex', gap: spacing.sm, minWidth: 0 },
  right: { justifyContent: 'flex-end' },
  title: {
    fontSize: fontSize.lg,
    fontWeight: 600,
    lineHeight: lineHeight.base,
    maxWidth: '5.3333rem',
    overflow: 'hidden',
    paddingInline: spacing.base,
    textAlign: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  backButton: {
    alignItems: 'center',
    appearance: 'none',
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: colors.textPrimary,
    cursor: 'pointer',
    display: 'inline-flex',
    fontSize: fontSize.xl,
    minHeight: '0.8533rem',
    minWidth: '0.8533rem',
    padding: 0,
  },
});
