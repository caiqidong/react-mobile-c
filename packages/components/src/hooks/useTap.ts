import { useCallback, useRef, type TouchEvent as ReactTouchEvent } from 'react';

const DEFAULT_TAP_THRESHOLD = 10;

interface TouchPosition {
  identifier: number;
  x: number;
  y: number;
}

export interface UseTapOptions<Element extends HTMLElement = HTMLElement> {
  disabled?: boolean;
  onTap?: (event: ReactTouchEvent<Element>) => void;
  threshold?: number;
}

export function useTap<Element extends HTMLElement = HTMLElement>({
  disabled = false,
  onTap,
  threshold = DEFAULT_TAP_THRESHOLD,
}: UseTapOptions<Element>) {
  const startPositionRef = useRef<TouchPosition | null>(null);

  const onTouchStart = useCallback(
    (event: ReactTouchEvent<Element>) => {
      if (disabled || event.touches.length !== 1) {
        startPositionRef.current = null;
        return;
      }

      const touch = event.touches[0];
      startPositionRef.current = {
        identifier: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
      };
    },
    [disabled],
  );

  const onTouchEnd = useCallback(
    (event: ReactTouchEvent<Element>) => {
      const startPosition = startPositionRef.current;
      startPositionRef.current = null;

      if (disabled || !startPosition) {
        return;
      }

      const touch = Array.from(event.changedTouches).find(
        (changedTouch) => changedTouch.identifier === startPosition.identifier,
      );

      if (!touch) {
        return;
      }

      const deltaX = Math.abs(touch.clientX - startPosition.x);
      const deltaY = Math.abs(touch.clientY - startPosition.y);

      if (deltaX < threshold && deltaY < threshold) {
        onTap?.(event);
      }
    },
    [disabled, onTap, threshold],
  );

  const onTouchCancel = useCallback(() => {
    startPositionRef.current = null;
  }, []);

  return { onTouchCancel, onTouchEnd, onTouchStart };
}
