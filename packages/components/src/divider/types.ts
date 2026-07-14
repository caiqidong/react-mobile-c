import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { HTMLAttributes } from 'react';

export type DividerContentPosition = 'center' | 'left' | 'right';
export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  className?: StyleXStyles;
  contentPosition?: DividerContentPosition;
  dashed?: boolean;
  orientation?: DividerOrientation;
}
