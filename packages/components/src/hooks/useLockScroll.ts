import { useEffect } from 'react';

interface BodyStyleSnapshot {
  overflow: string;
  position: string;
  top: string;
  width: string;
}

interface ScrollLockState {
  count: number;
  scrollY: number;
  styles: BodyStyleSnapshot;
}

const scrollLocks = new WeakMap<Document, ScrollLockState>();

const lockScroll = (ownerDocument: Document): void => {
  const existingLock = scrollLocks.get(ownerDocument);

  if (existingLock) {
    existingLock.count += 1;
    return;
  }

  const body = ownerDocument.body;
  const ownerWindow = ownerDocument.defaultView;
  const scrollY = ownerWindow?.scrollY ?? 0;

  scrollLocks.set(ownerDocument, {
    count: 1,
    scrollY,
    styles: {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    },
  });

  body.style.overflow = 'hidden';
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}px`;
  body.style.width = '100%';
};

const unlockScroll = (ownerDocument: Document): void => {
  const lock = scrollLocks.get(ownerDocument);

  if (!lock) {
    return;
  }

  lock.count -= 1;

  if (lock.count > 0) {
    return;
  }

  const body = ownerDocument.body;
  body.style.overflow = lock.styles.overflow;
  body.style.position = lock.styles.position;
  body.style.top = lock.styles.top;
  body.style.width = lock.styles.width;
  scrollLocks.delete(ownerDocument);
  ownerDocument.defaultView?.scrollTo(0, lock.scrollY);
};

export function useLockScroll(locked = true): void {
  useEffect(() => {
    if (!locked || typeof document === 'undefined') {
      return;
    }

    lockScroll(document);

    return () => unlockScroll(document);
  }, [locked]);
}
