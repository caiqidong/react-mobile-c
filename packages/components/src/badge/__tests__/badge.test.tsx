import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));

import { Badge } from '../index';

afterEach(cleanup);

describe('Badge', () => {
  it('renders a capped count and forwards its ref', () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(
      <Badge content={120} max={99} ref={ref}>
        Inbox
      </Badge>,
    );

    expect(screen.getByText('99+')).toBeTruthy();
    expect(ref.current?.textContent).toBe('Inbox99+');
  });

  it('renders dot and custom content variants', () => {
    const { rerender } = render(<Badge dot>Updates</Badge>);
    expect(screen.getByLabelText('notification')).toBeTruthy();

    rerender(<Badge content="New" />);
    expect(screen.getByText('New')).toBeTruthy();
  });

  it('hides empty and zero content unless requested', () => {
    const { container, rerender } = render(<Badge content={0} />);
    expect(container.childElementCount).toBe(0);

    rerender(<Badge content={0} showZero />);
    expect(screen.getByText('0')).toBeTruthy();
  });

  it('keeps zero-valued children and applies native styles to the root', () => {
    const { container } = render(
      <Badge content={1} style={{ marginTop: 4 }}>
        {0}
      </Badge>,
    );
    expect(container.firstElementChild?.textContent).toBe('01');
    expect((container.firstElementChild as HTMLElement).style.marginTop).toBe('4px');
  });
});
