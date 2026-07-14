import * as stylex from '@stylexjs/stylex';
import { forwardRef, useState, type ForwardedRef, type UIEvent } from 'react';
import { styles } from './styles';
import type { VirtualListProps } from './types';

function VirtualListInner<Item>(
  {
    className,
    data,
    height,
    itemHeight,
    itemKey,
    onScroll,
    overscan = 2,
    renderItem,
    style,
    ...rest
  }: VirtualListProps<Item>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [scrollTop, setScrollTop] = useState(0);
  const visibleCount = Math.ceil(height / itemHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(data.length, startIndex + visibleCount + overscan * 2);
  const visibleItems = data.slice(startIndex, endIndex);

  return (
    <div
      {...rest}
      {...stylex.props(styles.root, className)}
      onScroll={(event: UIEvent<HTMLDivElement>) => {
        setScrollTop(event.currentTarget.scrollTop);
        onScroll?.(event);
      }}
      ref={ref}
      role="list"
      style={{ ...style, height }}
    >
      <div {...stylex.props(styles.spacer)} style={{ height: data.length * itemHeight }}>
        {visibleItems.map((item, offset) => {
          const index = startIndex + offset;
          return (
            <div
              {...stylex.props(styles.item)}
              key={itemKey?.(item, index) ?? index}
              role="listitem"
              style={{ height: itemHeight, transform: `translateY(${index * itemHeight}px)` }}
            >
              {renderItem(item, index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const VirtualList = /* @__PURE__ */ forwardRef(VirtualListInner) as <Item>(
  props: VirtualListProps<Item> & { ref?: ForwardedRef<HTMLDivElement> },
) => React.ReactElement;
export type { VirtualListProps } from './types';
