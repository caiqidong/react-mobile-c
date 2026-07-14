import { NavBar } from './index';

export default { component: NavBar, tags: ['autodocs'], title: 'Components/NavBar' };

export const Basic = {
  args: { backArrow: true, right: 'More', title: 'Order details' },
};

export const CustomSlots = {
  args: { left: 'Shanghai', right: 'Search', title: 'Discover' },
};
