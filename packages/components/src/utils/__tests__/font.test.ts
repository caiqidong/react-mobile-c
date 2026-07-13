import { afterEach, describe, expect, it, vi } from 'vitest';

import { waitForFont } from '../font';

describe('waitForFont', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves when the requested font finishes loading', async () => {
    const load = vi.fn().mockResolvedValue([]);
    Object.defineProperty(document, 'fonts', {
      configurable: true,
      value: { load },
    });

    await waitForFont('Mobile Sans');

    expect(load).toHaveBeenCalledWith('16px "Mobile Sans"');
  });

  it('resolves on timeout when font loading stalls', async () => {
    vi.useFakeTimers();
    Object.defineProperty(document, 'fonts', {
      configurable: true,
      value: { load: vi.fn(() => new Promise(() => undefined)) },
    });

    const promise = waitForFont('Slow Sans', 100);
    await vi.advanceTimersByTimeAsync(100);

    await expect(promise).resolves.toBeUndefined();
  });

  it('rejects empty font family names', async () => {
    Object.defineProperty(document, 'fonts', {
      configurable: true,
      value: { load: vi.fn() },
    });

    await expect(waitForFont('  ')).rejects.toThrow(TypeError);
  });
});
