import { useState } from 'react';

import { Button } from '../button';
import { Dialog, dialog } from './index';

export default {
  component: Dialog,
  tags: ['autodocs'],
  title: 'Components/Dialog',
};

function ControlledDialog() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} title="Delete item?">
        This action cannot be undone.
      </Dialog>
    </>
  );
}

export const Controlled = {
  render: () => <ControlledDialog />,
};

export const PromiseCall = {
  render: () => (
    <Button onClick={() => dialog.confirm({ content: 'Continue?', title: 'Confirmation' })}>
      Confirm with Promise
    </Button>
  ),
};
