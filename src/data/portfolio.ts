// ─────────────────────────────────────────────────────────────
// Portfolio content — single source of truth.
// Edit the values below; both the page sections and the AI chat
// responses read from this file.
//
// Blog posts live in src/content/posts/*.md — see src/lib/posts.ts.
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

export interface Stat {
  label: string;
  value: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  current?: boolean;
}

export interface Project {
  index: string;
  tag: string;
  title: string;
  description: string;
  detail: string;
  command: string;
  linkLabel: string;
  linkHref: string;
  status: string;
  released: string;
  tech: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface SmallerProject {
  title: string;
  description: string;
  github?: string;
  demo?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export const profile: Profile = {
  name: 'Laviz Pandey',
  firstName: 'Laviz',
  role: 'TypeScript Software Engineer',
  roles: [
    'TypeScript software engineer',
    'CLI tool maker',
    'Docs tooling tinkerer',
  ],
  tagline:
    'TypeScript software engineer. I make small tools for the terminal and the browser — the kind I wanted to exist, so I wrote them.',
  bio: 'I go by lavizp most places online. Days are spent writing TypeScript; evenings are spent building the small things around it — CLIs that do one job, documentation tooling that gets out of the way, and the occasional experiment that never leaves my machine. Everything I ship is something I use myself, which is the only quality bar I really trust.',
  location: 'Kathmandu, Nepal',
  email: 'hello@lavizpandey.com.np',
  availability: 'Open to small contracts',
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
    handle: 'pandeylaviz@gmail.com',
    href: 'mailto:pandeylaviz@gmail.com',
    icon: 'mail',
  },
];

export const stats: Stat[] = [
  { label: 'Building since', value: '2021' },
  { label: 'Mostly writes', value: 'TypeScript' },
  { label: 'Ships to', value: 'npm & the web' },
];

export const experience: Experience[] = [
  {
    role: 'Independent developer',
    company: 'Small tools, full time',
    period: '2024 — Present',
    description:
      'Building and maintaining promptic, storymark and confseal — the small tools I use every day. No team, no roadmap, just things that do one job well.',
    current: true,
  },
  {
    role: 'Frontend Engineer',
    company: 'Digital Solutions Co.',
    period: '2021 — 2024',
    description:
      'Built responsive, accessible interfaces and shipped a company-wide design system. Cut page load times by over 40%.',
  },
  {
    role: 'Software Engineer',
    company: 'StartUp Ventures',
    period: '2019 — 2021',
    description:
      'Developed features end-to-end and helped shape early technical direction.',
  },
];

export const projects: Project[] = [
  {
    index: '01',
    tag: 'CLI · Node',
    title: 'promptic',
    description:
      'Notes that live in your terminal, with an AI that has actually read them. Capture a thought in one keystroke; ask about it a month later.',
    detail:
      'Started as a shell alias in 2024. Now the thing I open first every morning.',
    command: 'npm i -g promptic',
    linkLabel: 'Source',
    linkHref: 'https://github.com/lavizp',
    status: 'Active',
    released: '2024',
    tech: ['TypeScript', 'Node.js', 'CLI'],
    github: 'https://github.com/lavizp',
    featured: true,
  },
  {
    index: '02',
    tag: 'Web · TypeScript',
    title: 'storymark',
    description:
      'Storybook, but for Markdown. Point it at a folder and get a browsable, live-reloading workbench for your docs — no config, no framework opinions.',
    detail:
      'Built in a weekend by cutting themes, plugins and config. That version is the one people use.',
    command: 'npx storymark ./docs',
    linkLabel: 'Live site',
    linkHref: 'https://storymark.lavizpandey.com.np/',
    status: 'Active',
    released: '2025',
    tech: ['TypeScript', 'Markdown', 'Vite'],
    github: 'https://github.com/lavizp',
    demo: 'https://storymark.lavizpandey.com.np/',
    featured: true,
  },
  {
    index: '03',
    tag: 'CLI · TypeScript',
    title: 'confseal',
    description:
      'An .env manager for people who have twelve of them. Encrypt, share and switch environment files per project — and never paste a secret into chat again.',
    detail:
      'Written after losing a staging config for the third time. Age-based encryption, no accounts.',
    command: 'confseal pull staging',
    linkLabel: 'Source',
    linkHref: 'https://github.com/lavizp',
    status: 'Active',
    released: '2026',
    tech: ['TypeScript', 'Node.js', 'CLI'],
    github: 'https://github.com/lavizp',
    featured: true,
  },
];

export const smallerProjects: SmallerProject[] = [
  {
    title: 'Spot The Code',
    description: 'Programmer style Geoguesser Clone',
    github: 'https://github.com/lavizp/spot-the-code',
    demo: 'https://spot-the-code-web.vercel.app',
  },
  {
    title: 'Perplexvillage',
    description: 'A perplexity Clone(AI Chatbot)',
    github: 'https://github.com/lavizp/perplexvillage',
  },
  {
    title: 'dotfiles',
    description: 'Nothing clever. Copy whatever is useful.',
    github: 'https://github.com/lavizp',
  },
];

export const skills: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'PostgreSQL', 'SQLite', 'GraphQL'],
  },
  {
    category: 'Tools & Platform',
    items: ['CLI', 'Markdown', 'Git', 'Docker'],
  },
];

export const chatSuggestions: string[] = [
  'Tell me something about yourself',
  'What projects have you worked on?',
  'What skills do you have?',
  'What tech stack do you use?',
  'How can I contact you?',
];
