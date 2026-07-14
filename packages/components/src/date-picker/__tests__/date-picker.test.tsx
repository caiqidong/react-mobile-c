import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));
import { DatePicker } from '../index';
afterEach(cleanup);

describe('DatePicker', () => {
  it('supports date and time selection', () => {
    const onChange = vi.fn();
    render(
      <DatePicker
        defaultValue={new Date(2026, 0, 31, 8, 30)}
        max={new Date(2027, 11, 31)}
        min={new Date(2025, 0, 1)}
        onChange={onChange}
        precision="minute"
      />,
    );
    expect(screen.getAllByRole('combobox')).toHaveLength(5);
    fireEvent.change(screen.getByRole('combobox', { name: 'Column 2' }), {
      target: { value: '2' },
    });
    expect(onChange.mock.calls[0][0].getMonth()).toBe(1);
    expect(onChange.mock.calls[0][0].getDate()).toBe(28);
    expect(onChange.mock.calls[0][0].getHours()).toBe(8);
    expect(onChange.mock.calls[0][0].getMinutes()).toBe(30);
  });

  it('filters column values', () => {
    render(
      <DatePicker
        defaultValue={new Date(2026, 0, 15)}
        filter={(type, value) => type !== 'day' || value % 2 === 1}
        max={new Date(2026, 11, 31)}
        min={new Date(2026, 0, 1)}
      />,
    );
    expect(
      within(screen.getByRole('combobox', { name: 'Column 3' })).queryByRole('option', {
        name: '02',
      }),
    ).toBeNull();
  });
});
