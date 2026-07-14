import { useState } from 'react';

import { Sidebar } from './index';

export default { component: Sidebar, tags: ['autodocs'], title: 'Components/Sidebar' };

const items = [
  { key: 'featured', label: 'Featured' },
  { key: 'fruit', label: 'Fresh fruit' },
  { key: 'drinks', label: 'Drinks' },
  { key: 'bakery', label: 'Bakery' },
];

function CategoriesExample() {
  const [activeKey, setActiveKey] = useState('featured');
  return <Sidebar activeKey={activeKey} items={items} onChange={setActiveKey} />;
}

export const Categories = {
  render: () => <CategoriesExample />,
};
