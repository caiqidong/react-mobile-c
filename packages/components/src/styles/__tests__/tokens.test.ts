import { describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  defineVars: <Values>(values: Values): Values => values,
}));

import { px2rem } from '../../utils';
import {
  breakpoints,
  colorValues,
  durationValues,
  fontSizeValues,
  lineHeightValues,
  radiusValues,
  shadowValues,
  spacingValues,
} from '../tokens.stylex';

describe('design token values', () => {
  it('keeps spacing and typography aligned with the 750px design scale', () => {
    expect(spacingValues).toEqual({
      xs: px2rem(8),
      sm: px2rem(12),
      base: px2rem(16),
      md: px2rem(24),
      lg: px2rem(32),
      xl: px2rem(48),
    });
    expect(fontSizeValues.base).toBe(px2rem(14));
    expect(radiusValues.base).toBe(px2rem(8));
  });

  it('defines complete semantic token groups', () => {
    expect(colorValues.primary).toBe('#1677ff');
    expect(colorValues.textPrimary).toBe('#1f1f1f');
    expect(lineHeightValues).toEqual({ tight: '1.25', base: '1.5', relaxed: '1.75' });
    expect(Object.keys(shadowValues)).toEqual(['sm', 'base', 'md', 'lg']);
    expect(durationValues).toEqual({ fast: '150ms', base: '250ms', slow: '350ms' });
  });

  it('defines mobile viewport breakpoints as static media queries', () => {
    expect(breakpoints.small).toContain('max-width: 320px');
    expect(breakpoints.medium).toContain('min-width: 321px');
    expect(breakpoints.large).toContain('min-width: 751px');
  });
});
