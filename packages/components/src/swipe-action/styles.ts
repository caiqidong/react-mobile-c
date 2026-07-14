import * as stylex from '@stylexjs/stylex';
import { colors, duration } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: { overflow: 'hidden', position: 'relative', touchAction: 'pan-y', width: '100%' },
  actions: { bottom: 0, display: 'flex', position: 'absolute', top: 0 },
  leftActions: { left: 0 },
  rightActions: { right: 0 },
  action: { borderWidth: 0, color: colors.white, minWidth: '1.7067rem', paddingInline: '0.32rem' },
  content: {
    backgroundColor: colors.bgWhite,
    position: 'relative',
    transition: `transform ${duration.base}`,
    zIndex: 1,
  },
  dragging: { transition: 'none' },
});
