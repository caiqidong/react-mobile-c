import { forwardRef } from 'react';
import { useControllableValue } from '../hooks';
import { Picker, type PickerOption } from '../picker';
import type { DatePickerColumnType, DatePickerProps } from './types';

const range = (start: number, end: number) =>
  Array.from({ length: Math.max(end - start + 1, 0) }, (_, index) => start + index);
const daysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();
const makeOptions = (
  type: DatePickerColumnType,
  values: number[],
  filter?: DatePickerProps['filter'],
): PickerOption[] =>
  values
    .filter((value) => filter?.(type, value) ?? true)
    .map((value) => ({ label: String(value).padStart(2, '0'), value: String(value) }));

export const DatePicker = /* @__PURE__ */ forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      className,
      defaultValue = new Date(),
      disabled,
      filter,
      max = new Date(2100, 11, 31, 23, 59),
      min = new Date(1970, 0, 1),
      onChange,
      precision = 'date',
      value,
      ...rest
    },
    ref,
  ) => {
    const [currentDate, setCurrentDate] = useControllableValue({ defaultValue, value });
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const columns = [
      makeOptions('year', range(min.getFullYear(), max.getFullYear()), filter),
      makeOptions('month', range(1, 12), filter),
      makeOptions('day', range(1, daysInMonth(year, month)), filter),
    ];
    if (precision === 'minute')
      columns.push(
        makeOptions('hour', range(0, 23), filter),
        makeOptions('minute', range(0, 59), filter),
      );
    const pickerValue = [String(year), String(month), String(currentDate.getDate())];
    if (precision === 'minute')
      pickerValue.push(String(currentDate.getHours()), String(currentDate.getMinutes()));

    return (
      <Picker
        {...rest}
        className={className}
        columns={columns}
        disabled={disabled}
        onChange={(nextValue) => {
          const nextYear = Number(nextValue[0]);
          const nextMonth = Number(nextValue[1]);
          const nextDay = Math.min(Number(nextValue[2]), daysInMonth(nextYear, nextMonth));
          const nextDate = new Date(
            nextYear,
            nextMonth - 1,
            nextDay,
            Number(nextValue[3] ?? 0),
            Number(nextValue[4] ?? 0),
          );
          setCurrentDate(nextDate);
          onChange?.(nextDate);
        }}
        ref={ref}
        value={pickerValue}
      />
    );
  },
);
DatePicker.displayName = 'DatePicker';
export type { DatePickerColumnType, DatePickerPrecision, DatePickerProps } from './types';
