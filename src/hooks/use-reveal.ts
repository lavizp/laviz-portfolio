import { useEffect } from 'react';

/** Runs `task` on the next frame, or on a timer if frames are not being
 *  produced — a page loaded in a background tab gets no rAF callbacks until
 *  it is focused, and the reveal states must not strand content hidden. */
function soon(task: () => void, fallbackMs: number) {
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    task();
  };
  const frame = requestAnimationFrame(run);
  const timer = window.setTimeout(run, fallbackMs);
  return () => {
    cancelAnimationFrame(frame);
    clearTimeout(timer);
  };
}

/**
 * Drives the scroll reveals and the page-load sequence.
 *
 * Elements opt in with `data-reveal="lines" | "up" | "rise"`. This hook only
 * sets `data-inview`; every transition, delay and stagger lives in styles.css,
 * so reveals cost no main-thread work once they have fired. Children carrying
 * `--i` stagger off that index, and reduced motion is handled in CSS.
 *
 * Because an unrevealed element is invisible, failing to reveal one loses the
 * content outright. An IntersectionObserver does the work, and a throttled
 * geometric sweep backs it up for the cases where observer callbacks never
 * arrive; the sweep unhooks itself once everything has been revealed.
 */
export function useReveal(key?: string) {
  useEffect(() => {
    const root = document.documentElement;
    const cancels: Array<() => void> = [];
    const pending = new Set<Element>(
      document.querySelectorAll('[data-reveal]'),
    );

    const reveal = (element: Element) => {
      pending.delete(element);
      element.setAttribute('data-inview', '');
    };

    // Anything already on screen at mount is revealed without a transition, so
    // a reload partway down the page does not replay a reveal the reader has
    // already seen.
    const prime = (element: Element) => {
      element.setAttribute('data-instant', '');
      reveal(element);
      cancels.push(soon(() => element.removeAttribute('data-instant'), 100));
    };

    const observer =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            (entries, self) => {
              for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                reveal(entry.target);
                self.unobserve(entry.target);
              }
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
          );

    // Matches the observer's -12% bottom margin, so an element near the fold is
    // treated the same whether it was primed, observed or swept.
    const fold = () => window.innerHeight * 0.88;

    const first = true;
    for (const element of [...pending]) {
      if (first && element.getBoundingClientRect().top < fold()) prime(element);
      else observer?.observe(element);
    }

    let queued: (() => void) | null = null;
    const stop = () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
    const sweep = () => {
      queued = null;
      const limit = fold();
      for (const element of [...pending]) {
        if (element.getBoundingClientRect().top >= limit) continue;
        observer?.unobserve(element);
        reveal(element);
      }
      if (!pending.size) stop();
    };
    // Throttled through `soon` rather than rAF alone: the sweep is the safety
    // net, so it has to run even when frames are not being produced.
    const schedule = () => {
      if (!queued) queued = soon(sweep, 100);
    };
    if (pending.size) {
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
    }

    // Hand the hero its entrance once the layout has settled, so the opening
    // sequence does not start mid-hydration.
    cancels.push(soon(() => root.classList.add('ready'), 100));

    return () => {
      for (const cancel of cancels) cancel();
      queued?.();
      observer?.disconnect();
      stop();
    };
  }, [key]);
}
