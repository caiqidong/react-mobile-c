import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { ReactNode } from 'react';

export type ToastType = 'error' | 'info' | 'loading' | 'success';

export interface ToastProps {
  className?: StyleXStyles;
  duration?: number;
  isOpen?: boolean;
  message: ReactNode;
  onClose?: () => void;
  type?: ToastType;
  zIndex?: number;
}

export type ToastOptions = Omit<ToastProps, 'isOpen' | 'onClose'>;

export interface ToastHandle {
  close: () => void;
}
