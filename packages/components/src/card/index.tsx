import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';

import { styles } from './styles';
import type { CardProps } from './types';

export const Card = /* @__PURE__ */ forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, extra, footer, title, ...rest }, ref) => (
    <div {...rest} {...stylex.props(styles.root, className)} ref={ref}>
      {title != null || extra != null ? (
        <div {...stylex.props(styles.header)}>
          <span {...stylex.props(styles.title)}>{title}</span>
          {extra != null ? <span {...stylex.props(styles.extra)}>{extra}</span> : null}
        </div>
      ) : null}
      <div {...stylex.props(styles.body)}>{children}</div>
      {footer != null ? <div {...stylex.props(styles.footer)}>{footer}</div> : null}
    </div>
  ),
);

Card.displayName = 'Card';

export type { CardProps } from './types';
