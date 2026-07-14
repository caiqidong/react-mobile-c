import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  keyframes: (frames: object) => frames,
  props: () => ({}),
}));

import { Dialog } from '../index';

afterEach(cleanup);

describe('Dialog', () => {
  it('renders accessible content and handles cancel', () => {
    const onCancel = vi.fn();
    const onClose = vi.fn();
    render(
      <Dialog isOpen onCancel={onCancel} onClose={onClose} title="Confirm">
        Details
      </Dialog>,
    );

    expect(screen.getByRole('dialog', { name: 'Confirm' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('waits for asynchronous confirmation before closing', async () => {
    const onClose = vi.fn();
    const onConfirm = vi.fn().mockResolvedValue(undefined);
    render(<Dialog isOpen onClose={onClose} onConfirm={onConfirm} title="Save" />);

    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(screen.getByRole('button', { name: 'Confirm' }).getAttribute('aria-busy')).toBe('true');
    await waitFor(() => expect(onClose).toHaveBeenCalledOnce());
  });
});
