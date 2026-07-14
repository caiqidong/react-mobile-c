import { DatePicker } from './index';

export default { component: DatePicker, tags: ['autodocs'], title: 'Components/DatePicker' };
export const DateOnly = {
  args: {
    defaultValue: new Date(2026, 6, 14),
    max: new Date(2030, 11, 31),
    min: new Date(2020, 0, 1),
  },
};
export const DateTime = {
  args: {
    defaultValue: new Date(2026, 6, 14, 10, 30),
    max: new Date(2030, 11, 31, 23, 59),
    min: new Date(2020, 0, 1),
    precision: 'minute',
  },
};
export const FilteredMinutes = {
  args: {
    defaultValue: new Date(2026, 6, 14, 10, 30),
    filter: (type: string, value: number) => type !== 'minute' || value % 5 === 0,
    max: new Date(2030, 11, 31, 23, 59),
    min: new Date(2020, 0, 1),
    precision: 'minute',
  },
};
