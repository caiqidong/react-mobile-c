import type { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';
import type { ImgHTMLAttributes, ReactNode, SyntheticEvent } from 'react';

export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

export type ImageRadius = 'large' | 'medium' | 'none' | 'round' | 'small';

export interface ImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'className' | 'onError' | 'onLoad'
> {
  className?: StyleXStyles;
  fallback?: ReactNode;
  fit?: ImageFit;
  lazy?: boolean;
  onError?: (event: SyntheticEvent<HTMLImageElement>) => void;
  onLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;
  placeholder?: ReactNode;
  radius?: ImageRadius;
}
