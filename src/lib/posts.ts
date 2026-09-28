import { marked } from 'marked';
import type { Token, Tokens } from 'marked';
// ─────────────────────────────────────────────────────────────
// Blog posts — one markdown file per post in src/content/posts/.
// The filename becomes the post slug (e.g. boring-cli-tools.md
// → /writing/boring-cli-tools).
//
// Frontmatter:
//   title, date (YYYY-MM-DD), category, excerpt  (required)
//   lead (optional intro paragraph)
//   readTime (optional minutes; auto-estimated if omitted)
//
// Body markdown:
//   ## Heading        → section + table-of-contents entry
//   paragraphs        → body text (**bold**, *italic*, `code`, [links](url))
//   ```lang caption="…"
//   $ command         → terminal figure ($ lines get the brand prompt)
//   ```
//   > quote           → pull-quote
//   - item            → bullet list
// ─────────────────────────────────────────────────────────────

export interface InlineSpan {
  type: 'text' | 'strong' | 'em' | 'code' | 'link' | 'del';
  text: string;
  href?: string;
}

export type PostBlock =
  | { type: 'heading'; id: string; text: string }
  | { type: 'paragraph'; spans: InlineSpan[] }
  | { type: 'code'; lang?: string; caption?: string; lines: string[] }
  | { type: 'blockquote'; spans: InlineSpan[] }
  | { type: 'list'; items: InlineSpan[][] };

export interface WritingPost {
  slug: string;
  title: string;
  dateISO: string;
  date: string;
  dateFull: string;
  year: number;
  category: string;
  readTime: string;
  excerpt: string;
  lead?: string;
  blocks: PostBlock[];
}

export interface PostSectionGroup {
  id?: string;
  heading?: string;
  blocks: PostBlock[];
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function parseFrontmatter(raw: string): {
  data: Record<string, string>;
  body: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) {
    throw new Error(
      'Post is missing frontmatter. Start the file with ---, then key: value lines, then --- again.',
    );
  }
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const separator = line.indexOf(':');
    if (separator === -1) {
      throw new Error(
        `Invalid frontmatter line: "${line}". Expected "key: value".`,
      );
    }
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    const quoted =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"));
    if (quoted && value.length >= 2) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body: raw.slice(match[0].length) };
}

