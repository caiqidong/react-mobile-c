import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));

import { Image } from '../index';

afterEach(cleanup);

describe('Image', () => {
  it('uses native lazy loading and forwards the image ref', () => {
    const ref = { current: null as HTMLImageElement | null };
    render(<Image alt="Product" ref={ref} src="product.png" />);

    expect(screen.getByRole('img', { name: 'Product' })).toBe(ref.current);
    expect(ref.current?.getAttribute('loading')).toBe('lazy');
  });

  it('shows a placeholder until loading succeeds', () => {
    const onLoad = vi.fn();
    render(<Image alt="Avatar" onLoad={onLoad} placeholder="Loading" src="avatar.png" />);
    const image = screen.getByRole('img', { name: 'Avatar' });

    expect(screen.getByText('Loading')).toBeTruthy();
    fireEvent.load(image);

    expect(screen.queryByText('Loading')).toBeNull();
    expect(onLoad).toHaveBeenCalledOnce();
  });

  it('shows a custom fallback and emits image errors', () => {
    const onError = vi.fn();
    render(<Image alt="Broken" fallback="Try again" onError={onError} src="broken.png" />);

    fireEvent.error(screen.getByRole('img', { name: 'Broken' }));

    expect(screen.getByRole('status').textContent).toBe('Try again');
    expect(onError).toHaveBeenCalledOnce();
  });

  it('supports eager loading', () => {
    render(<Image alt="Hero" lazy={false} src="hero.png" />);

    expect(screen.getByRole('img', { name: 'Hero' }).getAttribute('loading')).toBe('eager');
  });
});
