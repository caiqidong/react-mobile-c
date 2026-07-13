import { Input } from './index';

export default {
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
};

export const Playground = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 360 }}>
      <Input aria-label="Search" clearable placeholder="Search" />
      <Input aria-label="Verification code" inputMode="numeric" maxLength={6} showCount />
      <Input aria-label="Disabled input" disabled value="Unavailable" />
    </div>
  ),
};
