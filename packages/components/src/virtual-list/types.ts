import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { HTMLAttributes, Key, ReactNode } from 'react';

export interface VirtualListProps<Item> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'className'
> {
  className?: StyleXStyles;
  data: Item[];
  height: number;
  itemHeight: number;
  itemKey?: (item: Item, index: number) => Key;
  overscan?: number;
  renderItem: (item: Item, index: number) => ReactNode;
}
