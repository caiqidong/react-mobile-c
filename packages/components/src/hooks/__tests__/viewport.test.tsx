import { act, render, renderHook, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useKeyboard } from '../useKeyboard';
import { useLazyRender } from '../useLazyRender';

class VisualViewportMock extends EventTarget {
  height = 800;
  offsetTop = 0;
}

describe('useKeyboard', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('tracks keyboard height from visual viewport changes', () => {
    const viewport = new VisualViewportMock();
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 });
    Object.defineProperty(window, 'visualViewport', {
      configurable: true,
      value: viewport,
    });
    const { result } = renderHook(() => useKeyboard({ threshold: 100 }));

    expect(result.current).toEqual({ isKeyboardVisible: false, keyboardHeight: 0 });

    viewport.height = 500;
    act(() => viewport.dispatchEvent(new Event('resize')));
    expect(result.current).toEqual({ isKeyboardVisible: true, keyboardHeight: 300 });

    viewport.height = 750;
    act(() => viewport.dispatchEvent(new Event('scroll')));
    expect(result.current).toEqual({ isKeyboardVisible: false, keyboardHeight: 0 });
  });

  it('removes viewport listeners when unmounted', () => {
    const viewport = new VisualViewportMock();
    Object.defineProperty(window, 'visualViewport', {
      configurable: true,
      value: viewport,
    });
    const removeEventListener = vi.spyOn(viewport, 'removeEventListener');
    const { unmount } = renderHook(() => useKeyboard());

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});

describe('useLazyRender', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders once the element intersects and disconnects the observer', () => {
    let observerCallback: IntersectionObserverCallback = () => undefined;
    const observe = vi.fn();
    const disconnect = vi.fn();
    const IntersectionObserverMock = vi.fn(function (
      this: IntersectionObserver,
      callback: IntersectionObserverCallback,
    ) {
      observerCallback = callback;
      return { disconnect, observe, unobserve: vi.fn(), takeRecords: vi.fn() };
    });
    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

    const LazyContent = () => {
      const { ref, shouldRender } = useLazyRender<HTMLDivElement>(0.5);
      return <div ref={ref}>{shouldRender ? 'visible' : 'waiting'}</div>;
    };

    render(<LazyContent />);
    expect(observe).toHaveBeenCalledWith(screen.getByText('waiting'));

    act(() =>
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      ),
    );

    expect(screen.getByText('visible')).toBeTruthy();
    expect(disconnect).toHaveBeenCalled();
    expect(IntersectionObserverMock).toHaveBeenCalledWith(expect.any(Function), {
      threshold: 0.5,
    });
  });

  it('renders immediately when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);

    const LazyContent = () => {
      const { ref, shouldRender } = useLazyRender<HTMLDivElement>();
      return <div ref={ref}>{shouldRender ? 'fallback' : 'waiting'}</div>;
    };

    render(<LazyContent />);

    expect(screen.getByText('fallback')).toBeTruthy();
  });
});
