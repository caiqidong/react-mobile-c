import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  keyframes: () => 'spin',
  props: () => ({}),
}));

import { Button } from '../index';
import { Icon } from '../../icon';

afterEach(cleanup);

describe('Button', () => {
  it('renders content, icon, native attributes, and forwards its ref', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(
      <Button aria-label="Save" icon={<span>icon</span>} ref={ref}>
        Save
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Save' })).toBe(ref.current);
    expect(screen.getByText('icon')).toBeTruthy();
    expect(ref.current?.type).toBe('button');
  });

  it('blocks clicks and exposes busy state while loading', () => {
    const onClick = vi.fn();
    const { rerender } = render(<Button onClick={onClick}>Submit</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();

    rerender(
      <Button loading onClick={onClick}>
        Submit
      </Button>,
    );
    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByRole('button').getAttribute('aria-busy')).toBe('true');
    expect(screen.getByRole('button').getAttribute('aria-disabled')).toBe('true');
  });

  it('uses the native disabled state when disabled', () => {
    render(<Button disabled>Disabled</Button>);

    expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(true);
  });
});

describe('Icon', () => {
  it('renders labelled SVG content with custom size and color', () => {
    render(
      <Icon color="#ff0000" size={32} title="Close">
        {createElement('path', { d: 'M4 4l16 16' })}
      </Icon>,
    );

    const icon = screen.getByRole('img', { name: 'Close' });
    expect(icon.getAttribute('width')).toBe('32');
    expect(icon.getAttribute('height')).toBe('32');
    expect(icon.getAttribute('style')).toContain('color: rgb(255, 0, 0)');
  });

  it('hides decorative icons from assistive technology', () => {
    const { container } = render(
      <Icon>
        <path d="M0 0h24v24H0z" />
      </Icon>,
    );

    expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
  });
});
