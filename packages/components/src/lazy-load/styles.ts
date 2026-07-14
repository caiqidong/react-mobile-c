import * as stylex from '@stylexjs/stylex';
import { colors } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: { width: '100%' },
  placeholder: {
    alignItems: 'center',
    backgroundColor: colors.bgBase,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
});
