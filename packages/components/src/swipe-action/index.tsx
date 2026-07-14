import * as stylex from '@stylexjs/stylex';
import { forwardRef, useRef, useState, type TouchEvent } from 'react';
import { styles } from './styles';
import type { SwipeActionItem, SwipeActionProps } from './types';

const ACTION_WIDTH = 64;

export const SwipeAction = /* @__PURE__ */ forwardRef<HTMLDivElement, SwipeActionProps>(
  (
    {
      children,
      className,
      disabled = false,
      leftActions = [],
      onClose,
      onOpen,
      rightActions = [],
      threshold = 32,
      ...rest
    },
    ref,
  ) => {
    const startXRef = useRef<number | null>(null);
    const startOffsetRef = useRef(0);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState(0);
    const leftWidth = leftActions.length * ACTION_WIDTH;
    const rightWidth = rightActions.length * ACTION_WIDTH;

    const finish = () => {
      if (startXRef.current === null) return;
      setDragging(false);
      startXRef.current = null;
      let nextOffset = 0;
      if (offset >= threshold && leftWidth) nextOffset = leftWidth;
      if (offset <= -threshold && rightWidth) nextOffset = -rightWidth;
      setOffset(nextOffset);
      if (nextOffset === 0) onClose?.();
      else onOpen?.(nextOffset > 0 ? 'left' : 'right');
    };

    const renderActions = (actions: SwipeActionItem[], side: 'left' | 'right') => (
      <div
        {...stylex.props(
          styles.actions,
          side === 'left' ? styles.leftActions : styles.rightActions,
        )}
      >
        {actions.map(({ color, key, onClick, style, text, ...actionProps }) => (
          <button
            {...actionProps}
            {...stylex.props(styles.action)}
            key={key}
            onClick={onClick}
            style={{ backgroundColor: color, ...style }}
            type="button"
          >
            {text}
          </button>
        ))}
      </div>
    );

    return (
      <div {...rest} {...stylex.props(styles.root, className)} ref={ref}>
        {renderActions(leftActions, 'left')}
        {renderActions(rightActions, 'right')}
        <div
          {...stylex.props(styles.content, dragging && styles.dragging)}
          onTouchCancel={finish}
          onTouchEnd={finish}
          onTouchMove={(event: TouchEvent<HTMLDivElement>) => {
            if (disabled || startXRef.current === null) return;
            const nextOffset =
              startOffsetRef.current + event.touches[0].clientX - startXRef.current;
            setOffset(Math.max(-rightWidth, Math.min(leftWidth, nextOffset)));
          }}
          onTouchStart={(event: TouchEvent<HTMLDivElement>) => {
            if (disabled || event.touches.length !== 1) return;
            startXRef.current = event.touches[0].clientX;
            startOffsetRef.current = offset;
            setDragging(true);
          }}
          style={{ transform: `translateX(${offset}px)` }}
        >
          {children}
        </div>
      </div>
    );
  },
);
SwipeAction.displayName = 'SwipeAction';
export type { SwipeActionItem, SwipeActionProps } from './types';
