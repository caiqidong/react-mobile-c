import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));

import { Checkbox } from '../index';

afterEach(cleanup);

describe('Checkbox', () => {
  it('toggles and supports custom icons', () => {
    const onChange = vi.fn();
    render(<Checkbox checkedIcon="yes" icon="no" label="Terms" onChange={onChange} />);
    expect(screen.getByText('no')).toBeTruthy();
    fireEvent.click(screen.getByRole('checkbox', { name: 'Terms' }));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.getByText('yes')).toBeTruthy();
  });

  it('does not change when disabled', () => {
    const onChange = vi.fn();
    render(<Checkbox disabled label="Terms" onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Terms' }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
