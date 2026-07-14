import { Badge } from '../badge';
import { Cell } from './index';

export default { component: Cell, tags: ['autodocs'], title: 'Components/Cell' };

export const Basic = { args: { arrow: true, title: 'Account', value: 'Caiqidong' } };

export const Description = {
  args: {
    arrow: true,
    description: 'Manage notification preferences',
    icon: <Badge dot />,
    title: 'Notifications',
    value: 'Enabled',
  },
};
