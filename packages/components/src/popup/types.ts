import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type PopupPosition = 'bottom' | 'center' | 'left' | 'right' | 'top';

export interface PopupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'title'> {
  children?: ReactNode;
  className?: StyleXStyles;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  isOpen?: boolean;
  lockScroll?: boolean;
  onClose?: () => void;
  position?: PopupPosition;
  portalContainer?: Element | DocumentFragment | null;
  zIndex?: number;
}
