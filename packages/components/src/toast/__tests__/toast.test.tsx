import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  keyframes: (frames: object) => frames,
  props: () => ({}),
}));

import { Toast, toast } from '../index';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('Toast', () => {
  it('renders the requested message and semantic role', () => {
    render(<Toast isOpen message="Failed" type="error" />);
    expect(screen.getByRole('alert').textContent).toBe('Failed');
  });

  it('closes automatically after the configured duration', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast duration={500} isOpen message="Saved" onClose={onClose} type="success" />);

    act(() => vi.advanceTimersByTime(500));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('keeps loading toast open until explicitly closed', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast duration={500} isOpen message="Loading" onClose={onClose} type="loading" />);

    act(() => vi.advanceTimersByTime(500));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('ignores a stale handle after a newer imperative toast replaces it', async () => {
    vi.useFakeTimers();
    let firstHandle: ReturnType<typeof toast.show>;

    act(() => {
      firstHandle = toast.show({ duration: 0, message: 'First' });
      toast.show({ duration: 0, message: 'Second' });
    });
    await act(async () => undefined);

    act(() => firstHandle.close());
    expect(screen.getByRole('status').textContent).toBe('Second');

    act(() => toast.clear());
    act(() => vi.advanceTimersByTime(150));
  });
});
