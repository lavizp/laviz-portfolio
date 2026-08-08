import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '@/data/portfolio';
import { SectionHeading } from '@/components/sections/section-heading';
import { Reveal } from '@/components/sections/reveal';

export function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24"
    >
      <Reveal>
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="A few things I've designed, built, and shipped."
        />
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={(index % 2) * 0.08}>
            <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source code`}
                      className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <Github className="size-4" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <ArrowUpRight className="size-4" />
                    </a>
                  )}
                </div>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-secondary px-2.5 py-1 font-mono text-[11px] font-medium text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
