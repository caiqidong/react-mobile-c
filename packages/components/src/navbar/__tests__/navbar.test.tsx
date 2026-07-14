import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));

import { NavBar } from '../index';

afterEach(cleanup);

describe('NavBar', () => {
  it('renders the title and side slots', () => {
    render(<NavBar left="City" right="Search" title="Discover" />);
    expect(screen.getByText('City')).toBeTruthy();
    expect(screen.getByText('Discover')).toBeTruthy();
    expect(screen.getByText('Search')).toBeTruthy();
  });

  it('handles back navigation and forwards its ref', () => {
    const onBack = vi.fn();
    const ref = createRef<HTMLElement>();
    render(<NavBar backArrow onBack={onBack} ref={ref} title="Details" />);
    fireEvent.click(screen.getByRole('button', { name: 'Go back' }));
    expect(onBack).toHaveBeenCalledOnce();
    expect(ref.current?.tagName).toBe('HEADER');
  });
});
