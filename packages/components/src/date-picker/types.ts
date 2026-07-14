import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { HTMLAttributes } from 'react';

export type DatePickerColumnType = 'day' | 'hour' | 'minute' | 'month' | 'year';
export type DatePickerPrecision = 'date' | 'minute';

export interface DatePickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'className' | 'defaultValue' | 'onChange'
> {
  className?: StyleXStyles;
  defaultValue?: Date;
  disabled?: boolean;
  filter?: (type: DatePickerColumnType, value: number) => boolean;
  max?: Date;
  min?: Date;
  onChange?: (value: Date) => void;
  precision?: DatePickerPrecision;
  value?: Date;
}
