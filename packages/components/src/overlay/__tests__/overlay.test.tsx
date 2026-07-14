import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));

import { Overlay } from '../index';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('Overlay', () => {
  it('renders only while open or exiting', () => {
    vi.useFakeTimers();
    const { rerender } = render(<Overlay data-testid="overlay" isOpen />);

    expect(screen.getByTestId('overlay').dataset.state).toBe('open');
    rerender(<Overlay data-testid="overlay" isOpen={false} />);
    expect(screen.getByTestId('overlay').dataset.state).toBe('closed');

    act(() => vi.advanceTimersByTime(250));
    expect(screen.queryByTestId('overlay')).toBeNull();
  });

  it('closes only when the backdrop itself is clicked', () => {
    const onClose = vi.fn();
    render(
      <Overlay data-testid="overlay" isOpen onClose={onClose}>
        <button type="button">Content</button>
      </Overlay>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Content' }));
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(screen.getByTestId('overlay'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('locks scrolling while open and restores body styles after closing', () => {
    const { rerender } = render(<Overlay isOpen />);
    expect(document.body.style.position).toBe('fixed');

    rerender(<Overlay isOpen={false} />);
    expect(document.body.style.position).toBe('');
  });

  it('supports disabling backdrop close and scroll locking', () => {
    const onClose = vi.fn();
    render(
      <Overlay
        closeOnClick={false}
        data-testid="overlay"
        isOpen
        lockScroll={false}
        onClose={onClose}
      />,
    );

    fireEvent.click(screen.getByTestId('overlay'));
    expect(onClose).not.toHaveBeenCalled();
    expect(document.body.style.position).toBe('');
  });
});
