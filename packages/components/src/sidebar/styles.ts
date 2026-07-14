import * as stylex from '@stylexjs/stylex';

import { colors, fontSize, lineHeight, spacing } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: {
    backgroundColor: colors.bgBase,
    display: 'flex',
    flexDirection: 'column',
    width: '2.4rem',
  },
  item: {
    appearance: 'none',
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: colors.textSecondary,
    cursor: 'pointer',
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    minHeight: '1.28rem',
    paddingBlock: spacing.base,
    paddingInline: spacing.md,
    position: 'relative',
    textAlign: 'left',
    width: '100%',
  },
  active: {
    backgroundColor: colors.bgWhite,
    color: colors.textPrimary,
    fontWeight: 600,
    '::before': {
      backgroundColor: colors.primary,
      content: '',
      height: '0.5333rem',
      left: 0,
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '0.08rem',
    },
  },
  disabled: { color: colors.textDisabled, cursor: 'not-allowed' },
});
