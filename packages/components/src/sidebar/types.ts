import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export interface SidebarItem {
  disabled?: boolean;
  key: string;
  label: ReactNode;
}

export interface SidebarProps extends Omit<HTMLAttributes<HTMLElement>, 'className' | 'onChange'> {
  activeKey?: string;
  className?: StyleXStyles;
  defaultActiveKey?: string;
  items: SidebarItem[];
  onChange?: (key: string) => void;
  onScrollTo?: (key: string) => void;
}
