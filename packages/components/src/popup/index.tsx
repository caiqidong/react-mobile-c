import * as stylex from '@stylexjs/stylex';
import { forwardRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Overlay } from '../overlay';
import { styles } from './styles';
import type { PopupPosition, PopupProps } from './types';

const positionStyleMap: Record<PopupPosition, keyof typeof styles> = {
  bottom: 'bottom',
  center: 'center',
  left: 'left',
  right: 'right',
  top: 'top',
};

const openStyleMap: Record<PopupPosition, keyof typeof styles> = {
  bottom: 'bottomOpen',
  center: 'centerOpen',
  left: 'leftOpen',
  right: 'rightOpen',
  top: 'topOpen',
};

const closedStyleMap: Record<PopupPosition, keyof typeof styles> = {
  bottom: 'bottomClosed',
  center: 'centerClosed',
  left: 'leftClosed',
  right: 'rightClosed',
  top: 'topClosed',
};

export const Popup = forwardRef<HTMLDivElement, PopupProps>(
  (
    {
      children,
      className,
      closeOnEscape = true,
      closeOnOverlayClick = true,
      isOpen = false,
      lockScroll = true,
      onClose,
      portalContainer,
      position = 'bottom',
      zIndex = 1000,
      ...rest
    },
    ref,
  ) => {
    useEffect(() => {
      if (!isOpen || !closeOnEscape) {
        return;
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose?.();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [closeOnEscape, isOpen, onClose]);

    if (typeof document === 'undefined') {
      return null;
    }

    const content = (
      <Overlay
        closeOnClick={closeOnOverlayClick}
        isOpen={isOpen}
        lockScroll={lockScroll}
        onClose={onClose}
        zIndex={zIndex}
      >
        <div
          {...rest}
          {...stylex.props(
            styles.panel,
            styles[positionStyleMap[position]],
            styles[isOpen ? openStyleMap[position] : closedStyleMap[position]],
            className,
          )}
          data-position={position}
          data-state={isOpen ? 'open' : 'closed'}
          ref={ref}
        >
          {children}
        </div>
      </Overlay>
    );

    return createPortal(content, portalContainer ?? document.body);
  },
);

Popup.displayName = 'Popup';

export type { PopupPosition, PopupProps } from './types';
