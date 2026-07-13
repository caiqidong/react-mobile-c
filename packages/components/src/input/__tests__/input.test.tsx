import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));

import { Input } from '../index';
import { Textarea } from '../../textarea';

afterEach(cleanup);

describe('Input', () => {
  it('updates an uncontrolled value, count, and callback', () => {
    const onChange = vi.fn();
    render(<Input aria-label="Name" maxLength={10} onChange={onChange} showCount />);
    const input = screen.getByLabelText('Name') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Mobile' } });

    expect(input.value).toBe('Mobile');
    expect(screen.getByText('6/10')).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith('Mobile', expect.any(Object));
  });

  it('clears values and supports controlled mode', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Input aria-label="Search" clearable onChange={onChange} value="query" />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Clear input' }));
    expect(onChange).toHaveBeenCalledWith('');
    expect((screen.getByLabelText('Search') as HTMLInputElement).value).toBe('query');

    rerender(<Input aria-label="Search" clearable onChange={onChange} value="" />);
    expect(screen.queryByRole('button', { name: 'Clear input' })).toBeNull();
  });
});

describe('Textarea', () => {
  it('updates its value and character count', () => {
    const onChange = vi.fn();
    render(<Textarea aria-label="Bio" maxLength={20} onChange={onChange} showCount />);
    const textarea = screen.getByLabelText('Bio') as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: 'Hello' } });

    expect(textarea.value).toBe('Hello');
    expect(screen.getByText('5/20')).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith('Hello', expect.any(Object));
  });

  it('grows to its scroll height and forwards its ref', () => {
    const ref = { current: null as HTMLTextAreaElement | null };
    render(<Textarea aria-label="Notes" autoSize ref={ref} value="Line" />);
    Object.defineProperty(ref.current, 'scrollHeight', { configurable: true, value: 120 });

    fireEvent.change(ref.current as HTMLTextAreaElement, { target: { value: 'Line 2' } });

    expect(ref.current?.style.height).toBe('120px');
  });
});
