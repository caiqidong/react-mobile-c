import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
vi.mock('@stylexjs/stylex', () => ({
  create: (styles: object) => styles,
  defineVars: (values: object) => values,
  props: () => ({}),
}));
import { PullRefresh } from '../index';
afterEach(cleanup);

describe('PullRefresh', () => {
  it('refreshes after pulling beyond the threshold', async () => {
    let finishRefresh: (() => void) | undefined;
    const onRefresh = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finishRefresh = resolve;
        }),
    );
    render(
      <PullRefresh onRefresh={onRefresh}>
        <div>Feed</div>
      </PullRefresh>,
    );
    const content = screen.getByText('Feed').parentElement;
    expect(content).not.toBeNull();
    if (!content) return;
    fireEvent.touchStart(content, { touches: [{ clientY: 0 }] });
    fireEvent.touchMove(content, { touches: [{ clientY: 140 }] });
    expect(screen.getByText('Release to refresh')).toBeTruthy();
    fireEvent.touchEnd(content);
    await waitFor(() => expect(onRefresh).toHaveBeenCalledOnce());
    expect(screen.getByText('Refreshing...')).toBeTruthy();
    expect(content.style.transform).toBe('translateY(64px)');
    finishRefresh?.();
    await waitFor(() => expect(content.style.transform).toBe('translateY(0px)'));
  });
});
