import * as stylex from '@stylexjs/stylex';
import { forwardRef, type ReactNode } from 'react';

import { styles } from './styles';
import type { BadgeProps } from './types';

const getDisplayContent = (content: ReactNode, max: number) =>
  typeof content === 'number' && content > max ? `${max}+` : content;

export const Badge = /* @__PURE__ */ forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      className,
      color,
      content,
      dot = false,
      max = 99,
      showZero = false,
      style,
      ...rest
    },
    ref,
  ) => {
    const hasChildren = children != null;
    const hidden = !dot && (content == null || (content === 0 && !showZero));
    const badge = hidden ? null : (
      <sup
        {...stylex.props(styles.badge, hasChildren && styles.floating, dot && styles.dot)}
        aria-label={dot ? 'notification' : undefined}
        style={{ backgroundColor: color }}
      >
        {dot ? null : getDisplayContent(content, max)}
      </sup>
    );

    if (!hasChildren) {
      return badge ? (
        <span {...rest} {...stylex.props(styles.root, className)} ref={ref} style={style}>
          {badge}
        </span>
      ) : null;
    }

    return (
      <span {...rest} {...stylex.props(styles.root, className)} ref={ref} style={style}>
        {children}
        {badge}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

export type { BadgeProps } from './types';
