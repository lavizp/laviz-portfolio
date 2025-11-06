const TechStackResponse = () => {
  const techStack = {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    backend: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
    tools: ['Git', 'Docker', 'VS Code', 'Figma'],
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tech Stack</h3>
      <div className="space-y-4">
        {Object.entries(techStack).map(([category, items]) => (
          <div key={category}>
            <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">
              {category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {items.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-linear-to-r from-blue-50 to-indigo-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-200"
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

export default TechStackResponse;
