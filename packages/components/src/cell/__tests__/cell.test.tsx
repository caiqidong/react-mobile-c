import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));

import { Cell } from '../index';

afterEach(cleanup);

describe('Cell', () => {
  it('renders its title, description, value and arrow', () => {
    render(<Cell arrow description="Profile settings" title="Account" value="Open" />);
    expect(screen.getByText('Account')).toBeTruthy();
    expect(screen.getByText('Profile settings')).toBeTruthy();
    expect(screen.getByText('Open')).toBeTruthy();
  });

  it('supports keyboard activation when clickable', () => {
    const onClick = vi.fn();
    render(<Cell onClick={onClick} title="Account" />);
    const cell = screen.getByRole('button');
    expect(cell.getAttribute('tabindex')).toBe('0');
    fireEvent.keyDown(cell, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders zero-valued slots', () => {
    render(<Cell description={0} icon={0} title={0} value={0} />);
    expect(screen.getAllByText('0')).toHaveLength(4);
  });
});
