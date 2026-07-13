import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';

import { styles } from './styles';
import type { IconProps } from './types';

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      children,
      className,
      color = 'currentColor',
      role,
      size = '1em',
      style,
      title,
      viewBox = '0 0 24 24',
      ...rest
    },
    ref,
  ) => {
    const isLabelled = Boolean(title || rest['aria-label'] || rest['aria-labelledby']);

    return (
      <svg
        {...rest}
        {...stylex.props(styles.base, className)}
        aria-hidden={isLabelled ? undefined : true}
        fill="currentColor"
        focusable="false"
        height={size}
        ref={ref}
        role={role ?? (isLabelled ? 'img' : undefined)}
        style={{ color, ...style }}
        viewBox={viewBox}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {title ? <title>{title}</title> : null}
        {children}
      </svg>
    );
  },
);

Icon.displayName = 'Icon';

export type { IconProps } from './types';
