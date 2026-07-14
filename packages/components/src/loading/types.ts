import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type LoadingSize = 'large' | 'medium' | 'small';

export interface LoadingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  className?: StyleXStyles;
  fullscreen?: boolean;
  isOpen?: boolean;
  lockScroll?: boolean;
  size?: LoadingSize;
  text?: ReactNode;
  zIndex?: number;
}
