import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { ReactNode } from 'react';

export interface DialogProps {
  cancelText?: ReactNode;
  children?: ReactNode;
  className?: StyleXStyles;
  closeOnOverlayClick?: boolean;
  confirmText?: ReactNode;
  isOpen?: boolean;
  onCancel?: () => void;
  onClose?: () => void;
  onConfirm?: () => void | Promise<void>;
  showCancel?: boolean;
  title?: ReactNode;
  zIndex?: number;
}

export interface DialogOptions extends Omit<
  DialogProps,
  'isOpen' | 'onCancel' | 'onClose' | 'onConfirm'
> {
  content?: ReactNode;
}
