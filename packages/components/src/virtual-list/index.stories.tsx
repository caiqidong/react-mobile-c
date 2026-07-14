import { VirtualList } from './index';

export default { component: VirtualList, tags: ['autodocs'], title: 'Components/VirtualList' };

const data = Array.from({ length: 10000 }, (_, index) => ({
  id: index,
  title: `Record ${index + 1}`,
}));

export const TenThousandRows = {
  render: () => (
    <VirtualList
      data={data}
      height={480}
      itemHeight={48}
      itemKey={(item) => item.id}
      renderItem={(item, index) => (
        <div
          style={{
            alignItems: 'center',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            height: '100%',
            padding: '0 16px',
          }}
        >
          {index + 1}. {item.title}
        </div>
      )}
    />
  ),
};
