import { Textarea } from './index';

export default {
  component: Textarea,
  tags: ['autodocs'],
  title: 'Components/Textarea',
};

export const Playground = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Textarea
        aria-label="Feedback"
        autoSize
        maxLength={200}
        placeholder="Share your feedback"
        showCount
      />
    </div>
  ),
};
