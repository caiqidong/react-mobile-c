import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';

import { styles } from './styles';
import type { DividerProps } from './types';

export const Divider = /* @__PURE__ */ forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      children,
      className,
      contentPosition = 'center',
      dashed = false,
      orientation = 'horizontal',
      ...rest
    },
    ref,
  ) => {
    const hasContent = orientation === 'horizontal' && children != null;

    return (
      <div
        {...rest}
        {...stylex.props(
          styles.base,
          styles[orientation],
          dashed && styles[orientation === 'horizontal' ? 'dashedHorizontal' : 'dashedVertical'],
          hasContent && styles.withContent,
          className,
        )}
        aria-orientation={orientation}
        ref={ref}
        role="separator"
      >
        {hasContent ? (
          <>
            <span
              {...stylex.props(styles.line, contentPosition === 'left' && styles.leftLine)}
              aria-hidden="true"
            />
            <span {...stylex.props(styles.content)}>{children}</span>
            <span
              {...stylex.props(styles.line, contentPosition === 'right' && styles.rightLine)}
              aria-hidden="true"
            />
          </>
        ) : null}
      </div>
    );
  },
);

Divider.displayName = 'Divider';

export type { DividerContentPosition, DividerOrientation, DividerProps } from './types';
