import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';

export interface OverlayProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'className' | 'onClick'
> {
  children?: ReactNode;
  className?: StyleXStyles;
  closeOnClick?: boolean;
  isOpen?: boolean;
  lockScroll?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onClose?: () => void;
  zIndex?: number;
}
