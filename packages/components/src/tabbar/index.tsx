import * as stylex from '@stylexjs/stylex';
import { forwardRef, type MouseEvent } from 'react';

import { useControllableValue } from '../hooks';
import { styles } from './styles';
import type { TabBarProps } from './types';

export const TabBar = /* @__PURE__ */ forwardRef<HTMLElement, TabBarProps>(
  (
    {
      activeKey,
      className,
      defaultActiveKey,
      items,
      onChange,
      safeAreaInsetBottom = true,
      ...rest
    },
    ref,
  ) => {
    const [currentKey, setCurrentKey] = useControllableValue({
      defaultValue: defaultActiveKey ?? items[0]?.key ?? '',
      onChange,
      value: activeKey,
    });

    return (
      <nav
        {...rest}
        {...stylex.props(styles.root, safeAreaInsetBottom && styles.safeArea, className)}
        aria-label={rest['aria-label'] ?? 'Tab bar'}
        ref={ref}
      >
        {items.map((item) => {
          const selected = item.key === currentKey;
          const itemContent = (
            <>
              <span {...stylex.props(styles.iconWrap)}>
                {item.icon != null ? <span {...stylex.props(styles.icon)}>{item.icon}</span> : null}
                {item.badge != null ? (
                  <span {...stylex.props(styles.badge)}>{item.badge}</span>
                ) : null}
              </span>
              <span {...stylex.props(styles.label)}>{item.label}</span>
            </>
          );
          const itemStyles = stylex.props(
            styles.item,
            selected && styles.active,
            item.disabled && styles.disabled,
          );
          const handleClick = (event: MouseEvent<HTMLElement>) => {
            if (item.disabled) {
              event.preventDefault();
              return;
            }
            setCurrentKey(item.key);
          };

          return item.href ? (
            <a
              {...itemStyles}
              aria-current={selected ? 'page' : undefined}
              aria-disabled={item.disabled || undefined}
              href={item.href}
              key={item.key}
              onClick={handleClick}
            >
              {itemContent}
            </a>
          ) : (
            <button
              {...itemStyles}
              aria-pressed={selected}
              disabled={item.disabled}
              key={item.key}
              onClick={handleClick}
              type="button"
            >
              {itemContent}
            </button>
          );
        })}
      </nav>
    );
  },
);

TabBar.displayName = 'TabBar';

export type { TabBarItem, TabBarProps } from './types';
