import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));

import { TabBar } from '../index';

afterEach(cleanup);

const items = [
  { href: '/home', icon: 'H', key: 'home', label: 'Home' },
  { badge: 3, icon: 'M', key: 'messages', label: 'Messages' },
  { disabled: true, key: 'profile', label: 'Profile' },
];

describe('TabBar', () => {
  it('supports links, icons, badges and selection changes', () => {
    const onChange = vi.fn();
    render(<TabBar defaultActiveKey="home" items={items} onChange={onChange} />);
    expect(screen.getByRole('link', { name: /Home$/ }).getAttribute('href')).toBe('/home');
    fireEvent.click(screen.getByRole('button', { name: /Messages$/ }));
    expect(onChange).toHaveBeenCalledWith('messages');
  });

  it('does not select disabled items', () => {
    const onChange = vi.fn();
    render(<TabBar items={items} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Profile' }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
