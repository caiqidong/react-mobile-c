import { Divider } from './index';

export default { component: Divider, tags: ['autodocs'], title: 'Components/Divider' };

export const Horizontal = { render: () => <Divider>Section</Divider> };

export const ContentPositions = {
  render: () => (
    <div>
      <Divider contentPosition="left">Left</Divider>
      <Divider>Center</Divider>
      <Divider contentPosition="right">Right</Divider>
    </div>
  ),
};

export const Vertical = {
  render: () => (
    <div style={{ display: 'flex', height: 24 }}>
      Before <Divider orientation="vertical" /> After
    </div>
  ),
};
