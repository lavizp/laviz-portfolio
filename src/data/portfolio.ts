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

export interface PostSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface PostCodeFigure {
  lines: string[];
  caption?: string;
}

export interface WritingPost {
  slug: string;
  title: string;
  date: string;
  dateFull: string;
  year: number;
  category: string;
  readTime: string;
  excerpt: string;
  lead?: string;
  code?: PostCodeFigure;
  blockquote?: string;
  blockquoteSection?: string;
  sections: PostSection[];
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
  bio: "I go by lavizp most places online. Days are spent writing TypeScript; evenings are spent building the small things around it — CLIs that do one job, documentation tooling that gets out of the way, and the occasional experiment that never leaves my machine. Everything I ship is something I use myself, which is the only quality bar I really trust.",
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
    demo: 'https://spot-the-code-web.vercel.app'
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

export const writing: WritingPost[] = [
  {
    slug: 'boring-cli-tools',
    title: 'Why my CLI tools are boring on purpose',
    date: '12 Jun',
    dateFull: '12 June 2026',
    year: 2026,
    category: 'Tools',
    readTime: '7 min read',
    excerpt:
      'Flags you can guess, output you can pipe, and no spinner that hides what went wrong. A short defence of tools that behave like the ones from 1994.',
    lead: 'Flags you can guess, output you can pipe, and no spinner that hides what went wrong. A short defence of tools that behave like the ones from 1994.',
    code: {
      lines: [
        '$ promptic add "boring tools ship"',
        'wrote notes/2026-06-12.md (+1 line)',
        'indexed in 12ms',
      ],
      caption: 'Two lines of output. Both greppable, both true.',
    },
    blockquote:
      'A tool that surprises you once has a bug. A tool that surprises you twice has a design.',
    blockquoteSection: 'two',
    sections: [
      {
        id: 'one',
        heading: 'The cost of delight',
        paragraphs: [
          'Every tool I have written started with a moment of irritation: something that should have taken one command took nine minutes and a browser tab. The fix is rarely clever. It is usually a smaller program that does exactly one thing and then gets out of the way.',
          'Animated progress bars are lovely until the process hangs and you have no idea which of eleven steps you are on. Colour is lovely until it lands in a log file as escape codes. Most of what we call polish in a CLI is decoration paid for by the person debugging it at 2am — often me, six months later.',
          'So promptic prints lines. One per thing that happened, in the order it happened, with a timestamp when it matters.',
        ],
      },
      {
        id: 'two',
        heading: 'Guessable flags',
        paragraphs: [
          "If a user has to read the help text twice, the naming is wrong. I steal from tools people already know — --dry-run, --json, -v — because familiarity is a feature nobody has to document.",
        ],
      },
      {
        id: 'three',
        heading: 'Fail loudly, exit honestly',
        paragraphs: [
          'Non-zero exit codes, errors on stderr, and never a caught exception that pretends everything is fine. confseal refuses to write a partial env file; it would rather stop and tell you which key it could not decrypt.',
          "None of this is innovation. It is just the boring contract that lets a small tool live in someone else's pipeline for years without maintenance — which is the only kind of success an evening project can really have.",
        ],
      },
    ],
  },
  {
    slug: 'generics-i-regret',
    title: 'Typing the untypeable: generics I regret',
    date: '28 Apr',
    dateFull: '28 April 2026',
    year: 2026,
    category: 'TypeScript',
    readTime: '6 min read',
    excerpt:
      'Three signatures from confseal that were clever, correct and completely unreadable — and what I replaced them with.',
    lead: 'The type system does not reward cleverness. It rewards signatures your future self can read at a glance.',
    code: {
      lines: [
        'type Decrypt<T extends KeySpec, S extends Source> =',
        '  T extends { age: infer A } ? A extends number ? A : never : never;',
      ],
      caption: 'Correct. Also completely unreadable.',
    },
    sections: [
      {
        id: 'one',
        heading: 'The constraint that was too clever',
        paragraphs: [
          'confseal encrypts env files with age-based keys, which sounds simple until you try to type it. My first pass encoded the whole key lifecycle into one conditional type. It passed the tests. It passed review. Nobody, including me a month later, could say what it did.',
          'The type was not wrong. It was just doing the compiler\'s job of explaining itself, badly.',
        ],
      },
      {
        id: 'two',
        heading: 'What I replaced it with',
        paragraphs: [
          'Three small interfaces, one union, and a function that returns a discriminated union. The conditional type became a plain lookup. Everything got more verbose and infinitely more honest.',
        ],
      },
      {
        id: 'three',
        heading: 'The lesson',
        paragraphs: [
          'A clever type is a bug report about the data shape. If the shape needs that much ceremony to describe, the shape is the problem — not the type.',
        ],
      },
    ],
    blockquote:
      'The type that took a week to write will take a month to maintain.',
    blockquoteSection: 'three',
  },
  {
    slug: 'local-ai-notes',
    title: 'A local AI that only reads my notes',
    date: '09 Mar',
    dateFull: '9 March 2026',
    year: 2026,
    category: 'Tools',
    readTime: '8 min read',
    excerpt:
      "How promptic keeps its context small: no crawling, no embeddings I can't inspect, and one plaintext folder as the only source of truth.",
    lead: 'An AI assistant is only as good as the context you give it. The trick is deciding what never goes in.',
    code: {
      lines: ['$ promptic search "why did i set the timeout"', 'notes/2024-11-03.md', 'notes/2025-02-14.md'],
      caption: 'Two answers, both from files I can open and read myself.',
    },
    sections: [
      {
        id: 'one',
        heading: 'One folder is the whole corpus',
        paragraphs: [
          'No crawling, no database, no embedding index I cannot inspect. promptic reads the notes folder, period. What is not in the folder does not exist to the model, and that is the point.',
        ],
      },
      {
        id: 'two',
        heading: 'Small context, honest answers',
        paragraphs: [
          'Because the context is small, the answers stay close to what I actually wrote. The model paraphrases my own notes back to me — which turns out to be exactly what I wanted when I searched for something I had forgotten.',
        ],
      },
      {
        id: 'three',
        heading: 'Why this beats a general assistant',
        paragraphs: [
          "A general assistant answers from everyone's memory. Mine answers from mine. For the question 'why did I set that timeout', only one of those has the right answer.",
        ],
      },
    ],
  },
  {
    slug: 'shipping-storymark',
    title: 'Shipping storymark: a docs tool in a weekend',
    date: '02 Feb',
    dateFull: '2 February 2026',
    year: 2026,
    category: 'Tools',
    readTime: '5 min read',
    excerpt:
      'What I cut to finish it — themes, plugins, config — and why the version with none of them is the one people use.',
    lead: 'The weekend version shipped. The one with themes and plugins never would have.',
    code: {
      lines: ['$ npx storymark ./docs', 'watched 14 files · 3 components · 0 config'],
      caption: 'The entire feature list on one line.',
    },
    sections: [
      {
        id: 'one',
        heading: 'Everything I cut',
        paragraphs: [
          'Themes, plugins, a config file, routing options, syntax highlighting themes. Each one was a good idea. Each one was a reason to not ship on Sunday night.',
        ],
      },
      {
        id: 'two',
        heading: 'What survived',
        paragraphs: [
          'A folder, a port, and a live-reloading preview. That is it. The version with none of the good ideas is the one people actually use, because there is nothing to learn before it is useful.',
        ],
      },
      {
        id: 'three',
        heading: 'Cutting is the feature',
        paragraphs: [
          'Every feature has a maintenance cost that outlives the feature. Shipping nothing but the core means the core gets maintained forever.',
        ],
      },
    ],
  },
  {
    slug: 'reading-codebase-deleting',
    title: 'Reading a codebase by deleting it',
    date: '17 Nov',
    dateFull: '17 November 2025',
    year: 2025,
    category: 'Process',
    readTime: '6 min read',
    excerpt:
      'Delete a file. Run the tests. Delete the next file. The code that survives is the code you can prove matters.',
    lead: 'The fastest way to understand a codebase is to try to make it smaller.',
    sections: [
      {
        id: 'one',
        heading: 'Delete one file',
        paragraphs: [
          'Run the tests. If they pass, that file was already dead — the codebase was smaller than you thought. If they fail, read the failure, restore the file, and you have learned exactly what it was for.',
        ],
      },
      {
        id: 'two',
        heading: 'Delete until it breaks',
        paragraphs: [
          'Repeat until the suite stops passing. What survives is the minimum viable surface of the system, and that surface is the part worth reading closely.',
        ],
      },
      {
        id: 'three',
        heading: 'What you get',
        paragraphs: [
          'A map. Not of every file, but of the ones that matter — the ones no test will let you remove. That is the code you need to understand first.',
        ],
      },
    ],
  },
  {
    slug: 'every-env-file-lost',
    title: 'Every .env file I have ever lost',
    date: '30 Aug',
    dateFull: '30 August 2025',
    year: 2025,
    category: 'Tools',
    readTime: '4 min read',
    excerpt:
      'Three lost staging configs, one accidental paste into a public gist, and the morning I decided to write confseal.',
    lead: 'Nobody loses an .env file once. The third time you start writing the tool.',
    sections: [
      {
        id: 'one',
        heading: 'The three losses',
        paragraphs: [
          'A laptop reinstall, a deleted branch, and a staging config that got overwritten by a teammate\'s local copy. Three different failure modes, one common thread: the secrets lived in exactly one place.',
        ],
      },
      {
        id: 'two',
        heading: 'The paste',
        paragraphs: [
          'Then the morning I pasted a production key into a public gist and watched it get indexed before I could delete it. That was the morning confseal got its first commit.',
        ],
      },
      {
        id: 'three',
        heading: 'Encrypt, share, switch',
        paragraphs: [
          'Confseal keeps env files encrypted per project, lets you share them by key, and switches between them without a single paste into chat. Three jobs, one tool, no accounts.',
        ],
      },
    ],
  },
  {
    slug: 'docs-before-code',
    title: 'Notes on writing docs before code',
    date: '14 May',
    dateFull: '14 May 2025',
    year: 2025,
    category: 'Process',
    readTime: '5 min read',
    excerpt:
      'The README is a contract, not a summary. Write it first and the code tends to agree.',
    lead: 'A README written after the code describes what happened. A README written before it describes what was wanted.',
    sections: [
      {
        id: 'one',
        heading: 'The README as contract',
        paragraphs: [
          'When the README comes first, it is a spec with the confidence problem solved: you can read it back and ask whether the tool would be worth using if it did exactly what it says.',
        ],
      },
      {
        id: 'two',
        heading: 'The code tends to agree',
        paragraphs: [
          'Writing the docs first means the flags, the outputs and the edge cases are decided before the implementation exists. The code then has somewhere to be wrong, which is the best you can ask of any implementation.',
        ],
      },
      {
        id: 'three',
        heading: 'When to skip it',
        paragraphs: [
          'Prototypes get the README after. Tools get it before. The difference is whether anything depends on the tool staying the same next week.',
        ],
      },
    ],
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
