import { describe, expect, it } from 'vitest';
import { groupSections, parsePost, writing } from './posts';

describe('writing posts', () => {
  it('loads every markdown post, sorted newest first', () => {
    expect(writing.map((post) => post.slug)).toEqual([
      'boring-cli-tools',
      'generics-i-regret',
      'local-ai-notes',
      'shipping-storymark',
      'reading-codebase-deleting',
      'every-env-file-lost',
      'docs-before-code',
    ]);
  });

  it('derives metadata from frontmatter', () => {
    const post = writing.find((p) => p.slug === 'boring-cli-tools')!;
    expect(post.title).toBe('Why my CLI tools are boring on purpose');
    expect(post.date).toBe('12 Jun');
    expect(post.dateFull).toBe('12 June 2026');
    expect(post.year).toBe(2026);
    expect(post.readTime).toBe('7 min read');
    expect(post.category).toBe('Tools');
  });

  it('parses headings into slugged sections', () => {
    const post = writing.find((p) => p.slug === 'boring-cli-tools')!;
    const headings = post.blocks.filter((block) => block.type === 'heading');
    expect(headings).toEqual([
      {
        type: 'heading',
        id: 'the-cost-of-delight',
        text: 'The cost of delight',
      },
      { type: 'heading', id: 'guessable-flags', text: 'Guessable flags' },
      {
        type: 'heading',
        id: 'fail-loudly-exit-honestly',
        text: 'Fail loudly, exit honestly',
      },
    ]);
  });

  it('parses code figures with captions and keeps $ prompt lines', () => {
    const post = writing.find((p) => p.slug === 'shipping-storymark')!;
    const code = post.blocks.find((block) => block.type === 'code');
    expect(code).toEqual({
      type: 'code',
      lang: 'bash',
      caption: 'The entire feature list on one line.',
      lines: [
        '$ npx storymark ./docs',
        'watched 14 files · 3 components · 0 config',
      ],
    });
  });

  it('groups blocks into sections for rendering', () => {
    const post = writing.find((p) => p.slug === 'generics-i-regret')!;
    const sections = groupSections(post.blocks);
    expect(sections).toHaveLength(3);
    expect(sections[0]!.heading).toBe('The constraint that was too clever');
    expect(sections[0]!.blocks.some((block) => block.type === 'code')).toBe(
      true,
    );
    expect(
      sections[2]!.blocks.some((block) => block.type === 'blockquote'),
    ).toBe(true);
  });

  it('estimates read time when not provided', () => {
    const raw = [
      '---',
      'title: Test post',
      'date: 2026-01-01',
      'category: Testing',
      'excerpt: A test.',
      '---',
      '',
      '## One',
      '',
      Array.from({ length: 210 }, (_, i) => `word${i}`).join(' '),
    ].join('\n');
    const post = parsePost('test-post.md', raw);
    expect(post.readTime).toBe('1 min read');
    expect(post.dateFull).toBe('1 January 2026');
  });

  it('throws on missing required frontmatter', () => {
    expect(() => parsePost('broken.md', 'no frontmatter here')).toThrow();
    expect(() => parsePost('broken.md', '---\ntitle: X\n---\n\nBody.')).toThrow(
      /date/,
    );
  });
});
