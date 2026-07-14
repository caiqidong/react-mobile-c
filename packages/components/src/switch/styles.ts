import * as stylex from '@stylexjs/stylex';
import { colors, duration, fontSize, radius } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: {
    alignItems: 'center',
    appearance: 'none',
    backgroundColor: colors.textDisabled,
    borderRadius: radius.round,
    borderWidth: 0,
    color: colors.white,
    cursor: 'pointer',
    display: 'inline-flex',
    height: '0.7467rem',
    padding: '0.0533rem',
    position: 'relative',
    transition: `background-color ${duration.fast}`,
    width: '1.3333rem',
  },
  checked: { backgroundColor: colors.primary },
  disabled: { cursor: 'not-allowed', opacity: 0.55 },
  thumb: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.round,
    color: colors.primary,
    display: 'inline-flex',
    fontSize: fontSize.xs,
    height: '0.64rem',
    justifyContent: 'center',
    transform: 'translateX(0)',
    transition: `transform ${duration.fast}`,
    width: '0.64rem',
  },
  thumbChecked: { transform: 'translateX(0.5867rem)' },
  content: { height: 0, overflow: 'hidden', position: 'absolute', width: 0 },
});
