import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export interface TabBarItem {
  badge?: ReactNode;
  disabled?: boolean;
  href?: string;
  icon?: ReactNode;
  key: string;
  label: ReactNode;
}

export interface TabBarProps extends Omit<HTMLAttributes<HTMLElement>, 'className' | 'onChange'> {
  activeKey?: string;
  className?: StyleXStyles;
  defaultActiveKey?: string;
  items: TabBarItem[];
  onChange?: (key: string) => void;
  safeAreaInsetBottom?: boolean;
}
