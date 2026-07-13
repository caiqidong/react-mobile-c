import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useControllableValue } from '../useControllableValue';
import { useMountedRef } from '../useMountedRef';

describe('state hooks', () => {
  it('tracks the mounted lifecycle', () => {
    const { result, unmount } = renderHook(() => useMountedRef());

    expect(result.current.current).toBe(true);
    unmount();
    expect(result.current.current).toBe(false);
  });

  it('updates uncontrolled values and emits changes', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableValue({ defaultValue: 1, onChange }));

    act(() => result.current[1]((value) => value + 1));
    act(() => result.current[1]((value) => value + 1));

    expect(result.current[0]).toBe(3);
    expect(onChange).toHaveBeenNthCalledWith(1, 2);
    expect(onChange).toHaveBeenNthCalledWith(2, 3);
  });

  it('emits controlled changes without mutating the source value', () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useControllableValue({ value, defaultValue: 0, onChange }),
      { initialProps: { value: 4 } },
    );

    act(() => result.current[1](5));
    expect(result.current[0]).toBe(4);
    expect(onChange).toHaveBeenCalledWith(5);

    rerender({ value: 5 });
    expect(result.current[0]).toBe(5);
  });
});
