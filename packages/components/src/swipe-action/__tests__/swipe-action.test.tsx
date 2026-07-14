import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));
import { SwipeAction } from '../index';
afterEach(cleanup);

describe('SwipeAction', () => {
  it('opens right actions after swiping left', () => {
    const onOpen = vi.fn();
    render(
      <SwipeAction onOpen={onOpen} rightActions={[{ key: 'delete', text: 'Delete' }]}>
        <div>Message</div>
      </SwipeAction>,
    );
    const content = screen.getByText('Message').parentElement;
    expect(content).not.toBeNull();
    if (!content) return;
    fireEvent.touchStart(content, { touches: [{ clientX: 100 }] });
    fireEvent.touchMove(content, { touches: [{ clientX: 40 }] });
    fireEvent.touchEnd(content);
    expect(content.style.transform).toBe('translateX(-64px)');
    expect(onOpen).toHaveBeenCalledWith('right');
  });
});
