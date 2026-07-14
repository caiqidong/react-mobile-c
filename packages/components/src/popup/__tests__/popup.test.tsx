import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));

import { Popup } from '../index';

afterEach(cleanup);

describe('Popup', () => {
  it('renders into a portal with the requested position', () => {
    render(
      <Popup data-testid="popup" isOpen position="right">
        Content
      </Popup>,
    );

    const popup = screen.getByTestId('popup');
    expect(popup.parentElement?.parentElement).toBe(document.body);
    expect(popup.dataset.position).toBe('right');
  });

  it('closes from the overlay and Escape key', () => {
    const onClose = vi.fn();
    render(
      <Popup data-testid="popup" isOpen onClose={onClose}>
        Content
      </Popup>,
    );

    fireEvent.click(screen.getByTestId('popup').parentElement as HTMLElement);
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('does not close when disabled or when content is clicked', () => {
    const onClose = vi.fn();
    render(
      <Popup
        closeOnEscape={false}
        closeOnOverlayClick={false}
        data-testid="popup"
        isOpen
        onClose={onClose}
      >
        Content
      </Popup>,
    );

    fireEvent.click(screen.getByTestId('popup'));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });
});
