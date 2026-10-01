import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { groupSections, writing } from '@/lib/posts';
import type { InlineSpan, PostBlock } from '@/lib/posts';
import { Lines } from '@/components/sections/portfolio-home';

export const Route = createFileRoute('/writing/$post')({
  beforeLoad: ({ params }) => {
    if (!writing.some((post) => post.slug === params.post)) {
      throw redirect({ to: '/writing' });
    }
  },
  component: PostPage,
});

function Inline({ spans }: { spans: InlineSpan[] }) {
  return (
    <>
      {spans.map((span, index) => {
        switch (span.type) {
          case 'strong':
            return <strong key={index}>{span.text}</strong>;
          case 'em':
            return <em key={index}>{span.text}</em>;
          case 'code':
            return <code key={index}>{span.text}</code>;
          case 'link':
            return (
              <a key={index} href={span.href} target="_blank" rel="noreferrer">
                {span.text}
              </a>
            );
          case 'del':
            return <del key={index}>{span.text}</del>;
          default:
            return <span key={index}>{span.text}</span>;
        }
      })}
    </>
  );
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p>
          <Inline spans={block.spans} />
        </p>
      );
    case 'code':
      return (
        <figure className="article-code">
          <pre>
            {block.lines.map((line) => (
              <span key={line}>
                {line.startsWith('$') ? (
                  <>
                    <b>$</b>
                    {line.slice(1)}
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </pre>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case 'blockquote':
      return (
        <blockquote>
          <Inline spans={block.spans} />
        </blockquote>
      );
    case 'list':
      return (
        <ul>
          {block.items.map((item, index) => (
            <li key={index}>
              <Inline spans={item} />
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

function PostPage() {
  const { post: slug } = Route.useParams();
  const index = writing.findIndex((post) => post.slug === slug);
  const post = writing[index]!;
  const previous = index > 0 ? writing[index - 1] : undefined;
  const next = index < writing.length - 1 ? writing[index + 1] : undefined;
  const sections = groupSections(post.blocks);

  useEffect(() => {
    document.title = `${post.title} — Laviz Pandey`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [post]);

  return (
    <div className="wide-section article-page">
      <article>
        <header className="article-head">
          <div className="eyebrow" data-reveal="up">
            <span>{post.category}</span>
            {post.dateFull} · {post.readTime}
          </div>
          <h1 data-reveal="lines">
            <Lines>{[post.title]}</Lines>
          </h1>
          {post.lead && (
            <p
              className="article-lead"
              data-reveal="up"
              style={{ ['--i' as string]: 1 }}
            >
              {post.lead}
            </p>
          )}
        </header>

        <div className="article-body">
          <aside className="article-toc">
            <span className="eyebrow">In this post</span>
            {sections.map(
              (section) =>
                section.heading &&
                section.id && (
                  <a key={section.id} href={`#${section.id}`}>
                    {section.heading}
                  </a>
                ),
            )}
          </aside>

          <div className="article-prose">
            {sections.map((section, sectionIndex) => (
              <section key={section.id ?? `intro-${sectionIndex}`}>
                {section.heading && section.id && (
                  <h2 id={section.id}>{section.heading}</h2>
                )}
                {section.blocks.map((block, blockIndex) => (
                  <Block key={blockIndex} block={block} />
                ))}
              </section>
            ))}
          </div>
        </div>
      </article>

      <nav className="article-nav" aria-label="More posts">
        {[
          { label: 'Previous', post: previous },
          { label: 'Next', post: next },
        ].map((item) => (
          <div key={item.label}>
            <span className="eyebrow">{item.label}</span>
            {item.post ? (
              <Link to="/writing/$post" params={{ post: item.post.slug }}>
                {item.post.title}
                <ArrowUpRight size={18} />
              </Link>
            ) : (
              <span className="article-nav-empty">Nothing here</span>
            )}
          </div>
        ))}
      </nav>

      <Link className="text-link article-back" to="/writing">
        <ArrowLeft size={18} /> All writing
      </Link>
    </div>
  );
}
