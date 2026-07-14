import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  keyframes: (frames: object) => frames,
  props: () => ({}),
}));

import { Loading } from '../index';

afterEach(cleanup);

describe('Loading', () => {
  it('renders inline loading status and forwards its ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Loading ref={ref} text="Fetching" />);

    expect(screen.getByRole('status').textContent).toBe('Fetching');
    expect(screen.getByRole('status')).toBe(ref.current);
  });

  it('renders fullscreen and locks scrolling while open', () => {
    render(<Loading fullscreen text="Loading" />);

    expect(screen.getByRole('status').textContent).toBe('Loading');
    expect(document.body.style.position).toBe('fixed');
  });

  it('does not render when closed', () => {
    render(<Loading isOpen={false} />);
    expect(screen.queryByRole('status')).toBeNull();
  });
});
