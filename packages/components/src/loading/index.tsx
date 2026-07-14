import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';

import { Overlay } from '../overlay';
import { styles } from './styles';
import type { LoadingProps } from './types';

export const Loading = /* @__PURE__ */ forwardRef<HTMLDivElement, LoadingProps>(
  (
    {
      className,
      fullscreen = false,
      isOpen = true,
      lockScroll = true,
      size = 'medium',
      text,
      zIndex,
      ...rest
    },
    ref,
  ) => {
    const content = (
      <div
        {...rest}
        {...stylex.props(styles.root, fullscreen && styles.fullscreenContent, className)}
        aria-live="polite"
        ref={ref}
        role="status"
      >
        <span {...stylex.props(styles.spinner, styles[size])} aria-hidden="true" />
        {text ? <span {...stylex.props(styles.text)}>{text}</span> : null}
      </div>
    );

    if (!fullscreen) {
      return isOpen ? content : null;
    }

    return (
      <Overlay
        className={styles.fullscreen}
        closeOnClick={false}
        isOpen={isOpen}
        lockScroll={lockScroll}
        zIndex={zIndex}
      >
        {content}
      </Overlay>
    );
  },
);

Loading.displayName = 'Loading';

export type { LoadingProps, LoadingSize } from './types';
