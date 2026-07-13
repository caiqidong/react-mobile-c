import * as stylex from '@stylexjs/stylex';

import { colors, fontSize, radius } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: {
    backgroundColor: colors.bgBase,
    display: 'inline-block',
    overflow: 'hidden',
    position: 'relative',
    verticalAlign: 'middle',
  },
  image: {
    display: 'block',
    height: '100%',
    width: '100%',
  },
  loading: {
    opacity: 0,
  },
  overlay: {
    alignItems: 'center',
    color: colors.textTertiary,
    display: 'flex',
    fontSize: fontSize.sm,
    inset: 0,
    justifyContent: 'center',
    position: 'absolute',
  },
  small: {
    borderRadius: radius.sm,
  },
  medium: {
    borderRadius: radius.base,
  },
  large: {
    borderRadius: radius.lg,
  },
  round: {
    borderRadius: radius.round,
  },
  none: {
    borderRadius: 0,
  },
});

export const fitStyles = stylex.create({
  contain: { objectFit: 'contain' },
  cover: { objectFit: 'cover' },
  fill: { objectFit: 'fill' },
  none: { objectFit: 'none' },
  scaleDown: { objectFit: 'scale-down' },
});
