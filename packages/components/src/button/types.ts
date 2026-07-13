import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonType = 'danger' | 'outline' | 'primary' | 'text';

export type ButtonSize = 'large' | 'medium' | 'small';

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'type'
> {
  block?: boolean;
  className?: StyleXStyles;
  icon?: ReactNode;
  loading?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
}
