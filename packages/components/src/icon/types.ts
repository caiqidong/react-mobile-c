import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { ReactNode, SVGAttributes } from 'react';

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'className' | 'color'> {
  children: ReactNode;
  className?: StyleXStyles;
  color?: string;
  size?: number | string;
  title?: string;
}
