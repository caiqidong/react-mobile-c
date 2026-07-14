import { useState } from 'react';
import { PullRefresh } from './index';

export default { component: PullRefresh, tags: ['autodocs'], title: 'Components/PullRefresh' };

const FeedExample = () => {
  const [updatedAt, setUpdatedAt] = useState('Not refreshed');
  return (
    <PullRefresh onRefresh={() => setUpdatedAt(new Date().toLocaleTimeString())}>
      <div style={{ background: '#fff', minHeight: 240, padding: 16 }}>
        <strong>Activity feed</strong>
        <p>Last refresh: {updatedAt}</p>
      </div>
    </PullRefresh>
  );
};

export const Feed = {
  render: () => <FeedExample />,
};
