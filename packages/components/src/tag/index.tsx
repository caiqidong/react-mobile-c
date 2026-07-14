import * as stylex from '@stylexjs/stylex';
import { forwardRef, type MouseEvent } from 'react';

import { styles } from './styles';
import type { TagProps } from './types';

export const Tag = /* @__PURE__ */ forwardRef<HTMLSpanElement, TagProps>(
  (
    { children, className, closeable = false, onClose, size = 'medium', type = 'default', ...rest },
    ref,
  ) => {
    const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onClose?.(event);
    };

    return (
      <span
        {...rest}
        {...stylex.props(styles.base, styles[type], styles[size], className)}
        ref={ref}
      >
        {children}
        {closeable ? (
          <button
            {...stylex.props(styles.close)}
            aria-label="Remove tag"
            onClick={handleClose}
            type="button"
          >
            {'\u00d7'}
          </button>
        ) : null}
      </span>
    );
  },
);

Tag.displayName = 'Tag';

export type { TagProps, TagSize, TagType } from './types';
