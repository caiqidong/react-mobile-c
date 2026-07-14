import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export interface IndexBarSection {
  children: ReactNode;
  index: string;
}

export interface IndexBarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'className' | 'onChange'
> {
  className?: StyleXStyles;
  defaultActiveIndex?: string;
  indexes?: string[];
  onChange?: (index: string) => void;
  sections: IndexBarSection[];
  sticky?: boolean;
}
