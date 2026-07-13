import { describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: <Styles>(styles: Styles): Styles => styles,
  createTheme: <Values, Overrides>(_values: Values, overrides: Overrides): Overrides => overrides,
  defineVars: <Values>(values: Values): Values => values,
}));

import { flex, hairline, safeArea, textOverflow, touchable } from '../common.stylex';
import { brandTheme, darkTheme } from '../theme';

describe('theme and common styles', () => {
  it('defines dark and brand theme overrides', () => {
    expect(darkTheme).toMatchObject({
      primary: '#4096ff',
      textPrimary: '#ffffff',
      bgBase: '#1a1a1a',
    });
    expect(brandTheme).toMatchObject({
      primary: '#007a5a',
      primaryDark: '#005c44',
    });
  });

  it('provides complete safe-area and hairline variants', () => {
    expect(Object.keys(safeArea)).toEqual([
      'top',
      'bottom',
      'left',
      'right',
      'horizontal',
      'vertical',
    ]);
    expect(Object.keys(hairline)).toEqual(['top', 'bottom', 'surround']);
    expect(hairline.surround['::after']).toMatchObject({ height: '200%', width: '200%' });
  });

  it('provides overflow, touch and flex utilities', () => {
    expect(Object.keys(textOverflow)).toEqual(['ellipsis', 'clamp2', 'clamp3']);
    expect(touchable.base[':active']).toEqual({ opacity: 0.7 });
    expect(Object.keys(flex)).toEqual(['center', 'between', 'column']);
  });
});
