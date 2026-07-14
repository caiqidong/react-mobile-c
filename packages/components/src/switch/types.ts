import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface SwitchProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'onChange' | 'role' | 'value'
> {
  checked?: boolean;
  checkedContent?: ReactNode;
  className?: StyleXStyles;
  defaultChecked?: boolean;
  loading?: boolean;
  onChange?: (checked: boolean) => void;
  uncheckedContent?: ReactNode;
}
