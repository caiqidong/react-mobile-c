import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export interface SwipeActionItem extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  color?: string;
  key: string;
  text: ReactNode;
}

export interface SwipeActionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  className?: StyleXStyles;
  disabled?: boolean;
  leftActions?: SwipeActionItem[];
  onClose?: () => void;
  onOpen?: (side: 'left' | 'right') => void;
  rightActions?: SwipeActionItem[];
  threshold?: number;
}
