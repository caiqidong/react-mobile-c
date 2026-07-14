import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));

import { IndexBar } from '../index';

afterEach(cleanup);

describe('IndexBar', () => {
  it('renders sections and scrolls to a selected index', () => {
    const onChange = vi.fn();
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    render(
      <IndexBar
        onChange={onChange}
        sections={[
          { children: <div>Alice</div>, index: 'A' },
          { children: <div>Bob</div>, index: 'B' },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(onChange).toHaveBeenCalledWith('B');
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(screen.getByText('Bob')).toBeTruthy();
  });
});
