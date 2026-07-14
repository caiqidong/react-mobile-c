import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));

import { Sidebar } from '../index';

afterEach(cleanup);

describe('Sidebar', () => {
  it('updates the active category and requests content scrolling', () => {
    const onChange = vi.fn();
    const onScrollTo = vi.fn();
    render(
      <Sidebar
        items={[
          { key: 'fruit', label: 'Fruit' },
          { key: 'drinks', label: 'Drinks' },
        ]}
        onChange={onChange}
        onScrollTo={onScrollTo}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Drinks' }));
    expect(onChange).toHaveBeenCalledWith('drinks');
    expect(onScrollTo).toHaveBeenCalledWith('drinks');
    expect(screen.getByRole('button', { name: 'Drinks' }).getAttribute('aria-current')).toBe(
      'page',
    );
  });
});
