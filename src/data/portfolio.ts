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

/** A project on the /projects page — everything beyond the three showcased. */
export interface OtherProject {
  title: string;
  kind: string;
  year: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
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
    tag: 'TUI · Bun',
    title: 'promptic',
    description:
      'A keyboard-driven terminal second brain. AI chat, todos, notes and reminders in one persistent TUI, with a local search index over all of it and reminders you can schedule in plain language.',
    detail:
      'SQLite FTS5 under the hood, and four AI providers behind one interface — OpenAI, Anthropic, Gemini and Groq.',
    command: 'promptic',
    linkLabel: 'Source',
    linkHref: 'https://github.com/lavizp/promptic',
    status: 'Active',
    released: '2025',
    tech: ['TypeScript', 'Bun', 'SQLite', 'OpenTUI'],
    github: 'https://github.com/lavizp/promptic',
    featured: true,
  },
  {
    index: '02',
    tag: 'npm · TypeScript',
    title: 'storymark',
    description:
      'A published npm package that renders a folder of local Markdown as a styled, browsable viewer. Point it at your docs and get a live frontend — no config, no framework opinions.',
    detail:
      'Built by cutting themes, plugins and configuration. That version is the one people use.',
    command: 'npm install @lavizp/storymark',
    linkLabel: 'Live site',
    linkHref: 'https://storymark.lavizpandey.com.np/',
    status: 'Active',
    released: '2026',
    tech: ['TypeScript', 'Next.js', 'Vite', 'npm'],
    github: 'https://github.com/lavizp/storymark',
    demo: 'https://storymark.lavizpandey.com.np/',
    featured: true,
  },
  {
    index: '03',
    tag: 'CLI · Cryptography',
    title: 'confseal',
    description:
      'An npm CLI that keeps per-environment secrets inside the repository, encrypted with AES-256-GCM. The encrypted store is committed; the raw secrets and keys never are.',
    detail:
      'Built on Node’s native crypto module. Zero-config setup, with keys supplied by file or environment variable.',
    command: 'confseal pull staging',
    linkLabel: 'Source',
    linkHref: 'https://github.com/lavizp/confseal',
    status: 'Active',
    released: '2026',
    tech: ['Node.js', 'TypeScript', 'npm', 'AES-256-GCM'],
    github: 'https://github.com/lavizp/confseal',
    featured: true,
  },
];

export const otherProjects: OtherProject[] = [
  {
    title: 'grindOS',
    kind: 'Web app · PWA',
    year: '2026',
    description:
      'A private, local-first tracker for workouts, sleep and spending on iPhone. Everything stays on the device in IndexedDB — no account, no server — and it installs to the Home Screen and works offline.',
    tech: ['TypeScript', 'IndexedDB', 'PWA'],
    github: 'https://github.com/lavizp/grindOS',
    demo: 'https://grind-os-red.vercel.app',
  },
  {
    title: 'l3.code',
    kind: 'Developer tool',
    year: '2026',
    description:
      'A local web pane for the skills your coding agents read. Every SKILL.md on the machine in one list, each row showing which agents — Claude Code, Codex — can actually see it, and opening into an editor.',
    tech: ['TypeScript', 'Bun', 'WebSocket', 'MongoDB'],
    github: 'https://github.com/lavizp/l3.code',
  },
  {
    title: 'dependency-visualiser',
    kind: 'npm · CLI',
    year: '2025',
    description:
      'Prints your node_modules as a tree, so you can see how packages nest and where a dependency came from. Nothing to install — run it with npx.',
    tech: ['JavaScript', 'Node.js', 'npm'],
    github: 'https://github.com/lavizp/dependency-visualiser',
  },
  {
    title: 'Spot The Code',
    kind: 'Web game',
    year: '2026',
    description:
      'Geoguessr for programmers. Guess the origin, language or context of a code snippet. A Bun monorepo with the API layer kept apart from the web app.',
    tech: ['TypeScript', 'TanStack Start', 'Tailwind CSS', 'Bun'],
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
    title: 'nvim',
    year: '2026',
    description: 'My Neovim setup, built on LazyVim.',
    tech: ['Lua'],
    github: 'https://github.com/lavizp/nvim',
  },
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
  {
    title: 'Personal blog',
    year: '2022',
    description: 'A personal blog site, on the MERN stack.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    github: 'https://github.com/lavizp/personal-blog',
  },
  {
    title: 'Exercise tracker',
    year: '2022',
    description: 'An exercise tracking app, on the MERN stack.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    github: 'https://github.com/lavizp/ExerciseTracker-MERN',
  },
  {
    title: 'Circular scroll',
    year: '2022',
    description: 'A dynamic circular scroll view for Unity.',
    tech: ['Unity', 'C#'],
    github: 'https://github.com/lavizp/Circular-Scroll',
  },
  {
    title: 'GetFlix',
    year: '2022',
    description: 'A Netflix redesign, in plain HTML, CSS and JavaScript.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/lavizp/GetFlix-NetflixClone',
  },
  {
    title: 'LearningDSA',
    year: '2022',
    description: 'Learning data structures and algorithms.',
    tech: ['JavaScript'],
    github: 'https://github.com/lavizp/LearningDSA',
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
