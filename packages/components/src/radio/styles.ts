import * as stylex from '@stylexjs/stylex';
import { colors, fontSize, radius, spacing } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: {
    alignItems: 'center',
    color: colors.textPrimary,
    cursor: 'pointer',
    display: 'inline-flex',
    gap: spacing.sm,
  },
  disabled: { color: colors.textDisabled, cursor: 'not-allowed' },
  input: { height: 0, opacity: 0, position: 'absolute', width: 0 },
  icon: {
    alignItems: 'center',
    backgroundColor: colors.bgWhite,
    borderColor: colors.borderBase,
    borderRadius: radius.round,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    color: colors.white,
    display: 'inline-flex',
    fontSize: fontSize.xs,
    height: '0.48rem',
    justifyContent: 'center',
    width: '0.48rem',
  },
  checked: { backgroundColor: colors.primary, borderColor: colors.primary },
  label: { fontSize: fontSize.base },
  group: { display: 'flex', flexWrap: 'wrap', gap: spacing.md },
});
