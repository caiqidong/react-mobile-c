import { Icon } from './index';

export default {
  component: Icon,
  tags: ['autodocs'],
  title: 'Components/Icon',
};

export const SizesAndColors = {
  render: () => (
    <div style={{ alignItems: 'center', display: 'flex', gap: 20 }}>
      {[20, 28, 36].map((size, index) => (
        <Icon
          color={['#1677ff', '#007a5a', '#ff4d4f'][index]}
          key={size}
          size={size}
          title={`Check ${size}`}
        >
          <path d="M5 12.5 9.5 17 19 7.5" fill="none" stroke="currentColor" strokeWidth="2" />
        </Icon>
      ))}
    </div>
  ),
};
