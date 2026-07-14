import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import { useControllableValue } from '../hooks';
import { styles } from './styles';
import type { PickerOption, PickerProps } from './types';

const isMultipleColumns = (columns: PickerProps['columns']): columns is PickerOption[][] =>
  Array.isArray(columns[0]);

const getCascadeColumns = (options: PickerOption[], value: string[]) => {
  const result: PickerOption[][] = [];
  let current = options;
  let depth = 0;
  while (current.length) {
    result.push(current);
    const selected = current.find((option) => option.value === value[depth]) ?? current[0];
    current = selected?.children ?? [];
    depth += 1;
  }
  return result;
};

export const Picker = /* @__PURE__ */ forwardRef<HTMLDivElement, PickerProps>(
  (
    { cascade = false, className, columns, defaultValue = [], disabled, onChange, value, ...rest },
    ref,
  ) => {
    const initialColumns = cascade
      ? getCascadeColumns(columns as PickerOption[], defaultValue)
      : isMultipleColumns(columns)
        ? columns
        : [columns];
    const initialValue = initialColumns.map(
      (column, index) => defaultValue[index] ?? column[0]?.value ?? '',
    );
    const [currentValue, setCurrentValue] = useControllableValue({
      defaultValue: initialValue,
      value,
    });
    const visibleColumns = cascade
      ? getCascadeColumns(columns as PickerOption[], currentValue)
      : isMultipleColumns(columns)
        ? columns
        : [columns];

    const updateColumn = (columnIndex: number, nextItemValue: string) => {
      const nextValue = cascade ? currentValue.slice(0, columnIndex) : [...currentValue];
      nextValue[columnIndex] = nextItemValue;
      let nextColumns = visibleColumns;
      if (cascade) {
        nextColumns = getCascadeColumns(columns as PickerOption[], nextValue);
        for (let index = columnIndex + 1; index < nextColumns.length; index += 1)
          nextValue[index] = nextColumns[index][0]?.value ?? '';
      }
      const selectedOptions = nextColumns
        .map(
          (column, index) =>
            column.find((option) => option.value === nextValue[index]) ?? column[0],
        )
        .filter((option): option is PickerOption => Boolean(option));
      setCurrentValue(nextValue);
      onChange?.(nextValue, selectedOptions);
    };

    return (
      <div {...rest} {...stylex.props(styles.root, className)} ref={ref}>
        {visibleColumns.map((column, columnIndex) => (
          <select
            {...stylex.props(styles.select, disabled && styles.disabled)}
            aria-label={`Column ${columnIndex + 1}`}
            disabled={disabled}
            key={columnIndex}
            onChange={(event) => updateColumn(columnIndex, event.currentTarget.value)}
            value={currentValue[columnIndex] ?? column[0]?.value ?? ''}
          >
            {column.map((option) => (
              <option disabled={option.disabled} key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ))}
      </div>
    );
  },
);
Picker.displayName = 'Picker';
export type { PickerColumns, PickerOption, PickerProps } from './types';
