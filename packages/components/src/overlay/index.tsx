import * as stylex from '@stylexjs/stylex';
import { forwardRef, useEffect, useState, type MouseEvent, type TransitionEvent } from 'react';

import { useLockScroll } from '../hooks';
import { fade } from '../styles/animation.stylex';
import { durationValues } from '../styles/tokens.stylex';
import { styles } from './styles';
import type { OverlayProps } from './types';

const exitDuration = Number.parseInt(durationValues.base, 10);

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  (
    {
      children,
      className,
      closeOnClick = true,
      isOpen = false,
      lockScroll = true,
      onClick,
      onClose,
      style,
      zIndex = 1000,
      ...rest
    },
    ref,
  ) => {
    const [isRendered, setIsRendered] = useState(isOpen);

    useLockScroll(isOpen && lockScroll);

    useEffect(() => {
      if (isOpen) {
        setIsRendered(true);
        return;
      }

      if (!isRendered) {
        return;
      }

      const timer = window.setTimeout(() => setIsRendered(false), exitDuration);
      return () => window.clearTimeout(timer);
    }, [isOpen, isRendered]);

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
      onClick?.(event);

      if (closeOnClick && event.target === event.currentTarget) {
        onClose?.();
      }
    };

    const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
      if (!isOpen && event.target === event.currentTarget) {
        setIsRendered(false);
      }
    };

    if (!isRendered) {
      return null;
    }

    return (
      <div
        {...rest}
        {...stylex.props(styles.root, isOpen ? fade.enter : fade.exit, className)}
        data-state={isOpen ? 'open' : 'closed'}
        onClick={handleClick}
        onTransitionEnd={handleTransitionEnd}
        ref={ref}
        style={{ ...style, zIndex }}
      >
        {children}
      </div>
    );
  },
);

Overlay.displayName = 'Overlay';

export type { OverlayProps } from './types';
