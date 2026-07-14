import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'className' | 'onChange' | 'type'
> {
  checked?: boolean;
  checkedIcon?: ReactNode;
  className?: StyleXStyles;
  icon?: ReactNode;
  label?: ReactNode;
  onChange?: () => void;
  value: string;
}

export interface RadioOption {
  disabled?: boolean;
  label: ReactNode;
  value: string;
}

export interface RadioGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'className' | 'defaultValue' | 'onChange'
> {
  className?: StyleXStyles;
  defaultValue?: string;
  disabled?: boolean;
  name?: string;
  onChange?: (value: string) => void;
  options: RadioOption[];
  value?: string;
}
