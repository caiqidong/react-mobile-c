import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'defaultValue' | 'onChange' | 'prefix' | 'size' | 'value'
> {
  className?: StyleXStyles;
  clearable?: boolean;
  defaultValue?: string;
  onChange?: (value: string, event?: ChangeEvent<HTMLInputElement>) => void;
  prefix?: ReactNode;
  showCount?: boolean;
  suffix?: ReactNode;
  value?: string;
}
