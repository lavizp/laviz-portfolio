import { useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import {
  ArrowUpRight,
  ArrowRight,
  Plus,
  Minus,
  Terminal,
  FileText,
  LockKeyhole,
  ShieldCheck,
  Check,
  Sparkles,
} from 'lucide-react';
import {
  projects,
  experience,
  profile,
  skills,
  socials,
  education,
  type Project,
} from '@/data/portfolio';
import { writing } from '@/lib/posts';
import { useChat } from '@/hooks/use-chat';
import { useSlidingIndicator } from '@/hooks/use-sliding-indicator';

/** Stagger index, read by the reveal transitions in styles.css. */
const step = (index: number) => ({ '--i': index }) as CSSProperties;

export function Reveal({
  children,
  className = '',
  mode = 'up',
  index,
}: {
  children: ReactNode;
  className?: string;
  mode?: 'up' | 'rise' | 'lines';
  index?: number;
}) {
  return (
    <div
      className={className}
      data-reveal={mode}
      style={index === undefined ? undefined : step(index)}
    >
      {children}
    </div>
  );
}

/** A heading whose lines swing up out of their own clip box, one after another. */
export function Lines({ children }: { children: ReactNode[] }) {
  return (
    <>
      {children.map((line, index) => (
        <span className="line-mask" key={index}>
          <span className="line-in" style={step(index)}>
            {line}
          </span>
        </span>
      ))}
    </>
  );
}

function SectionHead({
  number,
  label,
  lines,
  copy,
}: {
  number: string;
  label: string;
  lines: ReactNode[];
  copy: string;
}) {
  return (
    <div className="section-head">
      <div>
        <div className="eyebrow" data-reveal="up">
          <span>{number}</span>
          {label}
        </div>
        <h2 data-reveal="lines">
          <Lines>{lines}</Lines>
        </h2>
      </div>
      <p data-reveal="up" style={step(1)}>
        {copy}
      </p>
    </div>
  );
}

/** Tab strip with a single pill that travels to the selected tab. */
function Tabs({
  items,
  active,
  onSelect,
}: {
  items: string[];
  active: number | null;
  onSelect: (index: number) => void;
}) {
  const ref = useSlidingIndicator<HTMLDivElement>('tab', active);
  return (
    <div className="demo-tabs" ref={ref}>
      {items.map((label, index) => (
        <button
          key={label}
          type="button"
          data-key={index}
          aria-pressed={active === index}
          onClick={() => onSelect(index)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

/** promptic in miniature: one keyboard-driven surface over notes, search and chat. */
function PrompticDemo() {
  const [active, setActive] = useState(0);
  const panes = [
    {
      label: 'Capture',
      entry: 'note  Ship the retry queue before Friday',
      lines: [
        '✓ saved · indexed · reminder set for Thu 18:00',
        'todos, notes and reminders all land in one store.',
      ],
    },
    {
      label: 'Search',
      entry: '/ retry queue',
      lines: [
        '01  Ship the retry queue before Friday      todo',
        '02  Queue drains out of order under load    note',
        'sqlite fts5 · 2 hits in 3ms',
      ],
    },
    {
      label: 'Ask',
      entry: '? what did I decide about retries',
      lines: [
        'You settled on exponential backoff capped at 30s,',
        'and wrote it down the same evening.',
      ],
    },
  ];
  return (
    <div className="exhibit terminal-exhibit">
      <div className="exhibit-bar">
        <Terminal size={16} />
        <span>A second brain in the terminal</span>
        <span className="demo-label">Concept demo</span>
      </div>
      <Tabs
        items={panes.map((pane) => pane.label)}
        active={active}
        onSelect={setActive}
      />
      <div className="terminal-screen" aria-live="polite">
        <span className="terminal-prompt">promptic ~ lavizp</span>
        <p key={active} className="demo-enter">
          <b>›</b> {panes[active].entry}
        </p>
        {panes[active].lines.map((line, index) => (
          <p
            key={line}
            className="terminal-result demo-enter"
            style={step(index + 1)}
          >
            {line}
          </p>
        ))}
        <span className="terminal-cursor" />
      </div>
      <div className="exhibit-caption">
        One store, four AI providers — OpenAI, Anthropic, Gemini, Groq.
      </div>
    </div>
  );
}

function DocsDemo() {
  const [active, setActive] = useState(0);
  return (
    <div className="exhibit docs-exhibit">
      <div className="exhibit-bar">
        <FileText size={16} />
        <span>From Markdown to workbench</span>
        <span className="demo-label">Concept demo</span>
      </div>
      <div className="docs-window">
        <aside>
          {['Introduction', 'Quick start', 'Components'].map((label, index) => (
            <button
              key={label}
              type="button"
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            >
              <FileText size={13} />
              {label}
            </button>
          ))}
        </aside>
        <div className="docs-page demo-enter" key={active}>
          <span className="eyebrow">STORYMARK / DOCS</span>
          <h4>
            {
              [
                'Good docs start here.',
                'Up and running.',
                'Every detail, together.',
              ][active]
            }
          </h4>
          <p>
            {
              [
                'Your Markdown. A little room to breathe.',
                'Point it at a folder. Get back to writing.',
                'A live workbench for the things you build.',
              ][active]
            }
          </p>
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
          <code>
            {
              [
                '# Hello, storymark',
                'npx storymark ./docs',
                '## Your next component',
              ][active]
            }
          </code>
          <div className="docs-callout">
            <Check size={16} /> Live preview. No configuration.
          </div>
        </div>
      </div>
      <div className="exhibit-caption">
        Choose a page. See the documentation take shape.
      </div>
    </div>
  );
}

/** confseal: the encrypted store is what gets committed, never the secrets. */
function ConfsealDemo() {
  const environments = ['development', 'staging', 'production'];
  const [active, setActive] = useState(0);
  const [sealed, setSealed] = useState(true);
  const environment = environments[active];
  return (
    <div className="exhibit seal-exhibit">
      <div className="exhibit-bar">
        <LockKeyhole size={16} />
        <span>Secrets that live in the repo, safely</span>
        <span className="demo-label">Concept demo</span>
      </div>
      <Tabs
        items={['Dev', 'Staging', 'Production']}
        active={active}
        onSelect={setActive}
      />
      <div className="seal-file">
        <div>
          <span>.env.{environment}</span>
          <button
            type="button"
            onClick={() => setSealed((value) => !value)}
            aria-pressed={sealed}
          >
            {sealed ? <LockKeyhole size={15} /> : <FileText size={15} />}
            {sealed ? 'Sealed' : 'Preview'}
          </button>
        </div>
        <pre aria-live="polite">
          {sealed
            ? 'AES-256-GCM\n\n••••••••••••••••••••••••\n••••••••••••••••••••••••\n••••••••••••••••••••••••'
            : `# Illustrative values only\nNODE_ENV=${environment}\nAPI_URL=https://example.com\nPORT=3000`}
        </pre>
      </div>
      <div className="git-status">
        <p>
          <ShieldCheck size={14} />
          <b>committed</b> .confseal/{environment}.enc
        </p>
        <p className="is-ignored">
          <span aria-hidden>—</span>
          <b>ignored</b> .env.{environment} · key
        </p>
      </div>
      <div className="exhibit-caption">
        Encrypted with Node’s native crypto. Zero config, keys stay out of Git.
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal className={`project-world world-${index}`} mode="rise">
      <article>
        <div className="project-meta">
          <span>{project.index} / 03</span>
          <span>{project.tag}</span>
          <span>{project.released}</span>
        </div>
        <div className="project-body">
          <div className="project-copy">
            <h3>
              {project.title}
              <span>.</span>
            </h3>
            <p>{project.description}</p>
            <ul className="project-tags">
              {project.tech.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <a
              className="pill-button"
              href={project.linkHref}
              target="_blank"
              rel="noreferrer"
            >
              {project.linkLabel === 'Live site'
                ? 'Explore the project'
                : 'View the source'}
              <ArrowUpRight size={18} />
            </a>
          </div>
          {index === 0 ? (
            <PrompticDemo />
          ) : index === 1 ? (
            <DocsDemo />
          ) : (
            <ConfsealDemo />
          )}
        </div>
      </article>
    </Reveal>
  );
}

function ExperienceRow({
  role,
  index,
}: {
  role: (typeof experience)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const panel = `role-panel-${index}`;
  return (
    <Reveal>
      <div className={`experience-row ${open ? 'is-open' : ''}`}>
        <button
          type="button"
          id={`${panel}-trigger`}
          aria-expanded={open}
          aria-controls={panel}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="role-index">0{index + 1}</span>
          <div>
            <h3>{role.role}</h3>
            <p>{role.company}</p>
          </div>
          <span className="role-period">
            {role.period}
            {role.current && (
              <small>
                <i className="live-dot" /> Current
              </small>
            )}
          </span>
          <span className="accordion-icon">
            <Plus className="plus" size={22} />
            <Minus className="minus" size={22} />
          </span>
        </button>
        <div
          className="role-wrap"
          id={panel}
          role="region"
          aria-labelledby={`${panel}-trigger`}
          aria-hidden={!open}
        >
          <div>
            <div className="role-detail">
              <span className="eyebrow">The work</span>
              <p>{role.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Marquee({ text, small = false }: { text: string[]; small?: boolean }) {
  return (
    <div className={small ? 'technology-marquee' : 'skill-band'}>
      <div className="marquee-track">
        {[0, 1].map((repeat) => (
          <div
            className="marquee-group"
            key={repeat}
            aria-hidden={repeat === 1 ? true : undefined}
          >
            {text.map((item) => (
              <span key={item}>
                {item}
                <i>✳</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const labPrompts = [
  {
    label: 'Tell me about Laviz’s projects',
    prompt: 'What projects have you worked on?',
  },
  { label: 'What does he build with?', prompt: 'What is your tech stack?' },
  { label: 'Where has he worked?', prompt: 'Where have you worked?' },
];

export function PortfolioHome() {
  const { openChat } = useChat();
  return (
    <div className="portfolio-content">
      <section id="work" className="wide-section work-section">
        <SectionHead
          number="01"
          label="Selected work"
          lines={['Less talk.', 'More built.']}
          copy="Three tools I built and published. A terminal second brain, a Markdown viewer on npm, and encrypted secrets that are safe to commit."
        />
        <div className="project-stack">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
        <Link className="text-link all-projects" to="/projects">
          All projects <ArrowUpRight size={18} />
        </Link>
      </section>
      <Marquee
        text={['TypeScript', 'Small tools', 'Open source', 'Built with intent']}
      />
      <section id="experience" className="wide-section experience-section">
        <SectionHead
          number="02"
          label="Experience"
          lines={['Where I’ve', 'been building.']}
          copy="Remote teams in Dubai, Sydney and Kathmandu. Open a role to see what I actually shipped."
        />
        <div className="experience-list">
          {experience.map((role, index) => (
            <ExperienceRow key={role.company} role={role} index={index} />
          ))}
        </div>
      </section>
      <section id="about" className="about-section">
        <div className="wide-section">
          <SectionHead
            number="03"
            label="About"
            lines={['The whole', 'way through.']}
            copy="Backend architecture, relational data, and the interface on top. I would rather own the whole path than half of it."
          />
          <div className="about-body">
            <h3 data-reveal="lines">
              <Lines>
                {[
                  'I own features',
                  <>
                    end to <span>end.</span>
                  </>,
                ]}
              </Lines>
            </h3>
            <div data-reveal="up" style={step(1)}>
              <p>{profile.bio}</p>
              <p className="about-education">
                {education.degree}
                <span>{education.period}</span>
              </p>
              <a
                className="text-link"
                href={socials.find((s) => s.icon === 'linkedin')?.href}
                target="_blank"
                rel="noreferrer"
              >
                Connect on LinkedIn <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
          <div className="capabilities">
            {skills.map((group, index) => (
              <Reveal key={group.category} index={index}>
                <span className="eyebrow">0{index + 1}</span>
                <h4>{group.category}</h4>
                <p>{group.items.join(', ')}.</p>
              </Reveal>
            ))}
          </div>
        </div>
        <Marquee small text={skills.flatMap((group) => group.items)} />
      </section>
      <section id="writing" className="wide-section writing-section">
        <SectionHead
          number="04"
          label="Writing"
          lines={['Notes from', 'the workbench.']}
          copy="What I learned building the things above — TypeScript, tooling, and the parts I had to relearn."
        />
        {writing.slice(0, 3).map((post, index) => (
          <Reveal key={post.slug} index={index}>
            <Link
              className="writing-row is-link"
              to="/writing/$post"
              params={{ post: post.slug }}
            >
              <span className="eyebrow">{post.category}</span>
              <h3>{post.title}</h3>
              <span>
                {post.readTime}
                <ArrowUpRight size={22} />
              </span>
            </Link>
          </Reveal>
        ))}
        <Link className="text-link all-writing" to="/writing">
          More writing <ArrowUpRight size={18} />
        </Link>
      </section>
      <section className="lab-section wide-section">
        <Reveal mode="rise">
          <div>
            <div className="eyebrow">
              <Sparkles size={15} />
              The lab
            </div>
            <h2>Still curious?</h2>
            <p>
              Ask the assistant about the stack, the work, or the person behind
              it.
            </p>
          </div>
          <div className="lab-prompts">
            {labPrompts.map((item) => (
              <button
                key={item.label}
                type="button"
                className="lab-prompt"
                onClick={() => openChat(item.prompt)}
              >
                <span>›</span>
                {item.label}
                <ArrowRight size={20} />
              </button>
            ))}
          </div>
        </Reveal>
      </section>
      <section id="contact" className="contact-section wide-section">
        <SectionHead
          number="05"
          label="Contact"
          lines={[
            'Let’s build',
            <>
              something <em>together.</em>
            </>,
          ]}
          copy="Hiring for a full-stack role, or have a product that needs owning end to end? I’d like to hear about it."
        />
        <Reveal className="contact-body">
          <div>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
              <ArrowUpRight />
            </a>
            <p>Based in Kathmandu. Open to a good conversation.</p>
            <div className="contact-status">
              <i className="live-dot" />
              {profile.availability} · Nepal / Remote
            </div>
          </div>
          <a className="pill-button" href={`mailto:${profile.email}`}>
            Start a conversation <ArrowRight size={18} />
          </a>
        </Reveal>
      </section>
    </div>
  );
}
