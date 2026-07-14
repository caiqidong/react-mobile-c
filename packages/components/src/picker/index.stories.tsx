import { Picker } from './index';

export default { component: Picker, tags: ['autodocs'], title: 'Components/Picker' };
export const SingleColumn = {
  args: {
    columns: [
      { label: 'Small', value: 's' },
      { label: 'Medium', value: 'm' },
      { label: 'Large', value: 'l' },
    ],
  },
};
export const MultipleColumns = {
  args: {
    columns: [
      [
        { label: 'Coffee', value: 'coffee' },
        { label: 'Tea', value: 'tea' },
      ],
      [
        { label: 'Hot', value: 'hot' },
        { label: 'Iced', value: 'iced' },
      ],
    ],
  },
};
export const Cascade = {
  args: {
    cascade: true,
    columns: [
      {
        label: 'Asia',
        value: 'asia',
        children: [
          { label: 'China', value: 'cn' },
          { label: 'Japan', value: 'jp' },
        ],
      },
      {
        label: 'Europe',
        value: 'europe',
        children: [
          { label: 'France', value: 'fr' },
          { label: 'Italy', value: 'it' },
        ],
      },
    ],
  },
};
