import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export interface NavBarProps extends Omit<HTMLAttributes<HTMLElement>, 'className' | 'title'> {
  backArrow?: boolean | ReactNode;
  className?: StyleXStyles;
  left?: ReactNode;
  onBack?: () => void;
  right?: ReactNode;
  safeAreaInsetTop?: boolean;
  title?: ReactNode;
}
