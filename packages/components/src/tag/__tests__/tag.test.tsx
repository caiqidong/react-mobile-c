import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));

import { Tag } from '../index';

afterEach(cleanup);

describe('Tag', () => {
  it('renders content and forwards its ref', () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Tag ref={ref}>Active</Tag>);
    expect(ref.current?.textContent).toBe('Active');
  });

  it('notifies when a closeable tag is closed without bubbling', () => {
    const onClose = vi.fn();
    const onClick = vi.fn();
    render(
      <Tag closeable onClick={onClick} onClose={onClose}>
        Filter
      </Tag>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Remove tag' }));
    expect(onClose).toHaveBeenCalledOnce();
    expect(onClick).not.toHaveBeenCalled();
  });
});
