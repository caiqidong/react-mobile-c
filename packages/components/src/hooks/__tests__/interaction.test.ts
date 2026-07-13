import { act, fireEvent, renderHook } from '@testing-library/react';
import type { TouchEvent as ReactTouchEvent } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useClickAway } from '../useClickAway';
import { useTap } from '../useTap';

const createTouchEvent = (
  touches: Array<{ clientX: number; clientY: number; identifier: number }>,
  changedTouches = touches,
) =>
  ({
    changedTouches,
    touches,
  }) as unknown as ReactTouchEvent<HTMLDivElement>;

describe('useTap', () => {
  it('recognizes taps within the movement threshold', () => {
    const onTap = vi.fn();
    const { result } = renderHook(() => useTap<HTMLDivElement>({ onTap }));
    const startEvent = createTouchEvent([{ clientX: 10, clientY: 20, identifier: 1 }]);
    const endEvent = createTouchEvent([], [{ clientX: 15, clientY: 24, identifier: 1 }]);

    act(() => result.current.onTouchStart(startEvent));
    act(() => result.current.onTouchEnd(endEvent));

    expect(onTap).toHaveBeenCalledWith(endEvent);
  });

  it('ignores movement, cancellation, multiple touches, and disabled taps', () => {
    const onTap = vi.fn();
    const { result, rerender } = renderHook(
      ({ disabled }) => useTap<HTMLDivElement>({ disabled, onTap, threshold: 10 }),
      { initialProps: { disabled: false } },
    );
    const startEvent = createTouchEvent([{ clientX: 0, clientY: 0, identifier: 1 }]);

    act(() => result.current.onTouchStart(startEvent));
    act(() =>
      result.current.onTouchEnd(createTouchEvent([], [{ clientX: 10, clientY: 0, identifier: 1 }])),
    );
    act(() =>
      result.current.onTouchStart(
        createTouchEvent([
          { clientX: 0, clientY: 0, identifier: 1 },
          { clientX: 1, clientY: 1, identifier: 2 },
        ]),
      ),
    );
    act(() => result.current.onTouchEnd(createTouchEvent([], [])));
    act(() => result.current.onTouchStart(startEvent));
    act(() => result.current.onTouchCancel());
    act(() => result.current.onTouchEnd(createTouchEvent([], [startEvent.touches[0]])));
    act(() => result.current.onTouchStart(startEvent));
    act(() =>
      result.current.onTouchEnd(createTouchEvent([], [{ clientX: 0, clientY: 0, identifier: 2 }])),
    );

    rerender({ disabled: true });
    act(() => result.current.onTouchStart(startEvent));
    act(() => result.current.onTouchEnd(createTouchEvent([], [startEvent.touches[0]])));

    expect(onTap).not.toHaveBeenCalled();
  });
});

describe('useClickAway', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls the latest callback only for events outside the element', () => {
    vi.stubGlobal('PointerEvent', undefined);
    const firstCallback = vi.fn();
    const nextCallback = vi.fn();
    const { result, rerender } = renderHook(
      ({ onClickAway }) => useClickAway<HTMLDivElement>(onClickAway),
      { initialProps: { onClickAway: firstCallback } },
    );
    const element = document.createElement('div');
    const child = document.createElement('button');
    element.append(child);
    document.body.append(element);
    result.current.current = element;

    fireEvent.mouseDown(child);
    expect(firstCallback).not.toHaveBeenCalled();

    rerender({ onClickAway: nextCallback });
    fireEvent.mouseDown(document.body);

    expect(firstCallback).not.toHaveBeenCalled();
    expect(nextCallback).toHaveBeenCalledOnce();
    element.remove();
  });

  it('removes document listeners when unmounted', () => {
    vi.stubGlobal('PointerEvent', undefined);
    const removeEventListener = vi.spyOn(document, 'removeEventListener');
    const { unmount } = renderHook(() => useClickAway(() => undefined));

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function), true);
    expect(removeEventListener).toHaveBeenCalledWith('touchstart', expect.any(Function), true);
  });
});
