import * as stylex from '@stylexjs/stylex';
import { forwardRef, type MouseEvent } from 'react';

import { styles } from './styles';
import type { ButtonProps } from './types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      block = false,
      children,
      className,
      disabled = false,
      icon,
      loading = false,
      onClick,
      size = 'medium',
      type = 'primary',
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled) {
        onClick?.(event);
      }
    };

    return (
      <button
        {...rest}
        {...stylex.props(
          styles.base,
          styles[type],
          styles[size],
          block && styles.block,
          isDisabled && styles.disabled,
          loading && styles.loading,
          className,
        )}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled}
        disabled={disabled}
        onClick={handleClick}
        ref={ref}
        type="button"
      >
        {loading ? <span {...stylex.props(styles.spinner)} aria-hidden="true" /> : icon}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export type { ButtonProps, ButtonSize, ButtonType } from './types';
