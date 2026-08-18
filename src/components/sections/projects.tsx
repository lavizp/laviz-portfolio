import { Link } from '@tanstack/react-router';
import { projects } from '@/data/portfolio';
import { ProjectItem } from '@/components/sections/project-item';

export function Projects() {
  return (
    <section id="projects" className="pb-14 pt-11">
      <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-[10px_32px]">
        <span className="modernist-label text-foreground/60">Projects</span>
        <span className="modernist-label text-foreground/55 [font-feature-settings:'tnum'1]">
          Three, all still maintained
        </span>
      </div>

      {projects.map((project, index) => (
        <ProjectItem
          key={project.title}
          project={project}
          isLast={index === projects.length - 1}
        />
      ))}

      <div className="mt-7 flex">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 border-b-2 border-brand pb-px font-sans text-sm font-semibold text-brand hover:text-brand-700"
        >
          All projects →
        </Link>
      </div>
    </section>
  );
}