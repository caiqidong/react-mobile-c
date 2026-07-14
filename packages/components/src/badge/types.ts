import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'content'> {
  className?: StyleXStyles;
  color?: string;
  content?: ReactNode;
  dot?: boolean;
  max?: number;
  showZero?: boolean;
}
