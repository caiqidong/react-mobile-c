import * as stylex from '@stylexjs/stylex';
import { colors, duration, fontSize } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: { overflow: 'hidden', position: 'relative', touchAction: 'pan-x pan-down', width: '100%' },
  indicator: {
    alignItems: 'center',
    color: colors.textSecondary,
    display: 'flex',
    fontSize: fontSize.sm,
    height: '1.28rem',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: '-1.28rem',
  },
  content: { transition: `transform ${duration.base}` },
  pulling: { transition: 'none' },
});
