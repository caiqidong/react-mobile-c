import { useEffect, useRef, useState, type MutableRefObject } from 'react';

export interface LazyRenderResult<Element extends HTMLElement> {
  ref: MutableRefObject<Element | null>;
  shouldRender: boolean;
}

export function useLazyRender<Element extends HTMLElement = HTMLDivElement>(
  threshold: number | number[] = 0.1,
): LazyRenderResult<Element> {
  const ref = useRef<Element | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (shouldRender || !element) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [shouldRender, threshold]);

  return { ref, shouldRender };
}
