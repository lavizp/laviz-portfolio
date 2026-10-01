// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import type { ReactNode } from 'react';

const { openChat } = vi.hoisted(() => ({ openChat: vi.fn() }));
vi.mock('@/hooks/use-chat', () => ({ useChat: () => ({ openChat }) }));
vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    to,
    params,
    ...props
  }: {
    children: ReactNode;
    to: string;
    params?: { post: string };
  }) => (
    <a href={params ? to.replace('$post', params.post) : to} {...props}>
      {children}
    </a>
  ),
}));
import { PortfolioHome } from './portfolio-home';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('portfolio interactions', () => {
  it('switches promptic panes and announces the selected content', () => {
    render(<PortfolioHome />);
    expect(screen.getByText(/reminder set for Thu/)).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getByText(/sqlite fts5/)).toBeTruthy();

    const ask = screen.getByRole('button', { name: 'Ask' });
    fireEvent.click(ask);
    expect(ask.getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByText(/exponential backoff capped at 30s/)).toBeTruthy();
  });

  it('navigates document previews without leaving the portfolio', () => {
    render(<PortfolioHome />);
    fireEvent.click(screen.getByRole('button', { name: 'Quick start' }));
    expect(screen.getByText('Up and running.')).toBeTruthy();
    expect(screen.getByText('npx storymark ./docs')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Components' }));
    expect(screen.getByText('Every detail, together.')).toBeTruthy();
  });

  it('keeps confseal secrets sealed until previewed, and never commits them', () => {
    render(<PortfolioHome />);
    const file = document.querySelector('.seal-file') as HTMLElement;
    expect(within(file).getByText(/AES-256-GCM/)).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Production' }));
    fireEvent.click(screen.getByRole('button', { name: 'Sealed' }));
    expect(screen.getByText(/NODE_ENV=production/).textContent).toContain(
      '# Illustrative values only',
    );

    // The encrypted store is what gets committed; the raw file stays ignored.
    const status = document.querySelector('.git-status') as HTMLElement;
    expect(
      within(status).getByText(/\.confseal\/production\.enc/).textContent,
    ).toContain('committed');
    expect(within(status).getByText(/\.env\.production/).textContent).toContain(
      'ignored',
    );

    fireEvent.click(screen.getByRole('button', { name: 'Preview' }));
    expect(screen.queryByText(/NODE_ENV=production/)).toBeNull();
    expect(within(file).getByText(/AES-256-GCM/)).toBeTruthy();
  });

  it('links posts to their pages, keeps contact actionable, and opens the assistant', () => {
    render(<PortfolioHome />);
    const writing = document.querySelector('#writing') as HTMLElement;
    expect(
      within(writing)
        .getAllByRole('link')
        .filter((link) => link.getAttribute('href')?.startsWith('/writing/')),
    ).toHaveLength(3);

    expect(
      screen
        .getByRole('link', { name: 'Start a conversation' })
        .getAttribute('href'),
    ).toBe('mailto:hello@lavizpandey.com.np');

    fireEvent.click(screen.getByRole('button', { name: /Tell me about/ }));
    expect(openChat).toHaveBeenCalledWith('What projects have you worked on?');
  });
});
