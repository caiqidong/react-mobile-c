import * as stylex from '@stylexjs/stylex';
import { forwardRef, useEffect, useRef, type ChangeEvent } from 'react';

import { useControllableValue } from '../hooks';
import { styles } from './styles';
import type { TextareaProps } from './types';

const resizeTextarea = (element: HTMLTextAreaElement | null): void => {
  if (!element) {
    return;
  }

  element.style.height = 'auto';
  element.style.height = `${element.scrollHeight}px`;
};

export const Textarea = /* @__PURE__ */ forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      autoSize = false,
      className,
      defaultValue = '',
      disabled = false,
      maxLength,
      onChange,
      showCount = false,
      value,
      ...rest
    },
    forwardedRef,
  ) => {
    const innerRef = useRef<HTMLTextAreaElement | null>(null);
    const [textareaValue, setTextareaValue] = useControllableValue({
      defaultValue,
      value,
    });

    useEffect(() => {
      if (autoSize) {
        resizeTextarea(innerRef.current);
      }
    }, [autoSize, textareaValue]);

    const setRefs = (element: HTMLTextAreaElement | null) => {
      innerRef.current = element;

      if (typeof forwardedRef === 'function') {
        forwardedRef(element);
      } else if (forwardedRef) {
        forwardedRef.current = element;
      }
    };

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = event.currentTarget.value;

      if (autoSize) {
        resizeTextarea(event.currentTarget);
      }

      setTextareaValue(nextValue);
      onChange?.(nextValue, event);
    };

    return (
      <span {...stylex.props(styles.root, disabled && styles.disabled, className)}>
        <textarea
          {...rest}
          {...stylex.props(styles.textarea, autoSize && styles.autoSize)}
          disabled={disabled}
          maxLength={maxLength}
          onChange={handleChange}
          ref={setRefs}
          value={textareaValue}
        />
        {showCount ? (
          <span {...stylex.props(styles.count)} aria-live="polite">
            {textareaValue.length}
            {typeof maxLength === 'number' ? `/${maxLength}` : null}
          </span>
        ) : null}
      </span>
    );
  },
);

Textarea.displayName = 'Textarea';

export type { TextareaProps } from './types';
