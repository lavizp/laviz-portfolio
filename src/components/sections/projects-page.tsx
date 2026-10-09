import { Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { archivedProjects, otherProjects, projects } from '@/data/portfolio';
import { Reveal, Lines } from '@/components/sections/portfolio-home';

interface Tile {
  title: string;
  kind: string;
  year: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  demoLabel?: string;
  npm?: string;
}

/** One project card, on one of the three home-page surfaces. */
function ProjectTile({ project, tone }: { project: Tile; tone: number }) {
  return (
    <Reveal mode="rise" className={`more-card tone-${tone % 3}`}>
      <article>
        <div className="more-card-meta">
          <span>{project.kind}</span>
          <span>{project.year}</span>
        </div>
        <h3>
          {project.title}
          <span>.</span>
        </h3>
        <p>{project.description}</p>
        <ul className="project-tags">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="more-card-links">
          {/* The live app or site leads; without one, the npm page does. */}
          {project.demo ? (
            <a
              className="pill-button"
              href={project.demo}
              target="_blank"
              rel="noreferrer"
            >
              {project.demoLabel ?? 'Open the app'} <ArrowUpRight size={18} />
            </a>
          ) : (
            project.npm && (
              <a
                className="pill-button"
                href={project.npm}
                target="_blank"
                rel="noreferrer"
              >
                View on npm <ArrowUpRight size={18} />
              </a>
            )
          )}
          {project.github && (
            <a
              className="text-link"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              View the source <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}

/** Every project: the three maintained ones, recent work, and the archive. */
export function ProjectsPage() {
  const years = archivedProjects.map((project) => Number(project.year));
  const total =
    projects.length + otherProjects.length + archivedProjects.length;

  useEffect(() => {
    document.title = 'Projects — Laviz Pandey';
    return () => {
      document.title = 'Laviz Pandey — Full Stack Developer';
    };
  }, []);

  return (
    <div className="wide-section article-page projects-page">
      <header className="section-head">
        <div>
          <div className="eyebrow" data-reveal="up">
            <span>Projects</span>
            {total} in all
          </div>
          <h2 data-reveal="lines">
            <Lines>{['Everything', 'I’ve built.']}</Lines>
          </h2>
        </div>
        <p data-reveal="up" style={{ ['--i' as string]: 1 }}>
          The three from the home page, then recent experiments, small tools,
          and the projects I learned on.
        </p>
      </header>

      <section className="more-projects" aria-labelledby="maintained-projects">
        <div className="eyebrow" data-reveal="up" id="maintained-projects">
          <span>Featured</span>
          Also on the home page
        </div>
        <div className="more-grid is-featured">
          {projects.map((project) => (
            <ProjectTile
              key={project.title}
              tone={project.tone}
              project={{
                title: project.title,
                kind: project.tag,
                year: project.released,
                description: project.description,
                tech: project.tech,
                github: project.github,
                demo: project.demo,
                demoLabel: project.linkLabel,
                npm: project.npm,
              }}
            />
          ))}
        </div>
      </section>

      <section className="more-projects" aria-labelledby="recent-projects">
        <div className="eyebrow" data-reveal="up" id="recent-projects">
          <span>Recent</span>
          Experiments and small tools
        </div>
        <div className="more-grid">
          {otherProjects.map((project, index) => (
            // Featured ends on night, so this row opens on lavender: no two
            // neighbouring cards share a surface on desktop or mobile.
            <ProjectTile key={project.title} project={project} tone={index} />
          ))}
        </div>
      </section>

      <section className="archive" aria-labelledby="project-archive">
        <div className="eyebrow" data-reveal="up" id="project-archive">
          <span>Archive</span>
          {Math.min(...years) === Math.max(...years)
            ? Math.min(...years)
            : `${Math.min(...years)} — ${Math.max(...years)}`}
        </div>
        <div className="archive-list">
          {archivedProjects.map((project, index) => (
            <Reveal key={project.title} index={index}>
              <div className="archive-row">
                <span className="archive-year">{project.year}</span>
                <h3>
                  <a href={project.github} target="_blank" rel="noreferrer">
                    {project.title}
                  </a>
                </h3>
                <p>{project.description}</p>
                <span className="archive-tech">{project.tech.join(', ')}</span>
                <span className="archive-links">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  )}
                  <ArrowUpRight size={20} aria-hidden="true" />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="projects-foot">
        <Link className="text-link" to="/">
          <ArrowLeft size={18} /> Back home
        </Link>
        <a
          className="text-link"
          href="https://github.com/lavizp"
          target="_blank"
          rel="noreferrer"
        >
          Everything else is on GitHub <ArrowUpRight size={18} />
        </a>
      </div>
    </div>
  );
}
