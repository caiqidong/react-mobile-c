import * as stylex from '@stylexjs/stylex';
import { forwardRef, useEffect, useRef, useState, type TouchEvent } from 'react';
import { styles } from './styles';
import type { PullRefreshProps, PullRefreshStatus } from './types';

export const PullRefresh = /* @__PURE__ */ forwardRef<HTMLDivElement, PullRefreshProps>(
  (
    {
      children,
      className,
      disabled = false,
      loadingText = 'Refreshing...',
      onRefresh,
      pullingText = 'Pull to refresh',
      refreshing = false,
      releaseText = 'Release to refresh',
      threshold = 64,
      ...rest
    },
    ref,
  ) => {
    const startYRef = useRef<number | null>(null);
    const [distance, setDistance] = useState(0);
    const [status, setStatus] = useState<PullRefreshStatus>('idle');

    useEffect(() => {
      if (refreshing) {
        setDistance(threshold);
        setStatus('refreshing');
      } else {
        setDistance(0);
        setStatus('idle');
      }
    }, [refreshing, threshold]);

    const finish = async () => {
      if (startYRef.current === null) return;
      startYRef.current = null;
      if (status !== 'ready') {
        setDistance(0);
        setStatus('idle');
        return;
      }
      setDistance(threshold);
      setStatus('refreshing');
      await onRefresh();
      if (!refreshing) {
        setDistance(0);
        setStatus('idle');
      }
    };

    const text =
      status === 'refreshing' ? loadingText : status === 'ready' ? releaseText : pullingText;
    return (
      <div
        {...rest}
        {...stylex.props(styles.root, className)}
        aria-busy={status === 'refreshing'}
        data-status={status}
        ref={ref}
      >
        <div {...stylex.props(styles.indicator)} aria-live="polite">
          {text}
        </div>
        <div
          {...stylex.props(
            styles.content,
            (status === 'pulling' || status === 'ready') && styles.pulling,
          )}
          onTouchCancel={() => void finish()}
          onTouchEnd={() => void finish()}
          onTouchMove={(event: TouchEvent<HTMLDivElement>) => {
            if (startYRef.current === null) return;
            const nextDistance = Math.max(0, (event.touches[0].clientY - startYRef.current) * 0.5);
            setDistance(nextDistance);
            setStatus(nextDistance >= threshold ? 'ready' : 'pulling');
          }}
          onTouchStart={(event: TouchEvent<HTMLDivElement>) => {
            if (!disabled && !refreshing && window.scrollY <= 0 && event.touches.length === 1)
              startYRef.current = event.touches[0].clientY;
          }}
          style={{ transform: `translateY(${distance}px)` }}
        >
          {children}
        </div>
      </div>
    );
  },
);
PullRefresh.displayName = 'PullRefresh';
export type { PullRefreshProps, PullRefreshStatus } from './types';
