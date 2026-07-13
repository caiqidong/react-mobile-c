import * as stylex from '@stylexjs/stylex';
import { forwardRef, type ChangeEvent } from 'react';

import { useControllableValue } from '../hooks';
import { styles } from './styles';
import type { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      clearable = false,
      defaultValue = '',
      disabled = false,
      maxLength,
      onChange,
      prefix,
      showCount = false,
      suffix,
      value,
      ...rest
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useControllableValue({
      defaultValue,
      value,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.currentTarget.value;
      setInputValue(nextValue);
      onChange?.(nextValue, event);
    };

    const handleClear = () => {
      setInputValue('');
      onChange?.('');
    };

    return (
      <span {...stylex.props(styles.root, disabled && styles.disabled, className)}>
        {prefix ? <span {...stylex.props(styles.adornment)}>{prefix}</span> : null}
        <input
          {...rest}
          {...stylex.props(styles.input)}
          disabled={disabled}
          maxLength={maxLength}
          onChange={handleChange}
          ref={ref}
          value={inputValue}
        />
        {clearable && inputValue && !disabled ? (
          <button
            {...stylex.props(styles.clear)}
            aria-label="Clear input"
            onClick={handleClear}
            type="button"
          >
            ×
          </button>
        ) : null}
        {showCount ? (
          <span {...stylex.props(styles.count)} aria-live="polite">
            {inputValue.length}
            {typeof maxLength === 'number' ? `/${maxLength}` : null}
          </span>
        ) : null}
        {suffix ? <span {...stylex.props(styles.adornment)}>{suffix}</span> : null}
      </span>
    );
  },
);

Input.displayName = 'Input';

export type { InputProps } from './types';
