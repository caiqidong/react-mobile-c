import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export interface LazyLoadProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  className?: StyleXStyles;
  height?: number | string;
  placeholder?: ReactNode;
  threshold?: number | number[];
}
