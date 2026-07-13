import { describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: <Styles>(styles: Styles): Styles => styles,
  defineVars: <Values>(values: Values): Values => values,
}));

import { fade, scale, slideUp } from '../animation.stylex';

describe('animation styles', () => {
  it('defines enter and exit states for every animation', () => {
    expect(Object.keys(fade)).toEqual(['enter', 'exit']);
    expect(Object.keys(slideUp)).toEqual(['enter', 'exit']);
    expect(Object.keys(scale)).toEqual(['enter', 'exit']);
  });

  it('uses explicit transition properties and the iOS spring curve', () => {
    expect(fade.enter.transitionProperty).toBe('opacity');
    expect(slideUp.enter.transitionProperty).toBe('transform');
    expect(slideUp.enter.transitionTimingFunction).toBe('cubic-bezier(0.32, 0.72, 0, 1)');
    expect(scale.enter.transitionProperty).toBe('opacity, transform');
  });

  it('disables transition duration for reduced motion', () => {
    const mediaQuery = '@media (prefers-reduced-motion: reduce)';

    expect(fade.enter.transitionDuration).toMatchObject({ [mediaQuery]: '0ms' });
    expect(slideUp.exit.transitionDuration).toMatchObject({ [mediaQuery]: '0ms' });
    expect(scale.exit.transitionDuration).toMatchObject({ [mediaQuery]: '0ms' });
  });
});
