import * as stylex from '@stylexjs/stylex';

import { colors, fontSize, lineHeight, radius } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: {
    display: 'inline-flex',
    position: 'relative',
    verticalAlign: 'middle',
  },
  badge: {
    alignItems: 'center',
    backgroundColor: colors.danger,
    borderRadius: radius.round,
    boxSizing: 'border-box',
    color: colors.white,
    display: 'inline-flex',
    fontSize: fontSize.xs,
    justifyContent: 'center',
    lineHeight: lineHeight.tight,
    minHeight: '0.4267rem',
    minWidth: '0.4267rem',
    paddingInline: '0.1067rem',
    whiteSpace: 'nowrap',
  },
  floating: {
    position: 'absolute',
    right: 0,
    top: 0,
    transform: 'translate(50%, -50%)',
    zIndex: 1,
  },
  dot: {
    minHeight: '0.2133rem',
    minWidth: '0.2133rem',
    paddingInline: 0,
  },
});
