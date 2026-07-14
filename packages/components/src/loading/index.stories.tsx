import { Loading } from './index';

export default {
  component: Loading,
  tags: ['autodocs'],
  title: 'Components/Loading',
};

export const Sizes = {
  render: () => (
    <div style={{ alignItems: 'center', display: 'flex', gap: 24 }}>
      <Loading size="small" />
      <Loading text="Loading" />
      <Loading size="large" />
    </div>
  ),
};

export const Fullscreen = {
  args: { fullscreen: true, isOpen: true, text: 'Loading' },
};
