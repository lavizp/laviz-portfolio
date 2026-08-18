import { createFileRoute, Link } from '@tanstack/react-router';
import { PageHeader } from '@/components/sections/page-header';
import { ProjectItem } from '@/components/sections/project-item';
import { projects, smallerProjects } from '@/data/portfolio';

export const Route = createFileRoute('/projects')({
  component: ProjectsPage,
});

const ghostLink =
  'inline-flex items-center gap-1.5 border-b-2 border-brand pb-px font-sans text-sm font-semibold text-brand hover:text-brand-700';

function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[900px] px-[clamp(20px,5vw,56px)]">
      <PageHeader
        title="Projects"
        intro="Three tools I maintain, and the smaller things I keep around because they still do their one job."
      />

      <section className="pt-[clamp(40px,6vw,64px)]">
        <span className="modernist-label mb-2.5 block text-foreground/60">
          Maintained
        </span>

        {projects.map((project, index) => (
          <ProjectItem
            key={project.title}
            project={project}
            detailed
            isLast={index === projects.length - 1}
          />
        ))}
      </section>

      <section className="pt-[clamp(40px,6vw,60px)]">
        <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-[10px_32px]">
          <span className="modernist-label text-foreground/60">
            Smaller things
          </span>
          <span className="modernist-label text-foreground/55">
            Unmaintained, still useful
          </span>
        </div>

        {smallerProjects.map((item, index) => (
          <div
            key={item.title}
            className={`grid grid-cols-1 items-baseline gap-y-1 border-divider py-[18px] sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:gap-[6px_clamp(20px,4vw,44px)] ${
              index === smallerProjects.length - 1
                ? 'border-b-2 border-t-2'
                : 'border-t-2'
            }`}
          >
            <h3 className="m-0 font-sans text-[18px] font-extrabold leading-[26px] tracking-[-0.01em]">
              {item.title}
            </h3>
            <p className="m-0 text-[15px] leading-[26px] text-foreground/76">
              {item.description}
            </p>
          </div>
        ))}
      </section>

      <div className="flex flex-wrap gap-4 pt-[clamp(36px,5vw,52px)]">
        <Link to="/" className={ghostLink}>
          ← Back home
        </Link>
        <Link to="/writing" className={ghostLink}>
          Writing →
        </Link>
      </div>
    </div>
  );
}