import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import { useControllableValue } from '../hooks';
import { styles } from './styles';
import type { SwitchProps } from './types';

export const Switch = /* @__PURE__ */ forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      checkedContent,
      className,
      defaultChecked = false,
      disabled,
      loading = false,
      onChange,
      uncheckedContent,
      ...rest
    },
    ref,
  ) => {
    const [currentChecked, setCurrentChecked] = useControllableValue({
      defaultValue: defaultChecked,
      onChange,
      value: checked,
    });
    const inactive = disabled || loading;
    return (
      <button
        {...rest}
        {...stylex.props(
          styles.root,
          currentChecked && styles.checked,
          inactive && styles.disabled,
          className,
        )}
        aria-checked={currentChecked}
        aria-busy={loading || undefined}
        disabled={inactive}
        onClick={() => setCurrentChecked(!currentChecked)}
        ref={ref}
        role="switch"
        type="button"
      >
        <span {...stylex.props(styles.thumb, currentChecked && styles.thumbChecked)}>
          {loading ? '\u2026' : null}
        </span>
        <span {...stylex.props(styles.content)}>
          {currentChecked ? checkedContent : uncheckedContent}
        </span>
      </button>
    );
  },
);
Switch.displayName = 'Switch';
export type { SwitchProps } from './types';
