import { Tag } from './index';

export default { component: Tag, tags: ['autodocs'], title: 'Components/Tag' };

export const Types = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <Tag>Default</Tag>
      <Tag type="primary">Primary</Tag>
      <Tag type="success">Success</Tag>
      <Tag type="warning">Warning</Tag>
      <Tag type="danger">Danger</Tag>
    </div>
  ),
};

export const Closeable = { args: { children: 'Filter', closeable: true, type: 'primary' } };
