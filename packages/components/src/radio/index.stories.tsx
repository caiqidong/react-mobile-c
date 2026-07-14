import { RadioGroup } from './index';

export default { component: RadioGroup, tags: ['autodocs'], title: 'Components/Radio' };
export const Group = {
  args: {
    defaultValue: 'standard',
    name: 'shipping',
    options: [
      { label: 'Standard', value: 'standard' },
      { label: 'Express', value: 'express' },
      { disabled: true, label: 'Pickup', value: 'pickup' },
    ],
  },
};
