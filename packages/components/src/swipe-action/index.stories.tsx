import { SwipeAction } from './index';

export default { component: SwipeAction, tags: ['autodocs'], title: 'Components/SwipeAction' };

const rowStyle = { background: '#fff', padding: '20px 16px' };

export const BothSides = {
  args: {
    children: <div style={rowStyle}>Swipe this conversation</div>,
    leftActions: [{ color: '#1677ff', key: 'read', text: 'Read' }],
    rightActions: [
      { color: '#faad14', key: 'archive', text: 'Archive' },
      { color: '#ff4d4f', key: 'delete', text: 'Delete' },
    ],
  },
};
