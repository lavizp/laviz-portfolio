import { ExternalLink, Github } from 'lucide-react';

const ProjectsResponse = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description:
        'A full-stack e-commerce solution with real-time inventory management and payment processing.',
      tech: ['React', 'Node.js', 'PostgreSQL'],
      github: 'https://github.com/yourusername/project1',
      demo: 'https://project1-demo.com',
    },
    {
      title: 'Task Management App',
      description:
        'Collaborative task management tool with real-time updates and team workspace features.',
      tech: ['Next.js', 'TypeScript', 'Tailwind'],
      github: 'https://github.com/yourusername/project2',
      demo: 'https://project2-demo.com',
    },
    {
      title: 'Portfolio CMS',
      description:
        'Content management system for portfolios with drag-and-drop builder and theme customization.',
      tech: ['React', 'MongoDB', 'Express'],
      github: 'https://github.com/yourusername/project3',
      demo: 'https://project3-demo.com',
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
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-blue-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Demo</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsResponse;
