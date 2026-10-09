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
  /** The package page, used in place of the source link where there is one. */
  npm?: string;
  featured?: boolean;
  /** Which project surface the card sits on: 0 lavender, 1 night, 2 sand. */
  tone: 0 | 1 | 2;
}

/** A project on the /projects page — everything beyond the three showcased. */
export interface OtherProject {
  title: string;
  kind: string;
  year: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  /** Label for the demo button, when "Open the app" is not right. */
  demoLabel?: string;
  /** The package page, used in place of the source link where there is one. */
  npm?: string;
}

/** An earlier project, listed in the archive by year. */
export interface ArchivedProject {
  title: string;
  year: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export const profile: Profile = {
  name: 'Laviz Pandey',
  firstName: 'Laviz',
  role: 'Full Stack Developer',
  roles: [
    'Full-stack developer',
    'Node.js, TypeScript, PostgreSQL',
    'AI voice and LLM platforms',
  ],
  tagline:
    'Full-stack developer with 2+ years designing and scaling backend systems for AI-driven products across the UAE, Australia and Nepal.',
  bio: 'I design and scale backend systems for AI-driven products. Over the past two years I have led small engineering teams across the UAE, Australia and Nepal, shipping production platforms that serve 10,000+ users and architecting AI voice and LLM-integrated engines. I specialise in Node.js and TypeScript on PostgreSQL, and I take services the whole way — architecture, authentication, data model, deployment. I work remotely from Kathmandu.',
  location: 'Kathmandu, Nepal',
  email: 'hello@lavizpandey.com.np',
  availability: 'Open to full-stack roles',
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
    handle: 'in/laviz-pandey',
    href: 'https://linkedin.com/in/laviz-pandey',
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

export const stats: Stat[] = [
  { label: 'Experience', value: '2+ years' },
  { label: 'Users served', value: '10,000+' },
  { label: 'Uptime held', value: '99.9%' },
];

export const education = {
  degree: 'BSc Computer Science',
  period: '2021 — 2026',
};

export const experience: Experience[] = [
  {
    role: 'Full Stack Developer',
    company: 'AI Geeks · Dubai, UAE (Remote)',
    period: 'Nov 2025 — Present',
    description:
      'Joined as a developer and grew into leading a three-to-four person team building a university application portal now serving 10,000+ active users. I designed the backend architecture and secure authentication supporting complex relational data flows at that scale, built reusable Node and Express modules and middleware that sped up feature delivery across the team, and kept the system reliable under growing load by resolving production issues and optimising PostgreSQL queries through Drizzle ORM.',
    current: true,
  },
  {
    role: 'Full Stack Developer',
    company: 'Fagoon AI · Sydney, Australia (Remote)',
    period: 'Sep 2023 — Nov 2025',
    description:
      'Led a team of five engineers delivering AI-driven products end to end and enforcing architectural standards across frontend and backend. I built the full-stack architecture behind the Fagoon Calling Agent — an AI voice platform handling human-like phone conversations at scale across cellular, WhatsApp and app-to-app channels — integrating LLM, STT/TTS and Speech-to-Speech APIs for natural, emotion-aware calls. The result was a system delivering 3,000 minutes of AI call time for as little as $700, letting clients automate sales outreach at a fraction of human-agent cost. I owned cloud deployment and CI/CD on GCP at 99.9% uptime.',
  },
  {
    role: 'Front End Developer Intern',
    company: 'Lancemeup · Kathmandu, Nepal',
    period: 'Jun 2023 — Sep 2023',
    description:
      'Built high-performance UI components in Next.js and Tailwind CSS with accessibility treated as a requirement rather than a pass at the end, and implemented real-time bidirectional communication with Socket.io.',
  },
];

export const projects: Project[] = [
  {
    index: '01',
    tag: 'Web app · PWA',
    title: 'grindOS',
    description:
      'A private, local-first tracker for workouts, sleep and spending on iPhone. Everything stays on the device in IndexedDB — no account, no server — and it installs to the Home Screen and works offline.',
    detail:
      'Rule-based insights are computed on the device, and backups are one JSON file you can merge or replace.',
    command: 'Add to Home Screen',
    linkLabel: 'Open the app',
    linkHref: 'https://grind-os-red.vercel.app',
    status: 'Active',
    released: '2026',
    tech: ['TypeScript', 'IndexedDB', 'PWA'],
    github: 'https://github.com/lavizp/grindOS',
    demo: 'https://grind-os-red.vercel.app',
    featured: true,
    tone: 0,
  },
  {
    index: '02',
    tag: 'CLI · Cryptography',
    title: 'confseal',
    description:
      'An npm CLI that keeps per-environment secrets inside the repository, encrypted with AES-256-GCM. The encrypted store is committed; the raw secrets and keys never are.',
    detail:
      'Built on Node’s native crypto module. Zero-config setup, with keys supplied by file or environment variable.',
    command: 'confseal pull staging',
    linkLabel: 'View on npm',
    linkHref: 'https://www.npmjs.com/package/confseal',
    status: 'Active',
    released: '2026',
    tech: ['Node.js', 'TypeScript', 'npm', 'AES-256-GCM'],
    github: 'https://github.com/lavizp/confseal',
    npm: 'https://www.npmjs.com/package/confseal',
    featured: true,
    tone: 2,
  },
  {
    index: '03',
    tag: 'Developer tool',
    title: 'l3.code',
    description:
      'A local web pane for the skills your coding agents read. Every SKILL.md on the machine in one list, each row showing which agents — Claude Code, Codex — can actually see it, and opening into an editor.',
    detail:
      'Paths are resolved through symlinks and grouped by real file, so one skill found by two agents is one row with two badges.',
    command: 'bun install',
    linkLabel: 'View the source',
    linkHref: 'https://github.com/lavizp/l3.code',
    status: 'Active',
    released: '2026',
    tech: ['TypeScript', 'Bun', 'WebSocket', 'MongoDB'],
    github: 'https://github.com/lavizp/l3.code',
    featured: true,
    tone: 1,
  },
];

export const otherProjects: OtherProject[] = [
  {
    title: 'storymark',
    kind: 'npm · TypeScript',
    year: '2026',
    description:
      'A published npm package that renders a folder of local Markdown as a styled, browsable viewer. Point it at your docs and get a live frontend — no config, no framework opinions.',
    tech: ['TypeScript', 'Next.js', 'Vite', 'npm'],
    github: 'https://github.com/lavizp/storymark',
    demo: 'https://storymark.lavizpandey.com.np/',
    demoLabel: 'Visit the site',
  },
  {
    title: 'promptic',
    kind: 'TUI · Bun',
    year: '2025',
    description:
      'A keyboard-driven terminal second brain. AI chat, todos, notes and reminders in one persistent TUI, with a local search index over all of it and reminders you can schedule in plain language.',
    tech: ['TypeScript', 'Bun', 'SQLite', 'OpenTUI'],
    github: 'https://github.com/lavizp/promptic',
  },
  {
    title: 'Spot The Code',
    kind: 'Web game · Multiplayer',
    year: '2026',
    description:
      'Geoguessr for programmers: guess the origin, language or context of a code snippet. Play alone, or host a multiplayer room over Socket.io and challenge your friends.',
    tech: ['TypeScript', 'TanStack Start', 'Socket.io', 'Bun'],
    github: 'https://github.com/lavizp/spot-the-code',
    demo: 'https://spot-the-code-web.vercel.app',
  },
  {
    title: 'Perplexvillage',
    kind: 'AI · Full stack',
    year: '2026',
    description:
      'A Perplexity-style AI chatbot. A React front end rendering Markdown answers, over an Express API that talks to Groq and rate-limits its callers.',
    tech: ['React', 'Express', 'Groq'],
    github: 'https://github.com/lavizp/perplexvillage',
  },
  {
    title: 'dependency-visualiser',
    kind: 'npm · CLI',
    year: '2025',
    description:
      'Prints your node_modules as a tree, so you can see how packages nest and where a dependency came from. Nothing to install — run it with npx.',
    tech: ['JavaScript', 'Node.js', 'npm'],
    github: 'https://github.com/lavizp/dependency-visualiser',
    npm: 'https://www.npmjs.com/package/dependency-visualiser',
  },
  {
    title: 'http-server',
    kind: 'Go · From scratch',
    year: '2025',
    description:
      'An HTTP server in Go with its own router, wildcard routes, logging and panic-recovery middleware, and a graceful shutdown on SIGTERM.',
    tech: ['Go'],
    github: 'https://github.com/lavizp/http-server',
  },
];

export const archivedProjects: ArchivedProject[] = [
  {
    title: 'Pokémon guessing game',
    year: '2023',
    description: 'A Pokémon guessing game.',
    tech: ['React', 'React Query', 'Framer Motion'],
    github: 'https://github.com/lavizp/pokemon-guessing-game',
    demo: 'https://pokemon-guessing-game-sigma.vercel.app',
  },
  {
    title: 'AR-Unity',
    year: '2023',
    description: 'An augmented reality project to promote local tourism.',
    tech: ['Unity', 'C#'],
    github: 'https://github.com/lavizp/AR-Unity',
  },
];

export const skills: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML/CSS'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'TanStack'],
  },
  {
    category: 'Backend & data',
    items: ['Node.js', 'Express.js', 'PostgreSQL', 'SQLite', 'Drizzle ORM'],
  },
  {
    category: 'AI & security',
    items: [
      'LLM integration',
      'OpenAI',
      'Anthropic',
      'Gemini',
      'Groq',
      'STT/TTS & Speech-to-Speech',
      'AES-256-GCM',
    ],
  },
  {
    category: 'Platform & tools',
    items: ['Git', 'Docker', 'GCP', 'Socket.io', 'Bun'],
  },
];

export const chatSuggestions: string[] = [
  'Tell me something about yourself',
  'What have you built?',
  'What is your tech stack?',
  'Where have you worked?',
  'How can I contact you?',
];
