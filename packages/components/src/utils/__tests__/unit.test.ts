import { describe, expect, it } from 'vitest';

import { px2rem, px2remValue } from '../unit';

describe('unit conversion', () => {
  it('converts design pixels to rem with four-decimal precision', () => {
    expect(px2rem(16)).toBe('0.2133rem');
    expect(px2remValue(16)).toBe(0.2133);
    expect(px2rem(75)).toBe('1rem');
  });

  it('supports zero and negative values', () => {
    expect(px2rem(0)).toBe('0rem');
    expect(px2rem(-8)).toBe('-0.1067rem');
  });

  it('rejects non-finite values', () => {
    expect(() => px2rem(Number.NaN)).toThrow(RangeError);
    expect(() => px2rem(Number.POSITIVE_INFINITY)).toThrow(RangeError);
  });
});
