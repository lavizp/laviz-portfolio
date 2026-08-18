import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { socials } from '@/data/portfolio';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
} as const;

const ContactResponse = () => {
  return (
    <div>
      <h3 className="mb-3 font-sans text-base font-extrabold text-foreground">
        Get in touch
      </h3>
      <div className="space-y-1">
        {socials.map((contact) => {
          const Icon = iconMap[contact.icon];
          return (
            <a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 border-b border-divider p-2 transition-colors last:border-0 hover:bg-accent"
            >
              <span className="flex size-8 items-center justify-center bg-brand-100 text-brand">
                <Icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-foreground">
                  {contact.label}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {contact.handle}
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ContactResponse;
