import * as stylex from '@stylexjs/stylex';
import { useId, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { Button } from '../button';
import { Popup } from '../popup';
import { styles } from './styles';
import type { DialogOptions, DialogProps } from './types';

export function Dialog({
  cancelText = 'Cancel',
  children,
  className,
  closeOnOverlayClick = false,
  confirmText = 'Confirm',
  isOpen = false,
  onCancel,
  onClose,
  onConfirm,
  showCancel = true,
  title,
  zIndex,
}: DialogProps) {
  const titleId = useId();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      await onConfirm?.();
      onClose?.();
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <Popup
      aria-labelledby={title ? titleId : undefined}
      aria-modal="true"
      className={[styles.root, className]}
      closeOnOverlayClick={closeOnOverlayClick}
      isOpen={isOpen}
      onClose={onClose}
      position="center"
      role="dialog"
      zIndex={zIndex}
    >
      <div {...stylex.props(styles.body)}>
        {title ? (
          <h2 {...stylex.props(styles.title)} id={titleId}>
            {title}
          </h2>
        ) : null}
        {children ? <div {...stylex.props(styles.content)}>{children}</div> : null}
      </div>
      <div {...stylex.props(styles.actions)}>
        {showCancel ? (
          <Button className={[styles.action, styles.cancel]} onClick={handleCancel} type="text">
            {cancelText}
          </Button>
        ) : null}
        <Button
          className={styles.action}
          loading={isConfirming}
          onClick={handleConfirm}
          type="text"
        >
          {confirmText}
        </Button>
      </div>
    </Popup>
  );
}

const openDialog = (options: DialogOptions, showCancel: boolean): Promise<boolean> =>
  new Promise((resolve) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const close = (result: boolean) => {
      root.render(<Dialog {...options} isOpen={false} showCancel={showCancel} />);
      window.setTimeout(() => {
        root.unmount();
        container.remove();
        resolve(result);
      }, 250);
    };

    root.render(
      <Dialog
        {...options}
        isOpen
        onCancel={() => close(false)}
        onConfirm={() => close(true)}
        showCancel={showCancel}
      >
        {options.content ?? options.children}
      </Dialog>,
    );
  });

// Component libraries intentionally colocate their imperative facade with the component export.
// eslint-disable-next-line react-refresh/only-export-components
export const dialog = {
  alert: async (options: DialogOptions): Promise<void> => {
    await openDialog(options, false);
  },
  confirm: (options: DialogOptions): Promise<boolean> => openDialog(options, true),
};

export type { DialogOptions, DialogProps } from './types';
