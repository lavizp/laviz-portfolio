// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, waitFor } from '@testing-library/react';
import { useReveal } from './use-reveal';

// jsdom has no IntersectionObserver, so these exercise the geometric fallback —
// the path that has to hold when observer callbacks never arrive.
function Harness({ late }: { late: boolean }) {
  useReveal();
  return (
    <div>
      <div data-reveal="up" data-testid="early" />
      {late && <div data-reveal="up" data-testid="late" />}
    </div>
  );
}

afterEach(cleanup);

describe('useReveal', () => {
  it('reveals content present at mount', async () => {
    const { getByTestId } = render(<Harness late={false} />);
    await waitFor(() =>
      expect(getByTestId('early').hasAttribute('data-inview')).toBe(true),
    );
  });

  it('reveals content that mounts after the effect has run', async () => {
    // Routes are code-split, so a route's content lands after the root effect
    // has already queried the DOM. Content arriving late must still reveal, or
    // navigating back to a page leaves it permanently blank.
    const { getByTestId, rerender } = render(<Harness late={false} />);
    await waitFor(() =>
      expect(getByTestId('early').hasAttribute('data-inview')).toBe(true),
    );

    rerender(<Harness late={true} />);

    await waitFor(() =>
      expect(getByTestId('late').hasAttribute('data-inview')).toBe(true),
    );
  });

  it('marks the document ready so the hero entrance can start', async () => {
    render(<Harness late={false} />);
    await waitFor(() =>
      expect(document.documentElement.classList.contains('ready')).toBe(true),
    );
  });
});
