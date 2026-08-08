// ─────────────────────────────────────────────────────────────
// Portfolio content — single source of truth.
// Edit the values below; both the page sections and the AI chat
// responses read from this file.
// ─────────────────────────────────────────────────────────────

export interface Profile {
  name: string;
  firstName: string;
  role: string;
  roles: string[];
  tagline: string;
  bio: string;
  location: string;
  email: string;
  availability: string;
  availableForWork: boolean;
}

export interface Social {
  label: string;
  handle: string;
  href: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'mail';
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  current?: boolean;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export const profile: Profile = {
  name: 'Laviz Pandey',
  firstName: 'Laviz',
  role: 'Full-Stack Developer',
  roles: [
    'Full-Stack Developer',
    'Frontend Engineer',
    'React Specialist',
    'UI Craftsman',
  ],
  tagline:
    'I build fast, delightful web experiences — from pixel-perfect interfaces to resilient backend systems.',
  bio: "I'm a full-stack developer who cares deeply about craft. I love turning complex problems into simple, beautiful products — obsessing over performance, accessibility, and the small details that make software feel effortless. When I'm not shipping, I'm exploring new tools, contributing to open source, and refining my design eye.",
  location: 'Kathmandu, Nepal',
  email: 'hello@lavizpandey.com.np',
  availability: 'Open to new opportunities',
  availableForWork: true,
};

export const socials: Social[] = [
  {
    label: 'GitHub',
    handle: '@lavizp',
    href: 'https://github.com/lavizp',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    handle: 'in/lavizpandey',
    href: 'https://linkedin.com/in/lavizpandey',
    icon: 'linkedin',
  },
  {
    label: 'Twitter',
    handle: '@lavizpandey',
    href: 'https://twitter.com/lavizpandey',
    icon: 'twitter',
  },
  {
    label: 'Email',
    handle: 'hello@lavizpandey.com.np',
    href: 'mailto:hello@lavizpandey.com.np',
    icon: 'mail',
  },
];

export const experience: Experience[] = [
  {
    role: 'Senior Full-Stack Developer',
    company: 'Tech Innovators Inc.',
    period: '2023 — Present',
    description:
      'Leading development of scalable web applications, mentoring junior developers, and architecting microservices that serve thousands of daily users.',
    current: true,
  },
  {
    role: 'Frontend Developer',
    company: 'Digital Solutions Co.',
    period: '2021 — 2023',
    description:
      'Built responsive, accessible user interfaces, shipped a company-wide design system, and cut page load times by over 40%.',
  },
  {
    role: 'Software Engineer',
    company: 'StartUp Ventures',
    period: '2019 — 2021',
    description:
      'Developed MVP features end-to-end, collaborated with cross-functional teams, and helped shape early technical direction.',
  },
];

export const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-stack commerce solution with real-time inventory, Stripe payments, and an admin dashboard.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    github: 'https://github.com/lavizp/ecommerce-platform',
    demo: 'https://ecommerce-demo.lavizpandey.com.np',
    featured: true,
  },
  {
    title: 'Task Management App',
    description:
      'Collaborative task manager with real-time sync, team workspaces, and keyboard-first navigation.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'WebSockets'],
    github: 'https://github.com/lavizp/taskflow',
    demo: 'https://taskflow.lavizpandey.com.np',
    featured: true,
  },
  {
    title: 'Portfolio CMS',
    description:
      'A headless CMS for portfolios with a drag-and-drop page builder and theme customization.',
    tech: ['React', 'MongoDB', 'Express'],
    github: 'https://github.com/lavizp/portfolio-cms',
    demo: 'https://cms.lavizpandey.com.np',
  },
  {
    title: 'Dev Metrics CLI',
    description:
      'A command-line tool that surfaces code-quality metrics and trends across repositories.',
    tech: ['Node.js', 'TypeScript', 'SQLite'],
    github: 'https://github.com/lavizp/dev-metrics',
  },
];

export const skills: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL'],
  },
  {
    category: 'Tools & Platform',
    items: ['Git', 'Docker', 'AWS', 'Vite', 'Figma'],
  },
];

export const chatSuggestions: string[] = [
  'Tell me something about yourself',
  'What projects have you worked on?',
  'What skills do you have?',
  'What tech stack do you use?',
  'How can I contact you?',
];
