import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '@/data/portfolio';

const ProjectsResponse = () => {
  return (
    <div>
      <h3 className="mb-3 font-serif text-base font-semibold text-foreground">
        Projects
      </h3>
      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.title}
            className="rounded-xl border border-border bg-card p-3.5"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-semibold text-foreground">
                {project.title}
              </h4>
              <div className="flex items-center gap-0.5">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Source code"
                    className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Github className="size-3.5" />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live demo"
                    className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <ArrowUpRight className="size-3.5" />
                  </a>
                )}
              </div>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] font-medium text-secondary-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsResponse;
