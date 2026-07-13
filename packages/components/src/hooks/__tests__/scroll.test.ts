import { act, renderHook } from '@testing-library/react';
import type { RefObject } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useLockScroll } from '../useLockScroll';
import { useScroll } from '../useScroll';

describe('useLockScroll', () => {
  afterEach(() => {
    document.body.removeAttribute('style');
    vi.restoreAllMocks();
  });

  it('locks and restores the body at its scroll position', () => {
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 120 });
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    document.body.style.overflow = 'auto';
    const { unmount } = renderHook(() => useLockScroll());

    expect(document.body.style.position).toBe('fixed');
    expect(document.body.style.top).toBe('-120px');
    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.position).toBe('');
    expect(document.body.style.top).toBe('');
    expect(document.body.style.overflow).toBe('auto');
    expect(scrollTo).toHaveBeenCalledWith(0, 120);
  });

  it('keeps nested locks active until the final owner unmounts', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    const firstLock = renderHook(() => useLockScroll());
    const secondLock = renderHook(() => useLockScroll());

    firstLock.unmount();
    expect(document.body.style.position).toBe('fixed');

    secondLock.unmount();
    expect(document.body.style.position).toBe('');
  });
});

describe('useScroll', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('tracks window position, direction, and the idle state', () => {
    vi.useFakeTimers();
    let frameCallback: FrameRequestCallback = () => undefined;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      frameCallback = callback;
      return 1;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined);
    Object.defineProperty(window, 'scrollX', { configurable: true, value: 0 });
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
    const { result } = renderHook(() => useScroll({ idleDelay: 50 }));

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 80 });
    act(() => window.dispatchEvent(new Event('scroll')));
    act(() => frameCallback(0));

    expect(result.current).toEqual({
      direction: 'down',
      isScrolling: true,
      scrollX: 0,
      scrollY: 80,
    });

    act(() => vi.advanceTimersByTime(50));
    expect(result.current.isScrolling).toBe(false);
  });

  it('tracks an element target and removes its listener', () => {
    let frameCallback: FrameRequestCallback = () => undefined;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      frameCallback = callback;
      return 1;
    });
    const element = document.createElement('div');
    const removeEventListener = vi.spyOn(element, 'removeEventListener');
    const target = { current: element } as RefObject<HTMLElement>;
    const { result, unmount } = renderHook(() => useScroll({ target }));

    element.scrollLeft = 40;
    act(() => element.dispatchEvent(new Event('scroll')));
    act(() => frameCallback(0));

    expect(result.current.direction).toBe('right');
    expect(result.current.scrollX).toBe(40);

    unmount();
    expect(removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
