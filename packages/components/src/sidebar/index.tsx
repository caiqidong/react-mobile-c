import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';

import { useControllableValue } from '../hooks';
import { styles } from './styles';
import type { SidebarProps } from './types';

export const Sidebar = /* @__PURE__ */ forwardRef<HTMLElement, SidebarProps>(
  ({ activeKey, className, defaultActiveKey, items, onChange, onScrollTo, ...rest }, ref) => {
    const [currentKey, setCurrentKey] = useControllableValue({
      defaultValue: defaultActiveKey ?? items[0]?.key ?? '',
      onChange,
      value: activeKey,
    });

    return (
      <nav
        {...rest}
        {...stylex.props(styles.root, className)}
        aria-label={rest['aria-label'] ?? 'Sidebar'}
        ref={ref}
      >
        {items.map((item) => (
          <button
            {...stylex.props(
              styles.item,
              item.key === currentKey && styles.active,
              item.disabled && styles.disabled,
            )}
            aria-current={item.key === currentKey ? 'page' : undefined}
            disabled={item.disabled}
            key={item.key}
            onClick={() => {
              setCurrentKey(item.key);
              onScrollTo?.(item.key);
            }}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>
    );
  },
);

Sidebar.displayName = 'Sidebar';

export type { SidebarItem, SidebarProps } from './types';
