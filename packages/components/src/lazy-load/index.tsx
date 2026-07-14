import * as stylex from '@stylexjs/stylex';
import { forwardRef, useImperativeHandle } from 'react';
import { useLazyRender } from '../hooks';
import { styles } from './styles';
import type { LazyLoadProps } from './types';

export const LazyLoad = /* @__PURE__ */ forwardRef<HTMLDivElement, LazyLoadProps>(
  ({ children, className, height, placeholder, threshold = 0.1, ...rest }, forwardedRef) => {
    const { ref, shouldRender } = useLazyRender<HTMLDivElement>(threshold);
    useImperativeHandle(forwardedRef, () => ref.current as HTMLDivElement);

    return (
      <div {...rest} {...stylex.props(styles.root, className)} ref={ref}>
        {shouldRender ? (
          children
        ) : (
          <div {...stylex.props(styles.placeholder)} aria-hidden="true" style={{ height }}>
            {placeholder}
          </div>
        )}
      </div>
    );
  },
);
LazyLoad.displayName = 'LazyLoad';
export type { LazyLoadProps } from './types';
