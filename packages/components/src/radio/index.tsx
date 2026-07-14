import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import { useControllableValue } from '../hooks';
import { styles } from './styles';
import type { RadioGroupProps, RadioProps } from './types';

export const Radio = /* @__PURE__ */ forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      checked = false,
      checkedIcon = '\u25cf',
      className,
      disabled,
      icon,
      label,
      onChange,
      value,
      ...rest
    },
    ref,
  ) => (
    <label {...stylex.props(styles.root, disabled && styles.disabled, className)}>
      <input
        {...rest}
        {...stylex.props(styles.input)}
        checked={checked}
        disabled={disabled}
        onChange={() => {
          if (!disabled) onChange?.();
        }}
        ref={ref}
        type="radio"
        value={value}
      />
      <span {...stylex.props(styles.icon, checked && styles.checked)} aria-hidden="true">
        {checked ? checkedIcon : icon}
      </span>
      {label != null ? <span {...stylex.props(styles.label)}>{label}</span> : null}
    </label>
  ),
);
Radio.displayName = 'Radio';

export const RadioGroup = /* @__PURE__ */ forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, defaultValue = '', disabled, name, onChange, options, value, ...rest }, ref) => {
    const [currentValue, setCurrentValue] = useControllableValue({ defaultValue, onChange, value });
    return (
      <div {...rest} {...stylex.props(styles.group, className)} ref={ref} role="radiogroup">
        {options.map((option) => (
          <Radio
            checked={option.value === currentValue}
            disabled={disabled || option.disabled}
            key={option.value}
            label={option.label}
            name={name}
            onChange={() => setCurrentValue(option.value)}
            value={option.value}
          />
        ))}
      </div>
    );
  },
);
RadioGroup.displayName = 'RadioGroup';
export type { RadioGroupProps, RadioOption, RadioProps } from './types';
