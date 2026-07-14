import * as stylex from '@stylexjs/stylex';
import { colors, fontSize, radius, spacing } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: { display: 'flex', gap: spacing.sm, width: '100%' },
  select: {
    appearance: 'none',
    backgroundColor: colors.bgWhite,
    borderColor: colors.borderBase,
    borderRadius: radius.base,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: colors.textPrimary,
    flex: 1,
    fontSize: fontSize.base,
    minHeight: '1.0667rem',
    minWidth: 0,
    paddingInline: spacing.base,
  },
  disabled: { backgroundColor: colors.bgBase, color: colors.textDisabled, cursor: 'not-allowed' },
});
