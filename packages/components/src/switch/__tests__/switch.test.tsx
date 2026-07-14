import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));
import { Switch } from '../index';
afterEach(cleanup);

describe('Switch', () => {
  it('toggles its value', () => {
    const onChange = vi.fn();
    render(<Switch onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });
  it('is disabled while loading', () => {
    const onChange = vi.fn();
    render(<Switch loading onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('switch').getAttribute('aria-busy')).toBe('true');
  });
});
