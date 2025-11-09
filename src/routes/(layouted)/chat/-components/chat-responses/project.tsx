import { ExternalLink, Github } from 'lucide-react';

const ProjectsResponse = () => {
  const projects = [
    {
      title: 'Gyanarthi',
      description:
        'An AI research assistant that helps users with their research needs.',
      tech: ['React', 'Fast API', 'RAG'],
      github: 'https://github.com/lavizp/gyanarthi-fe',
    },
    {
      title: 'SNWA',
      description:
        'A web app for a real estate agency based in Australia to handle CMS and property listings.',
      tech: ['Next.js', 'TypeScript', 'Tailwind'],
      demo: 'https://snwa.com.au/',
    },
    {
      title: 'Beatzbazar',
      description:
        'A music store that allows users to browse and purchase music.',
      tech: ['React', 'Typescript', 'Tailwind'],
      demo: 'https://beatzbazar.com/',
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects</h3>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
          >
            <h4 className="font-semibold text-gray-900 mb-2">
              {project.title}
            </h4>
            <p className="text-sm text-gray-600 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Code</span>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Demo</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsResponse;
