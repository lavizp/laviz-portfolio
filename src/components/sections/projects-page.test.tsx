// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, within } from '@testing-library/react';
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
  it('lists the showcased projects first, then recent work and the archive', () => {
    render(<Page />);
    const [maintained, recent] = Array.from(
      document.querySelectorAll<HTMLElement>('.more-projects'),
    );
    const archive = document.querySelector('.archive') as HTMLElement;
    for (const project of projects)
      expect(within(maintained).getByText(project.title)).toBeTruthy();
    for (const project of otherProjects)
      expect(within(recent).getByText(project.title)).toBeTruthy();
    for (const project of archivedProjects)
      expect(within(archive).getByText(project.title)).toBeTruthy();
  });

  it('links packages to npm, the rest to their source, and live apps where they exist', () => {
    render(<Page />);
    const hrefs = Array.from(document.querySelectorAll('a')).map((link) =>
      link.getAttribute('href'),
    );
    for (const project of [
      ...projects,
      ...otherProjects,
      ...archivedProjects,
    ]) {
      const npm = 'npm' in project ? project.npm : undefined;
      if (npm) {
        expect(hrefs).toContain(npm);
        expect(hrefs).not.toContain(project.github);
      } else if (project.github) expect(hrefs).toContain(project.github);
      if (project.demo) expect(hrefs).toContain(project.demo);
    }
  });
});
