import * as stylex from '@stylexjs/stylex';
import { useEffect } from 'react';
import { createRoot, type Root } from 'react-dom/client';

import { durationValues } from '../styles/tokens.stylex';
import { styles } from './styles';
import type { ToastHandle, ToastOptions, ToastProps, ToastType } from './types';

const defaultDuration = 2000;
const exitDuration = Number.parseInt(durationValues.fast, 10);

export function Toast({
  className,
  duration = defaultDuration,
  isOpen = false,
  message,
  onClose,
  type = 'info',
  zIndex = 1100,
}: ToastProps) {
  useEffect(() => {
    if (!isOpen || duration <= 0 || type === 'loading') {
      return;
    }

    const timer = window.setTimeout(() => onClose?.(), duration);
    return () => window.clearTimeout(timer);
  }, [duration, isOpen, onClose, type]);

  if (!isOpen && !message) {
    return null;
  }

  return (
    <div {...stylex.props(styles.viewport)} style={{ zIndex }}>
      <div
        {...stylex.props(styles.toast, !isOpen && styles.closed, className)}
        aria-live={type === 'error' ? 'assertive' : 'polite'}
        data-state={isOpen ? 'open' : 'closed'}
        role={type === 'error' ? 'alert' : 'status'}
      >
        <span {...stylex.props(styles.indicator, styles[type])} aria-hidden="true" />
        <span {...stylex.props(styles.message)}>{message}</span>
      </div>
    </div>
  );
}

let imperativeRoot: Root | undefined;
let imperativeContainer: HTMLDivElement | undefined;
let currentClose: (() => void) | undefined;
let cleanupTimer: number | undefined;
let currentToastId = 0;

const destroyImperativeToast = () => {
  imperativeRoot?.unmount();
  imperativeContainer?.remove();
  imperativeRoot = undefined;
  imperativeContainer = undefined;
  currentClose = undefined;
};

const showToast = (options: ToastOptions): ToastHandle => {
  if (typeof document === 'undefined') {
    return { close: () => undefined };
  }

  if (cleanupTimer !== undefined) {
    window.clearTimeout(cleanupTimer);
  }

  if (!imperativeContainer) {
    imperativeContainer = document.createElement('div');
    document.body.appendChild(imperativeContainer);
    imperativeRoot = createRoot(imperativeContainer);
  }

  const toastId = ++currentToastId;
  const close = () => {
    if (toastId !== currentToastId) {
      return;
    }

    imperativeRoot?.render(<Toast {...options} isOpen={false} />);
    cleanupTimer = window.setTimeout(destroyImperativeToast, exitDuration);
  };

  currentClose = close;
  imperativeRoot?.render(<Toast {...options} isOpen onClose={close} />);
  return { close };
};

const typedToast =
  (type: ToastType) =>
  (message: ToastOptions['message'], options: Omit<ToastOptions, 'message' | 'type'> = {}) =>
    showToast({ ...options, message, type });

// Component libraries intentionally colocate their imperative facade with the component export.
// eslint-disable-next-line react-refresh/only-export-components
export const toast = {
  clear: () => currentClose?.(),
  error: typedToast('error'),
  info: typedToast('info'),
  loading: typedToast('loading'),
  show: (messageOrOptions: ToastOptions['message'] | ToastOptions): ToastHandle =>
    showToast(
      typeof messageOrOptions === 'object' &&
        messageOrOptions !== null &&
        'message' in messageOrOptions
        ? messageOrOptions
        : { message: messageOrOptions },
    ),
  success: typedToast('success'),
};

export type { ToastHandle, ToastOptions, ToastProps, ToastType } from './types';
