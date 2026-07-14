import { useState } from 'react';

import { TabBar } from './index';

export default { component: TabBar, tags: ['autodocs'], title: 'Components/TabBar' };

const items = [
  { href: '#home', icon: '⌂', key: 'home', label: 'Home' },
  { badge: 3, href: '#messages', icon: '✉', key: 'messages', label: 'Messages' },
  { href: '#profile', icon: '○', key: 'profile', label: 'Profile' },
];

function RoutingExample() {
  const [activeKey, setActiveKey] = useState('home');
  return <TabBar activeKey={activeKey} items={items} onChange={setActiveKey} />;
}

export const Routing = {
  render: () => <RoutingExample />,
};
