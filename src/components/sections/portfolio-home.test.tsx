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
  it('switches grindOS between workouts, sleep and spending', () => {
    render(<PortfolioHome />);
    expect(screen.getByText('Bench press')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Sleep' }));
    expect(screen.getByText(/of an 8h target/)).toBeTruthy();
    expect(screen.queryByText('Bench press')).toBeNull();

    const spending = screen.getByRole('button', { name: 'Spending' });
    fireEvent.click(spending);
    expect(spending.getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByText(/Food spending is up 30%/)).toBeTruthy();
  });

  it('shows which agents can read each l3.code skill', () => {
    render(<PortfolioHome />);
    const exhibit = document.querySelector('.skills-exhibit') as HTMLElement;
    // One skill reached by two agents is one row with two badges.
    expect(within(exhibit).getByText('Claude Code')).toBeTruthy();
    expect(within(exhibit).getByText('Codex')).toBeTruthy();

    fireEvent.click(
      within(exhibit).getByRole('button', { name: /review-checklist/ }),
    );
    expect(within(exhibit).queryByText('Claude Code')).toBeNull();
    expect(
      within(exhibit).getByText('~/.codex/skills/review-checklist'),
    ).toBeTruthy();
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
