import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));
import { LazyLoad } from '../index';
afterEach(cleanup);

describe('LazyLoad', () => {
  it('renders content after entering the viewport', async () => {
    let notifyIntersection: IntersectionObserverCallback | undefined;
    const observe = vi.fn();
    const disconnect = vi.fn();
    globalThis.IntersectionObserver = class {
      constructor(callback: IntersectionObserverCallback) {
        notifyIntersection = callback;
      }
      disconnect = disconnect;
      observe = observe;
      takeRecords = vi.fn();
      unobserve = vi.fn();
      root = null;
      rootMargin = '0px';
      thresholds = [0];
    };
    render(
      <LazyLoad height={120} placeholder="Loading">
        <img alt="Product" src="product.jpg" />
      </LazyLoad>,
    );
    expect(screen.getByText('Loading')).toBeTruthy();
    notifyIntersection?.(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    await waitFor(() => expect(screen.getByRole('img', { name: 'Product' })).toBeTruthy());
    expect(observe).toHaveBeenCalledOnce();
    expect(disconnect).toHaveBeenCalled();
  });
});
