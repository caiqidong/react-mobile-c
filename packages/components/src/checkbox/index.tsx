import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';

import { useControllableValue } from '../hooks';
import { styles } from './styles';
import type { CheckboxProps } from './types';

export const Checkbox = /* @__PURE__ */ forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      checkedIcon = '\u2713',
      className,
      defaultChecked = false,
      disabled = false,
      icon,
      label,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const [currentChecked, setCurrentChecked] = useControllableValue({
      defaultValue: defaultChecked,
      onChange,
      value: checked,
    });

    return (
      <label {...stylex.props(styles.root, disabled && styles.disabled, className)}>
        <input
          {...rest}
          {...stylex.props(styles.input)}
          checked={currentChecked}
          disabled={disabled}
          onChange={(event) => {
            if (!disabled) setCurrentChecked(event.currentTarget.checked);
          }}
          ref={ref}
          type="checkbox"
        />
        <span {...stylex.props(styles.icon, currentChecked && styles.checked)} aria-hidden="true">
          {currentChecked ? checkedIcon : icon}
        </span>
        {label != null ? <span {...stylex.props(styles.label)}>{label}</span> : null}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export type { CheckboxProps } from './types';
