import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { ChangeEvent, TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'className' | 'defaultValue' | 'onChange' | 'value'
> {
  autoSize?: boolean;
  className?: StyleXStyles;
  defaultValue?: string;
  onChange?: (value: string, event?: ChangeEvent<HTMLTextAreaElement>) => void;
  showCount?: boolean;
  value?: string;
}
