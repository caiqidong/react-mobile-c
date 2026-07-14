import { Checkbox } from './index';

export default { component: Checkbox, tags: ['autodocs'], title: 'Components/Checkbox' };
export const Basic = { args: { label: 'Accept terms' } };
export const CustomIcon = {
  args: { checkedIcon: 'OK', defaultChecked: true, icon: '-', label: 'Selected' },
};
export const Disabled = { args: { disabled: true, label: 'Unavailable' } };
