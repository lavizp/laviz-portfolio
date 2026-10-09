import { Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { archivedProjects, otherProjects, projects } from '@/data/portfolio';
import { Reveal, Lines } from '@/components/sections/portfolio-home';

/** Everything beyond the three projects showcased on the home page. */
export function ProjectsPage() {
  const showcased = projects.map((project) => project.title);
  const years = archivedProjects.map((project) => Number(project.year));

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
            {otherProjects.length + archivedProjects.length} more
          </div>
          <h2 data-reveal="lines">
            <Lines>{['Everything', 'else I built.']}</Lines>
          </h2>
        </div>
        <p data-reveal="up" style={{ ['--i' as string]: 1 }}>
          {showcased.slice(0, -1).join(', ')} and {showcased.at(-1)} are on the
          home page. These are the rest: recent experiments, small tools, and
          the projects I learned on.
        </p>
      </header>

      <section className="more-projects" aria-labelledby="recent-projects">
        <div className="eyebrow" data-reveal="up" id="recent-projects">
          <span>Recent</span>
          Experiments and small tools
        </div>
        <div className="more-grid">
          {otherProjects.map((project, index) => (
            <Reveal
              key={project.title}
              mode="rise"
              className={`more-card tone-${index % 3}`}
            >
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
                  {project.demo && (
                    <a
                      className="pill-button"
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open the app <ArrowUpRight size={18} />
                    </a>
                  )}
                  <a
                    className="text-link"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View the source <ArrowUpRight size={18} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="archive" aria-labelledby="project-archive">
        <div className="eyebrow" data-reveal="up" id="project-archive">
          <span>Archive</span>
          {Math.min(...years)} — {Math.max(...years)}
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
