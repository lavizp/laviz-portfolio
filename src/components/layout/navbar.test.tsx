// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

vi.mock('@tanstack/react-router', () => ({
  useLocation: () => ({ pathname: '/' }),
  Link: ({ children, to, ...props }: { children: ReactNode; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));
import { Navbar } from './navbar';

beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      disconnect() {}
    },
  );
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('mobile navigation', () => {
  it('opens an accessible menu, locks scrolling, and closes with Escape', () => {
    render(<Navbar />);
    const menu = document.getElementById('portfolio-mobile-nav')!;
    expect(menu.hasAttribute('inert')).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
    expect(
      screen
        .getByRole('button', { name: 'Close navigation' })
        .getAttribute('aria-expanded'),
    ).toBe('true');
    expect(menu.hasAttribute('inert')).toBe(false);
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(menu.getAttribute('aria-hidden')).toBe('true');
    expect(document.body.style.overflow).toBe('');
  });

  it('closes after choosing a section and restores scrolling on unmount', () => {
    const { unmount } = render(<Navbar />);
    fireEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
    const link = document.querySelector(
      '#portfolio-mobile-nav a[href="/#work"]',
    )!;
    fireEvent.click(link);
    expect(
      screen
        .getByRole('button', { name: 'Open navigation' })
        .getAttribute('aria-expanded'),
    ).toBe('false');
    expect(document.body.style.overflow).toBe('');
    fireEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
