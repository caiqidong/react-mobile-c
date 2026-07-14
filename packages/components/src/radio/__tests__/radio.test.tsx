import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));
import { RadioGroup } from '../index';
afterEach(cleanup);

describe('RadioGroup', () => {
  it('selects one option and reports its value', () => {
    const onChange = vi.fn();
    render(
      <RadioGroup
        defaultValue="a"
        onChange={onChange}
        options={[
          { label: 'Alpha', value: 'a' },
          { label: 'Beta', value: 'b' },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Beta' }));
    expect(onChange).toHaveBeenCalledWith('b');
    expect((screen.getByRole('radio', { name: 'Beta' }) as HTMLInputElement).checked).toBe(true);
  });
});
