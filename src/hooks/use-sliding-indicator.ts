import { useCallback, useLayoutEffect, useRef } from 'react';

/**
 * Measures the active child and publishes its offset and width as CSS custom
 * properties on the container, so a single pill can travel between items
 * instead of one background blinking off while another blinks on.
 *
 * Children are matched by `data-key`. The travel itself is a CSS transition —
 * this only writes numbers.
 */
export function useSlidingIndicator<T extends HTMLElement>(
  prefix: string,
  activeKey: string | number | null,
) {
  const ref = useRef<T>(null);

  const update = useCallback(() => {
    const container = ref.current;
    if (!container) return;
    const key = activeKey === null ? null : String(activeKey);
    const target =
      key === null
        ? null
        : Array.from(container.children).find(
            (child): child is HTMLElement =>
              child instanceof HTMLElement && child.dataset.key === key,
          );
    if (!target) {
      container.style.setProperty(`--${prefix}-o`, '0');
      return;
    }
    const bounds = container.getBoundingClientRect();
    const box = target.getBoundingClientRect();
    container.style.setProperty(`--${prefix}-x`, `${box.left - bounds.left}px`);
    container.style.setProperty(`--${prefix}-w`, `${box.width}px`);
    container.style.setProperty(`--${prefix}-o`, '1');
  }, [prefix, activeKey]);

  useLayoutEffect(() => {
    update();
    const container = ref.current;
    if (!container || typeof ResizeObserver === 'undefined') return;
    // Fonts landing late, or the nav shrinking on scroll, both move the target.
    const observer = new ResizeObserver(update);
    observer.observe(container);
    for (const child of container.children) observer.observe(child);
    void document.fonts?.ready.then(update).catch(() => {});
    return () => observer.disconnect();
  }, [update]);

  return ref;
}
