import { Badge } from './index';

export default {
  component: Badge,
  tags: ['autodocs'],
  title: 'Components/Badge',
};

export const Counts = {
  render: () => (
    <div style={{ alignItems: 'center', display: 'flex', gap: 32 }}>
      <Badge content={5}>Inbox</Badge>
      <Badge content={120} max={99}>
        Messages
      </Badge>
      <Badge content="New" />
    </div>
  ),
};

export const Dot = {
  render: () => <Badge dot>Updates</Badge>,
};
