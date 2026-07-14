import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  keyframes: (frames: object) => frames,
  props: () => ({}),
}));

import { Dialog, dialog } from '../index';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

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

  it('has no detectable accessibility violations', async () => {
    render(
      <Dialog isOpen title="Delete item">
        This action cannot be undone.
      </Dialog>,
    );

    expect(await axe(document.body)).toHaveNoViolations();
  });

  it('resolves imperative confirms with the selected result', async () => {
    vi.useFakeTimers();
    const result = dialog.confirm({ content: 'Continue?', title: 'Confirm action' });

    await act(async () => {});
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    await act(async () => vi.advanceTimersByTime(250));

    await expect(result).resolves.toBe(false);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('resolves imperative alerts after confirmation', async () => {
    vi.useFakeTimers();
    const result = dialog.alert({ content: 'Saved', title: 'Success' });

    await act(async () => {});
    expect(screen.queryByRole('button', { name: 'Cancel' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    await act(async () => vi.advanceTimersByTime(250));

    await expect(result).resolves.toBeUndefined();
  });
});
