import { useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import {
  ArrowUpRight,
  ArrowRight,
  Plus,
  Minus,
  FileText,
  LockKeyhole,
  ShieldCheck,
  Check,
  Sparkles,
  Activity,
  BookOpen,
  Moon,
  RotateCcw,
  TrendingUp,
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

/** grindOS in miniature: three logs, kept on the phone. */
function GrindDemo() {
  const [active, setActive] = useState(0);
  return (
    <div className="exhibit grind-exhibit">
      <div className="exhibit-bar">
        <Activity size={16} />
        <span>Training, sleep and spending, on the device</span>
        <span className="demo-label">Concept demo</span>
      </div>
      <Tabs
        items={['Workouts', 'Sleep', 'Spending']}
        active={active}
        onSelect={setActive}
      />
      <div className="grind-screen" aria-live="polite">
        {active === 0 && (
          <div className="demo-enter" key="workouts">
            <div className="grind-head">
              <span>Push</span>
              <small>From template</small>
            </div>
            <ul className="grind-sets">
              {[
                ['Bench press', '3 × 8', '60 kg', true],
                ['Overhead press', '3 × 8', '35 kg', false],
                ['Incline dumbbell', '3 × 10', '22 kg', false],
              ].map(([name, sets, load, record], index) => (
                <li
                  key={name as string}
                  className="demo-enter"
                  style={step(index + 1)}
                >
                  <span>{name}</span>
                  <span>{sets}</span>
                  <b>{load}</b>
                  {record ? <em>PR</em> : <i />}
                </li>
              ))}
            </ul>
            <p className="grind-note">
              <RotateCcw size={14} /> Repeat last session
            </p>
          </div>
        )}
        {active === 1 && (
          <div className="demo-enter" key="sleep">
            <div className="grind-head">
              <span>Last night</span>
              <small>23:40 → 07:10</small>
            </div>
            <p className="grind-figure">
              7h 30m <small>of an 8h target</small>
            </p>
            <div className="grind-meter" aria-hidden="true">
              <span style={{ width: '94%' }} />
            </div>
            <p className="grind-note">
              <Moon size={14} /> Bedtime within 20 minutes on 5 of 7 nights
            </p>
          </div>
        )}
        {active === 2 && (
          <div className="demo-enter" key="spending">
            <div className="grind-head">
              <span>This month</span>
              <small>By category</small>
            </div>
            <ul className="grind-bars">
              {[
                ['Food', 64],
                ['Transport', 38],
                ['Other', 21],
              ].map(([label, width], index) => (
                <li key={label} className="demo-enter" style={step(index + 1)}>
                  <span>{label}</span>
                  <i style={{ width: `${width}%` }} />
                </li>
              ))}
            </ul>
            <p className="grind-note">
              <TrendingUp size={14} /> Food spending is up 30% on last month
            </p>
          </div>
        )}
      </div>
      <div className="exhibit-caption">
        Illustrative entries. In the app, nothing leaves the phone.
      </div>
    </div>
  );
}

const agentSkills = [
  {
    name: 'release-notes',
    description: 'Draft release notes from the merged pull requests.',
    agents: ['Claude Code', 'Codex'],
    paths: ['~/.claude/skills/release-notes', '~/.codex/skills/release-notes'],
    note: 'One file, symlinked into both. One row, two badges.',
  },
  {
    name: 'db-migrations',
    description: 'Write a Drizzle migration and check it runs.',
    agents: ['Claude Code'],
    paths: ['api/.claude/skills/db-migrations'],
    note: 'Lives in one repository, so only that project sees it.',
  },
  {
    name: 'review-checklist',
    description: 'Walk a diff against the team’s review checklist.',
    agents: ['Codex'],
    paths: ['~/.codex/skills/review-checklist'],
    note: 'Claude Code does not look here, and the row says so.',
  },
];

/** l3.code in miniature: every skill, and which agents can actually see it. */
function SkillsDemo() {
  const [active, setActive] = useState(0);
  const skill = agentSkills[active];
  return (
    <div className="exhibit docs-exhibit skills-exhibit">
      <div className="exhibit-bar">
        <BookOpen size={16} />
        <span>The skills your coding agents read</span>
        <span className="demo-label">Concept demo</span>
      </div>
      <div className="docs-window">
        <aside>
          {agentSkills.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            >
              <span>{item.name}</span>
              <span className="skill-dots" aria-hidden="true">
                {item.agents.map((agent) => (
                  <i key={agent} data-agent={agent} />
                ))}
              </span>
            </button>
          ))}
        </aside>
        <div className="docs-page demo-enter" key={active}>
          <span className="eyebrow">SKILL.md</span>
          <h4>{skill.name}</h4>
          <code>
            ---
            <br />
            name: {skill.name}
            <br />
            description: {skill.description}
            <br />
            ---
          </code>
          <div className="skill-badges">
            {skill.agents.map((agent) => (
              <span key={agent} data-agent={agent}>
                <Check size={13} /> {agent}
              </span>
            ))}
          </div>
          <ul className="skill-paths">
            {skill.paths.map((path) => (
              <li key={path}>{path}</li>
            ))}
          </ul>
          <p>{skill.note}</p>
        </div>
      </div>
      <div className="exhibit-caption">
        Illustrative skills. Choose one to see who can read it.
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

const demos: Record<string, () => ReactNode> = {
  grindOS: GrindDemo,
  confseal: ConfsealDemo,
  'l3.code': SkillsDemo,
};

function ProjectCard({ project }: { project: Project }) {
  const Demo = demos[project.title];
  return (
    <Reveal className={`project-world world-${project.tone}`} mode="rise">
      <article>
        <div className="project-meta">
          <span>
            {project.index} / {String(projects.length).padStart(2, '0')}
          </span>
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
              {project.linkLabel}
              <ArrowUpRight size={18} />
            </a>
          </div>
          {Demo && <Demo />}
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
          copy="Three things I built and use. A private tracker for training, sleep and spending, encrypted secrets that are safe to commit, and one place to see what your coding agents know."
        />
        <div className="project-stack">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
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
