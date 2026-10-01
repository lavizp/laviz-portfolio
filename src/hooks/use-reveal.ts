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
 * An unrevealed element is invisible, so missing one loses the content
 * outright. Three things cover that:
 *
 *  - an IntersectionObserver, which does the ordinary work;
 *  - a throttled geometric sweep on scroll and resize, for when observer
 *    callbacks never arrive;
 *  - a MutationObserver, because routes are code-split and their content
 *    mounts *after* this effect runs. Without it, navigating back to a page
 *    left every reveal on it hidden forever.
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const cancels = new Set<() => void>();
    const pending = new Set<Element>();
    let listening = false;

    const defer = (task: () => void, ms: number) => {
      const cancel = soon(() => {
        cancels.delete(cancel);
        task();
      }, ms);
      cancels.add(cancel);
    };

    const fold = () => window.innerHeight * 0.88;

    const reveal = (element: Element, instant: boolean) => {
      pending.delete(element);
      observer?.unobserve(element);
      // `instant` suppresses the transition, so content already on screen when
      // the page loads does not replay a reveal the reader has already seen.
      if (instant) {
        element.setAttribute('data-instant', '');
        defer(() => element.removeAttribute('data-instant'), 100);
      }
      element.setAttribute('data-inview', '');
    };

    const observer =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) reveal(entry.target, false);
              }
            },
            // Matches the sweep's threshold, so an element near the fold is
            // treated the same however it is noticed.
            { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
          );

    const stop = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };

    const settle = (instant: boolean) => {
      const limit = fold();
      for (const element of [...pending]) {
        if (!element.isConnected) {
          pending.delete(element);
          observer?.unobserve(element);
          continue;
        }
        if (element.getBoundingClientRect().top < limit)
          reveal(element, instant);
        else observer?.observe(element);
      }
      if (!pending.size) return stop();
      if (listening) return;
      listening = true;
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
    };

    let queued = false;
    const schedule = () => {
      if (queued) return;
      queued = true;
      // Throttled through `defer` rather than rAF alone: the sweep is the
      // safety net, so it has to run even when frames are not being produced.
      defer(() => {
        queued = false;
        settle(false);
      }, 100);
    };

    const admit = (elements: Iterable<Element>, instant: boolean) => {
      let added = false;
      for (const element of elements) {
        if (element.hasAttribute('data-inview') || pending.has(element))
          continue;
        pending.add(element);
        added = true;
      }
      if (added) settle(instant);
    };

    admit(document.querySelectorAll('[data-reveal]'), true);

    // Route chunks, and anything else rendered later, land here.
    const dom = new MutationObserver((records) => {
      const found: Element[] = [];
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches('[data-reveal]')) found.push(node);
          found.push(...node.querySelectorAll('[data-reveal]'));
        }
      }
      // A frame's grace so the arriving element has its hidden state computed
      // and the reveal actually transitions instead of snapping in.
      if (found.length) defer(() => admit(found, false), 50);
    });
    dom.observe(document.body, { childList: true, subtree: true });

    // Hand the hero its entrance once the layout has settled, so the opening
    // sequence does not start mid-hydration.
    defer(() => root.classList.add('ready'), 100);

    return () => {
      for (const cancel of cancels) cancel();
      dom.disconnect();
      observer?.disconnect();
      stop();
    };
  }, []);
}
