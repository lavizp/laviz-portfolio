import type { Project } from '@/data/portfolio';

interface ProjectItemProps {
  project: Project;
  detailed?: boolean;
  isLast?: boolean;
}

export function ProjectItem({
  project,
  detailed = false,
  isLast = false,
}: ProjectItemProps) {
  return (
    <article
      className={`grid grid-cols-1 items-start gap-y-6 border-divider py-[34px] sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] sm:gap-[22px_clamp(24px,5vw,56px)] ${
        isLast ? 'border-b-2 border-t-2' : 'border-t-2'
      }`}
    >
      <div className="flex flex-col items-start gap-3">
        <div className="flex items-center gap-3">
          <span className="font-sans text-[13px] font-extrabold leading-[14px] tracking-[0.08em] text-brand [font-feature-settings:'tnum'1]">
            {project.index}
          </span>
          <span className="border border-brand px-2.5 py-[3px] text-[11px] leading-none text-brand">
            {project.tag}
          </span>
        </div>
        <h2 className="ml-[-0.03em] m-0 font-sans text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.06] tracking-[-0.02em]">
          {project.title}
        </h2>
        <p className="m-0 mt-1.5 max-w-[44ch] text-[16.5px] leading-7 text-foreground/82">
          {project.description}
        </p>
        {detailed && (
          <p className="m-0 max-w-[44ch] text-[15.5px] leading-[27px] text-foreground/70">
            {project.detail}
          </p>
        )}
      </div>

      <div className="flex flex-col items-start gap-4">
        <div className="flex w-full gap-2.5 bg-foreground px-[18px] py-[15px] text-[14px] leading-5 text-background [overflow-wrap:anywhere]">
          <span className="flex-none text-brand-300">$</span>
          <span>{project.command}</span>
        </div>
        {detailed && (
          <div className="flex w-full flex-col">
            <div className="modernist-label flex justify-between gap-4 border-t-2 border-divider py-2.5 text-foreground/62">
              <span>Status</span>
              <span className="text-foreground">{project.status}</span>
            </div>
            <div className="modernist-label flex justify-between gap-4 border-t-2 border-divider py-2.5 text-foreground/62">
              <span>Released</span>
              <span className="text-foreground [font-feature-settings:'tnum'1]">
                {project.released}
              </span>
            </div>
          </div>
        )}
        <p className="modernist-label m-0">
          <a
            href={project.linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b-2 border-brand pb-px text-foreground hover:text-brand-700"
          >
            {project.linkLabel}
          </a>
        </p>
      </div>
    </article>
  );
}