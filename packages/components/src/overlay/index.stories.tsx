import { useState } from 'react';

import { Button } from '../button';
import { Overlay } from './index';

export default {
  component: Overlay,
  tags: ['autodocs'],
  title: 'Components/Overlay',
};

function OverlayPlayground() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open overlay</Button>
      <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export const Playground = {
  render: () => <OverlayPlayground />,
};
