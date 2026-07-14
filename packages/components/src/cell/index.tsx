import * as stylex from '@stylexjs/stylex';
import { forwardRef, type KeyboardEvent } from 'react';

import { styles } from './styles';
import type { CellProps } from './types';

export const Cell = /* @__PURE__ */ forwardRef<HTMLDivElement, CellProps>(
  (
    {
      arrow = false,
      children,
      className,
      description,
      icon,
      onClick,
      onKeyDown,
      role,
      tabIndex,
      title,
      value,
      ...rest
    },
    ref,
  ) => {
    const clickable = Boolean(onClick);
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (!event.defaultPrevented && clickable && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        event.currentTarget.click();
      }
    };

    return (
      <div
        {...rest}
        {...stylex.props(styles.root, clickable && styles.clickable, className)}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        ref={ref}
        role={role ?? (clickable ? 'button' : undefined)}
        tabIndex={tabIndex ?? (clickable ? 0 : undefined)}
      >
        {icon != null ? <span {...stylex.props(styles.icon)}>{icon}</span> : null}
        <span {...stylex.props(styles.body)}>
          {title != null ? <span {...stylex.props(styles.title)}>{title}</span> : null}
          {description != null ? (
            <span {...stylex.props(styles.description)}>{description}</span>
          ) : null}
          {children}
        </span>
        {value != null ? <span {...stylex.props(styles.value)}>{value}</span> : null}
        {arrow ? (
          <span {...stylex.props(styles.arrow)} aria-hidden="true">
            {arrow === true ? '\u203a' : arrow}
          </span>
        ) : null}
      </div>
    );
  },
);

Cell.displayName = 'Cell';

export type { CellProps } from './types';
