import { useEffect, useRef, type MutableRefObject } from 'react';

export function useClickAway<Element extends HTMLElement = HTMLElement>(
  onClickAway: (event: Event) => void,
): MutableRefObject<Element | null> {
  const elementRef = useRef<Element | null>(null);
  const callbackRef = useRef(onClickAway);
  callbackRef.current = onClickAway;

  useEffect(() => {
    const handleEvent = (event: Event) => {
      const element = elementRef.current;
      const target = event.target;

      if (!element || !(target instanceof Node)) {
        return;
      }

      const eventPath = typeof event.composedPath === 'function' ? event.composedPath() : [];

      if (element.contains(target) || eventPath.includes(element)) {
        return;
      }

      callbackRef.current(event);
    };

    if (typeof window.PointerEvent === 'function') {
      document.addEventListener('pointerdown', handleEvent, true);
      return () => document.removeEventListener('pointerdown', handleEvent, true);
    }

    document.addEventListener('mousedown', handleEvent, true);
    document.addEventListener('touchstart', handleEvent, true);

    return () => {
      document.removeEventListener('mousedown', handleEvent, true);
      document.removeEventListener('touchstart', handleEvent, true);
    };
  }, []);

  return elementRef;
}
