import { useEffect, useState, type RefObject } from 'react';

export type ScrollDirection = 'down' | 'left' | 'none' | 'right' | 'up';

export interface ScrollState {
  direction: ScrollDirection;
  isScrolling: boolean;
  scrollX: number;
  scrollY: number;
}

export interface UseScrollOptions {
  idleDelay?: number;
  target?: RefObject<HTMLElement>;
}

const initialState: ScrollState = {
  direction: 'none',
  isScrolling: false,
  scrollX: 0,
  scrollY: 0,
};

const getDirection = (
  previousX: number,
  previousY: number,
  nextX: number,
  nextY: number,
): ScrollDirection => {
  const deltaX = nextX - previousX;
  const deltaY = nextY - previousY;

  if (deltaX === 0 && deltaY === 0) {
    return 'none';
  }

  if (Math.abs(deltaY) >= Math.abs(deltaX)) {
    return deltaY > 0 ? 'down' : 'up';
  }

  return deltaX > 0 ? 'right' : 'left';
};

export function useScroll({ idleDelay = 100, target }: UseScrollOptions = {}): ScrollState {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const scrollTarget = target ? target.current : window;

    if (!scrollTarget) {
      return;
    }

    const readPosition = () =>
      scrollTarget === window
        ? { x: window.scrollX, y: window.scrollY }
        : {
            x: (scrollTarget as HTMLElement).scrollLeft,
            y: (scrollTarget as HTMLElement).scrollTop,
          };
    let previousPosition = readPosition();
    let frameId: number | null = null;
    let idleTimer: number | null = null;
    const requestFrame =
      window.requestAnimationFrame?.bind(window) ??
      ((callback: FrameRequestCallback) => window.setTimeout(callback, 16));
    const cancelFrame = window.cancelAnimationFrame?.bind(window) ?? window.clearTimeout;

    setState({ ...initialState, scrollX: previousPosition.x, scrollY: previousPosition.y });

    const updateScroll = () => {
      frameId = null;
      const nextPosition = readPosition();
      const direction = getDirection(
        previousPosition.x,
        previousPosition.y,
        nextPosition.x,
        nextPosition.y,
      );
      previousPosition = nextPosition;

      setState({
        direction,
        isScrolling: true,
        scrollX: nextPosition.x,
        scrollY: nextPosition.y,
      });

      if (idleTimer !== null) {
        window.clearTimeout(idleTimer);
      }

      idleTimer = window.setTimeout(
        () => {
          setState((currentState) => ({ ...currentState, isScrolling: false }));
        },
        Math.max(0, idleDelay),
      );
    };

    const handleScroll = () => {
      if (frameId === null) {
        frameId = requestFrame(updateScroll);
      }
    };

    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollTarget.removeEventListener('scroll', handleScroll);

      if (frameId !== null) {
        cancelFrame(frameId);
      }

      if (idleTimer !== null) {
        window.clearTimeout(idleTimer);
      }
    };
  }, [idleDelay, target]);

  return state;
}
