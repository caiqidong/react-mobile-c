import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));

import { Card } from '../index';

afterEach(cleanup);

describe('Card', () => {
  it('renders title, content, extra and footer', () => {
    render(
      <Card extra="Details" footer="Actions" title="Overview">
        Content
      </Card>,
    );
    expect(screen.getByText('Overview')).toBeTruthy();
    expect(screen.getByText('Content')).toBeTruthy();
    expect(screen.getByText('Details')).toBeTruthy();
    expect(screen.getByText('Actions')).toBeTruthy();
  });

  it('forwards native attributes and its ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <Card data-testid="card" ref={ref}>
        Content
      </Card>,
    );
    expect(screen.getByTestId('card')).toBe(ref.current);
  });

  it('renders zero-valued slots', () => {
    render(
      <Card extra={0} footer={0} title={0}>
        Content
      </Card>,
    );
    expect(screen.getAllByText('0')).toHaveLength(3);
  });
});
