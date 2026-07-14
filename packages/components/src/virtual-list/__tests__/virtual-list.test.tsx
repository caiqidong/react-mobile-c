import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));
import { VirtualList } from '../index';
afterEach(cleanup);

describe('VirtualList', () => {
  it('renders only the visible window and updates it while scrolling', () => {
    const data = Array.from({ length: 1000 }, (_, index) => `Item ${index}`);
    render(
      <VirtualList
        data={data}
        height={200}
        itemHeight={40}
        overscan={1}
        renderItem={(item) => item}
      />,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(7);
    const list = screen.getByRole('list');
    Object.defineProperty(list, 'scrollTop', { configurable: true, value: 400 });
    fireEvent.scroll(list);
    expect(screen.getByText('Item 9')).toBeTruthy();
    expect(screen.queryByText('Item 0')).toBeNull();
  });
});
