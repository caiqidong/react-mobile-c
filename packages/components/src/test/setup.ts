import { toHaveNoViolations } from 'jest-axe';
import { expect, vi } from 'vitest';

expect.extend(toHaveNoViolations);

Object.defineProperty(window, 'scrollTo', {
  configurable: true,
  value: vi.fn(),
  writable: true,
});

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> {
    toHaveNoViolations(): T;
  }
}
