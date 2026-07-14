import { Button } from '../button';
import { Card } from './index';

export default { component: Card, tags: ['autodocs'], title: 'Components/Card' };

export const Basic = {
  args: {
    children: 'A compact surface for grouped mobile content.',
    extra: 'Details',
    footer: <Button size="small">Open</Button>,
    title: 'Account overview',
  },
};
