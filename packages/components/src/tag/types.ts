import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { HTMLAttributes, MouseEvent } from 'react';

export type TagSize = 'large' | 'medium' | 'small';
export type TagType = 'danger' | 'default' | 'primary' | 'success' | 'warning';

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'className'> {
  className?: StyleXStyles;
  closeable?: boolean;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
  size?: TagSize;
  type?: TagType;
}
