const NotFoundResponse = () => {
  const suggestions = [
    'Tell me about your skills',
    'What projects have you worked on?',
    'Show me your experience',
    'What tech stack do you use?',
    'How can I contact you?',
  ];

  return (
    <div>
      <p className="text-gray-700 mb-4">
        I can't answer that question. Try asking about:
      </p>
      <ul className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span className="text-sm text-gray-600">{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotFoundResponse;
