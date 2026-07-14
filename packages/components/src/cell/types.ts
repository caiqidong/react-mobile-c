import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export interface CellProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'title'> {
  arrow?: boolean | ReactNode;
  className?: StyleXStyles;
  description?: ReactNode;
  icon?: ReactNode;
  title?: ReactNode;
  value?: ReactNode;
}
