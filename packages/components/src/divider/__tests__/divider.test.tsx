import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));

import { Divider } from '../index';

afterEach(cleanup);

describe('Divider', () => {
  it('renders a labelled horizontal separator', () => {
    render(<Divider>Details</Divider>);
    const divider = screen.getByRole('separator');
    expect(divider.getAttribute('aria-orientation')).toBe('horizontal');
    expect(screen.getByText('Details')).toBeTruthy();
  });

  it('renders a vertical separator and forwards its ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Divider orientation="vertical" ref={ref} />);
    expect(ref.current?.getAttribute('aria-orientation')).toBe('vertical');
  });
});
