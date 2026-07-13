import { Button } from './index';

export default {
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
};

export const Variants = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <Button>Primary</Button>
      <Button type="outline">Outline</Button>
      <Button type="text">Text</Button>
      <Button type="danger">Danger</Button>
    </div>
  ),
};

export const States = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
      <Button loading>Submitting</Button>
      <Button disabled>Disabled</Button>
      <Button block size="large">
        Block button
      </Button>
    </div>
  ),
};
