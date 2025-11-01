const ExperienceResponse = () => {
  const experiences = [
    {
      company: 'Tech Innovators Inc.',
      role: 'Senior Full-Stack Developer',
      description:
        'Led development of scalable web applications, mentored junior developers, and architected microservices solutions.',
    },
    {
      company: 'Digital Solutions Co.',
      role: 'Frontend Developer',
      description:
        'Built responsive user interfaces, implemented design systems, and optimized application performance.',
    },
    {
      company: 'StartUp Ventures',
      role: 'Software Engineer',
      description:
        'Developed features for MVP products, collaborated with cross-functional teams, and contributed to technical decisions.',
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience</h3>
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="pb-4 border-b border-gray-100 last:border-0 last:pb-0"
          >
            <h4 className="font-semibold text-gray-900 mb-1">{exp.role}</h4>
            <p className="text-sm font-medium text-blue-600 mb-2">
              {exp.company}
            </p>
            <p className="text-sm text-gray-600">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceResponse;
