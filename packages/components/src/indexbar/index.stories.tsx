import { Cell } from '../cell';
import { IndexBar } from './index';

export default { component: IndexBar, tags: ['autodocs'], title: 'Components/IndexBar' };

export const Contacts = {
  args: {
    sections: [
      {
        children: (
          <>
            <Cell title="Alice" />
            <Cell title="Andrew" />
          </>
        ),
        index: 'A',
      },
      {
        children: (
          <>
            <Cell title="Bella" />
            <Cell title="Brian" />
          </>
        ),
        index: 'B',
      },
      { children: <Cell title="Charlie" />, index: 'C' },
    ],
  },
};
