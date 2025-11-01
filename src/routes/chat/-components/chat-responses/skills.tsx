const SkillsResponse = () => {
  const skills = [
    {
      name: 'React',
      description: 'Building modern, component-based user interfaces',
    },
    {
      name: 'Next.js',
      description: 'Full-stack framework with SSR and API routes',
    },
    {
      name: 'TypeScript',
      description: 'Type-safe JavaScript for scalable applications',
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS for rapid UI development',
    },
    { name: 'Node.js', description: 'Server-side JavaScript and REST APIs' },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="pb-3 border-b border-gray-100 last:border-0 last:pb-0"
          >
            <h4 className="font-semibold text-gray-900 mb-1">{skill.name}</h4>
            <p className="text-sm text-gray-600">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsResponse;
