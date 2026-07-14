import * as stylex from '@stylexjs/stylex';

import { colors } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: {
    backgroundColor: colors.bgMask,
    inset: 0,
    position: 'fixed',
    touchAction: 'none',
  },
});
