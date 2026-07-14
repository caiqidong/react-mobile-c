import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'className' | 'defaultChecked' | 'onChange' | 'type'
> {
  checked?: boolean;
  checkedIcon?: ReactNode;
  className?: StyleXStyles;
  defaultChecked?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
  onChange?: (checked: boolean) => void;
}
