import * as stylex from '@stylexjs/stylex';

import { duration } from './tokens.stylex';

const reducedMotion = '@media (prefers-reduced-motion: reduce)';
const springCurve = 'cubic-bezier(0.32, 0.72, 0, 1)';

export const fade = stylex.create({
  enter: {
    opacity: 1,
    transitionDuration: {
      default: duration.base,
      [reducedMotion]: '0ms',
    },
    transitionProperty: 'opacity',
    transitionTimingFunction: 'ease',
    willChange: 'opacity',
  },
  exit: {
    opacity: 0,
    transitionDuration: {
      default: duration.fast,
      [reducedMotion]: '0ms',
    },
    transitionProperty: 'opacity',
    transitionTimingFunction: 'ease',
    willChange: 'opacity',
  },
});

export const slideUp = stylex.create({
  enter: {
    transform: 'translateY(0)',
    transitionDuration: {
      default: duration.base,
      [reducedMotion]: '0ms',
    },
    transitionProperty: 'transform',
    transitionTimingFunction: springCurve,
    willChange: 'transform',
  },
  exit: {
    transform: 'translateY(100%)',
    transitionDuration: {
      default: duration.base,
      [reducedMotion]: '0ms',
    },
    transitionProperty: 'transform',
    transitionTimingFunction: springCurve,
    willChange: 'transform',
  },
});

export const scale = stylex.create({
  enter: {
    opacity: 1,
    transform: 'scale(1)',
    transformOrigin: 'center',
    transitionDuration: {
      default: duration.base,
      [reducedMotion]: '0ms',
    },
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: springCurve,
    willChange: 'opacity, transform',
  },
  exit: {
    opacity: 0,
    transform: 'scale(0.8)',
    transformOrigin: 'center',
    transitionDuration: {
      default: duration.fast,
      [reducedMotion]: '0ms',
    },
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: 'ease',
    willChange: 'opacity, transform',
  },
});
