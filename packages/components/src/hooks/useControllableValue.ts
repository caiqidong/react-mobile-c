import { useCallback, useRef, useState } from 'react';

export type ValueUpdater<Value> = Value | ((previousValue: Value) => Value);

export interface UseControllableValueOptions<Value> {
  value?: Value;
  defaultValue: Value;
  onChange?: (value: Value) => void;
}

export function useControllableValue<Value>({
  value,
  defaultValue,
  onChange,
}: UseControllableValueOptions<Value>): readonly [Value, (nextValue: ValueUpdater<Value>) => void] {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const currentValueRef = useRef(currentValue);
  currentValueRef.current = currentValue;

  const setValue = useCallback(
    (nextValue: ValueUpdater<Value>) => {
      const resolvedValue =
        typeof nextValue === 'function'
          ? (nextValue as (previousValue: Value) => Value)(currentValueRef.current)
          : nextValue;

      currentValueRef.current = resolvedValue;

      if (!isControlled) {
        setInternalValue(resolvedValue);
      }

      onChange?.(resolvedValue);
    },
    [isControlled, onChange],
  );

  return [currentValue, setValue] as const;
}
