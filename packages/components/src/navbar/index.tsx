import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';

import { styles } from './styles';
import type { NavBarProps } from './types';

export const NavBar = /* @__PURE__ */ forwardRef<HTMLElement, NavBarProps>(
  (
    { backArrow = false, className, left, onBack, right, safeAreaInsetTop = true, title, ...rest },
    ref,
  ) => (
    <header
      {...rest}
      {...stylex.props(styles.root, safeAreaInsetTop && styles.safeArea, className)}
      ref={ref}
    >
      <div {...stylex.props(styles.content)}>
        <div {...stylex.props(styles.side)}>
          {backArrow ? (
            <button
              {...stylex.props(styles.backButton)}
              aria-label="Go back"
              onClick={onBack}
              type="button"
            >
              {backArrow === true ? '\u2039' : backArrow}
            </button>
          ) : null}
          {left}
        </div>
        <div {...stylex.props(styles.title)}>{title}</div>
        <div {...stylex.props(styles.side, styles.right)}>{right}</div>
      </div>
    </header>
  ),
);

NavBar.displayName = 'NavBar';

export type { NavBarProps } from './types';
