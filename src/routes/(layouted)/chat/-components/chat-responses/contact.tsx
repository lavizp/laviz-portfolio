import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

const ContactResponse = () => {
  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: 'your.email@example.com',
      href: 'mailto:your.email@example.com',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/yourusername',
      href: 'https://github.com/yourusername',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/yourprofile',
      href: 'https://linkedin.com/in/yourprofile',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      value: '@yourhandle',
      href: 'https://twitter.com/yourhandle',
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Me</h3>
      <div className="space-y-3">
        {contacts.map((contact, index) => (
          <a
            key={index}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <contact.icon className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {contact.label}
              </p>
              <p className="text-sm text-gray-600 truncate">{contact.value}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactResponse;
