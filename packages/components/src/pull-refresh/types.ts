import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type PullRefreshStatus = 'idle' | 'pulling' | 'ready' | 'refreshing';

export interface PullRefreshProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  className?: StyleXStyles;
  disabled?: boolean;
  loadingText?: ReactNode;
  onRefresh: () => Promise<void> | void;
  pullingText?: ReactNode;
  refreshing?: boolean;
  releaseText?: ReactNode;
  threshold?: number;
}
