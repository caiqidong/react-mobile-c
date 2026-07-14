import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export interface PickerOption {
  children?: PickerOption[];
  disabled?: boolean;
  label: ReactNode;
  value: string;
}

export type PickerColumns = PickerOption[] | PickerOption[][];

export interface PickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'className' | 'defaultValue' | 'onChange'
> {
  cascade?: boolean;
  className?: StyleXStyles;
  columns: PickerColumns;
  defaultValue?: string[];
  disabled?: boolean;
  onChange?: (value: string[], selectedOptions: PickerOption[]) => void;
  value?: string[];
}
