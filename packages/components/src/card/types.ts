import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'title'> {
  className?: StyleXStyles;
  extra?: ReactNode;
  footer?: ReactNode;
  title?: ReactNode;
}
