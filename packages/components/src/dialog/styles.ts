import * as stylex from '@stylexjs/stylex';

import { colors, fontSize, radius, spacing } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: {
    borderRadius: radius.lg,
    color: colors.textPrimary,
    overflow: 'hidden',
    width: '4rem',
  },
  body: {
    paddingBlock: spacing.lg,
    paddingInline: spacing.lg,
    textAlign: 'center',
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: 600,
    margin: 0,
  },
  content: {
    color: colors.textSecondary,
    fontSize: fontSize.base,
    marginBlockEnd: 0,
    marginBlockStart: spacing.base,
  },
  actions: {
    borderColor: colors.borderBase,
    borderStyle: 'solid',
    borderWidth: 0,
    borderTopWidth: '1px',
    display: 'flex',
  },
  action: {
    borderRadius: 0,
    flex: 1,
    minHeight: '0.64rem',
  },
  cancel: {
    borderColor: colors.borderBase,
    borderRightWidth: '1px',
    color: colors.textPrimary,
  },
});
