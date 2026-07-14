import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));
import { Picker } from '../index';
afterEach(cleanup);

describe('Picker', () => {
  it('supports multiple columns', () => {
    const onChange = vi.fn();
    render(
      <Picker
        columns={[
          [
            { label: 'Small', value: 's' },
            { label: 'Large', value: 'l' },
          ],
          [{ label: 'Red', value: 'r' }],
          [
            { label: 'Cotton', value: 'cotton' },
            { label: 'Wool', value: 'wool' },
          ],
        ]}
        defaultValue={['s', 'r', 'wool']}
        onChange={onChange}
      />,
    );
    fireEvent.change(screen.getByRole('combobox', { name: 'Column 1' }), {
      target: { value: 'l' },
    });
    expect(onChange.mock.calls[0][0]).toEqual(['l', 'r', 'wool']);
  });

  it('updates descendant columns in cascade mode', () => {
    render(
      <Picker
        cascade
        columns={[
          { label: 'Asia', value: 'asia', children: [{ label: 'China', value: 'cn' }] },
          { label: 'Europe', value: 'eu', children: [{ label: 'France', value: 'fr' }] },
        ]}
      />,
    );
    fireEvent.change(screen.getByRole('combobox', { name: 'Column 1' }), {
      target: { value: 'eu' },
    });
    expect((screen.getByRole('combobox', { name: 'Column 2' }) as HTMLSelectElement).value).toBe(
      'fr',
    );
  });
});
