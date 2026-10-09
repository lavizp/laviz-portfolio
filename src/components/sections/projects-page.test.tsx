// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import type { ReactNode } from 'react';

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, ...props }: { children: ReactNode; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));
vi.mock('@/hooks/use-chat', () => ({ useChat: () => ({ openChat: vi.fn() }) }));
import { ProjectsPage as Page } from './projects-page';
import { archivedProjects, otherProjects, projects } from '@/data/portfolio';

afterEach(cleanup);

describe('projects page', () => {
  it('lists every other project, and none of the three showcased ones', () => {
    render(<Page />);
    const recent = document.querySelector('.more-projects') as HTMLElement;
    const archive = document.querySelector('.archive') as HTMLElement;
    for (const project of otherProjects)
      expect(within(recent).getByText(project.title)).toBeTruthy();
    for (const project of archivedProjects)
      expect(within(archive).getByText(project.title)).toBeTruthy();
    for (const project of projects)
      expect(screen.queryByRole('heading', { name: project.title })).toBeNull();
  });

  it('links each project to its source, and to a live app where one exists', () => {
    render(<Page />);
    const hrefs = Array.from(document.querySelectorAll('a')).map((link) =>
      link.getAttribute('href'),
    );
    for (const project of [...otherProjects, ...archivedProjects]) {
      expect(hrefs).toContain(project.github);
      if (project.demo) expect(hrefs).toContain(project.demo);
    }
  });
});