function formatDate(iso: string): {
  date: string;
  dateFull: string;
  year: number;
} {
  const parts = iso.split('-').map(Number);
  const [year, month, day] = parts;
  if (!year || !month || !day || month < 1 || month > 12) {
    throw new Error(`Invalid date "${iso}". Expected YYYY-MM-DD.`);
  }
  return {
    date: `${String(day).padStart(2, '0')} ${MONTHS[month - 1].slice(0, 3)}`,
    dateFull: `${day} ${MONTHS[month - 1]} ${year}`,
    year,
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

type SpanStyle = { type: InlineSpan['type']; href?: string };

function toSpans(tokens: Token[] | undefined, style?: SpanStyle): InlineSpan[] {
  const spans: InlineSpan[] = [];
  if (!tokens) return spans;
  for (const token of tokens) {
    const nested = token as Tokens.Generic & { tokens?: Token[] };
    switch (token.type) {
      case 'text':
        if (nested.tokens?.length) {
          spans.push(...toSpans(nested.tokens, style));
        } else {
          spans.push({ ...(style ?? { type: 'text' }), text: token.text });
        }
        break;
      case 'strong':
        spans.push(...toSpans(nested.tokens, { ...style, type: 'strong' }));
        break;
      case 'em':
        spans.push(...toSpans(nested.tokens, { ...style, type: 'em' }));
        break;
      case 'del':
        spans.push(...toSpans(nested.tokens, { ...style, type: 'del' }));
        break;
      case 'link':
        spans.push(
          ...toSpans(nested.tokens, {
            ...style,
            type: 'link',
            href: (token as Tokens.Link).href,
          }),
        );
        break;
      case 'codespan':
        spans.push({ type: 'code', text: (token as Tokens.Codespan).text });
        break;
      case 'br':
        spans.push({ type: 'text', text: ' ' });
        break;
      case 'escape':
        spans.push({
          ...(style ?? { type: 'text' }),
          text: (token as Tokens.Escape).text,
        });
        break;
      case 'html':
        spans.push({ type: 'text', text: (token as Tokens.HTML).text });
        break;
      default:
        break;
    }
  }
  return spans;
}

function inlineTokensOf(blockTokens: Token[] | undefined): Token[] {
  return (
    blockTokens?.flatMap((block) =>
      block.type === 'paragraph'
        ? ((block as Tokens.Paragraph).tokens ?? [])
        : [],
    ) ?? []
  );
}

function toBlocks(markdown: string): PostBlock[] {
  const blocks: PostBlock[] = [];
  for (const token of marked.lexer(markdown.trim())) {
    switch (token.type) {
      case 'heading': {
        const heading = token as Tokens.Heading;
        blocks.push({
          type: 'heading',
          id: slugify(heading.text),
          text: heading.text,
        });
        break;
      }
      case 'paragraph':
        blocks.push({
          type: 'paragraph',
          spans: toSpans((token as Tokens.Paragraph).tokens),
        });
        break;
      case 'code': {
        const code = token as Tokens.Code;
        const info = code.lang ?? '';
        blocks.push({
          type: 'code',
          lang: info.split(/\s+/)[0] || undefined,
          caption: /caption="([^"]*)"/.exec(info)?.[1],
          lines: code.text.replace(/\n$/, '').split('\n'),
        });
        break;
      }
      case 'blockquote':
        blocks.push({
          type: 'blockquote',
          spans: toSpans(inlineTokensOf((token as Tokens.Blockquote).tokens)),
        });
        break;
      case 'list':
        blocks.push({
          type: 'list',
          items: ((token as Tokens.List).items ?? []).map((item) =>
            toSpans(inlineTokensOf(item.tokens)),
          ),
        });
        break;
      default:
        break;
    }
  }
  return blocks;
}

function countWords(blocks: PostBlock[]): number {
  let words = 0;
  const add = (spans: InlineSpan[]) => {
    words += spans
      .map((span) => span.text)
      .join(' ')
      .split(/\s+/)
      .filter(Boolean).length;
  };
  for (const block of blocks) {
    if (block.type === 'paragraph' || block.type === 'blockquote')
      add(block.spans);
    else if (block.type === 'list') block.items.forEach(add);
    else if (block.type === 'heading')
      words += block.text.split(/\s+/).filter(Boolean).length;
  }
  return words;
}

export function parsePost(path: string, raw: string): WritingPost {
  const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? path;
  const { data, body } = parseFrontmatter(raw);
  for (const key of ['title', 'date', 'category', 'excerpt'] as const) {
    if (!data[key]) {
      throw new Error(
        `Post "${path}" is missing required frontmatter field "${key}".`,
      );
    }
  }
  const { date, dateFull, year } = formatDate(data.date);
  const blocks = toBlocks(body);
  return {
    slug,
    title: data.title,
    dateISO: data.date,
    date,
    dateFull,
    year,
    category: data.category,
    readTime: data.readTime
      ? `${Number(data.readTime)} min read`
      : `${Math.max(1, Math.round(countWords(blocks) / 200))} min read`,
    excerpt: data.excerpt,
    lead: data.lead || undefined,
    blocks,
  };
}

export function groupSections(blocks: PostBlock[]): PostSectionGroup[] {
  const groups: PostSectionGroup[] = [];
  for (const block of blocks) {
    if (block.type === 'heading') {
      groups.push({ id: block.id, heading: block.text, blocks: [] });
    } else {
      if (groups.length === 0) groups.push({ blocks: [] });
      groups[groups.length - 1]!.blocks.push(block);
    }
  }
  return groups;
}

const files = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const writing: WritingPost[] = Object.entries(files)
  .map(([path, raw]) => parsePost(path, raw))
  .sort((a, b) => b.dateISO.localeCompare(a.dateISO));
