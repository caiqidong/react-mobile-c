import * as stylex from '@stylexjs/stylex';

import { colors, duration, fontSize, radius, spacing } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: {
    backgroundColor: colors.bgWhite,
    borderColor: colors.borderBase,
    borderRadius: radius.base,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: spacing.md,
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, box-shadow',
    ':focus-within': {
      borderColor: colors.primary,
      boxShadow: `0 0 0 2px ${colors.primaryLight}`,
    },
  },
  disabled: {
    backgroundColor: colors.bgBase,
  },
  textarea: {
    backgroundColor: 'transparent',
    borderStyle: 'none',
    color: colors.textPrimary,
    fontFamily: 'inherit',
    fontSize: fontSize.base,
    lineHeight: 1.5,
    minHeight: '1.28rem',
    outline: 'none',
    padding: 0,
    resize: 'vertical',
    width: '100%',
    '::placeholder': {
      color: colors.textTertiary,
    },
  },
  autoSize: {
    overflow: 'hidden',
    resize: 'none',
  },
  count: {
    alignSelf: 'flex-end',
    color: colors.textTertiary,
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
  },
});
