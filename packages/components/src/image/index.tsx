import * as stylex from '@stylexjs/stylex';
import { forwardRef, useState, type SyntheticEvent } from 'react';

import { fitStyles, styles } from './styles';
import type { ImageFit, ImageProps } from './types';

const fitStyleMap: Record<ImageFit, keyof typeof fitStyles> = {
  contain: 'contain',
  cover: 'cover',
  fill: 'fill',
  none: 'none',
  'scale-down': 'scaleDown',
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      alt = '',
      className,
      fallback = 'Image unavailable',
      fit = 'cover',
      lazy = true,
      onError,
      onLoad,
      placeholder,
      radius = 'medium',
      src,
      ...rest
    },
    ref,
  ) => {
    const [loadedSource, setLoadedSource] = useState<string>();
    const [failedSource, setFailedSource] = useState<string>();
    const isLoaded = Boolean(src && loadedSource === src);
    const hasError = Boolean(src && failedSource === src);

    const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
      setLoadedSource(src);
      setFailedSource(undefined);
      onLoad?.(event);
    };

    const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
      setFailedSource(src);
      setLoadedSource(undefined);
      onError?.(event);
    };

    return (
      <span {...stylex.props(styles.root, styles[radius], className)}>
        <img
          {...rest}
          {...stylex.props(styles.image, fitStyles[fitStyleMap[fit]], !isLoaded && styles.loading)}
          alt={alt}
          loading={lazy ? 'lazy' : 'eager'}
          onError={handleError}
          onLoad={handleLoad}
          ref={ref}
          src={src}
        />
        {!isLoaded && !hasError ? (
          <span {...stylex.props(styles.overlay)} aria-hidden="true">
            {placeholder}
          </span>
        ) : null}
        {hasError ? (
          <span {...stylex.props(styles.overlay)} role="status">
            {fallback}
          </span>
        ) : null}
      </span>
    );
  },
);

Image.displayName = 'Image';

export type { ImageFit, ImageProps, ImageRadius } from './types';
