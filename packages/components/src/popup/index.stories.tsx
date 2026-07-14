import { useState } from 'react';

import { Button } from '../button';
import { Popup } from './index';

export default {
  component: Popup,
  tags: ['autodocs'],
  title: 'Components/Popup',
};

function PositionsPreview() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open bottom popup</Button>
      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div style={{ padding: 24 }}>Popup content</div>
      </Popup>
    </>
  );
}

export const Positions = {
  render: () => <PositionsPreview />,
};
