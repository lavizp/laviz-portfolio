import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { useEffect } from 'react';
import { writing } from '@/data/portfolio';

export const Route = createFileRoute('/writing/$post')({
  beforeLoad: ({ params }) => {
    if (!writing.some((post) => post.slug === params.post)) {
      throw redirect({ to: '/writing' });
    }
  },
  component: PostPage,
});

const ghostLink =
  'inline-flex items-center gap-1.5 border-b-2 border-brand pb-px font-sans text-sm font-semibold text-brand hover:text-brand-700';

function PostPage() {
  const { post: slug } = Route.useParams();
  const index = writing.findIndex((post) => post.slug === slug);
  const post = writing[index];
  const previous = index > 0 ? writing[index - 1] : undefined;
  const next = index < writing.length - 1 ? writing[index + 1] : undefined;

  useEffect(() => {
    document.title = `${post.title} — lavizp`;
  }, [post]);

  return (
    <div className="mx-auto max-w-[900px] px-[clamp(20px,5vw,56px)]">
      <article className="pt-[clamp(44px,8vh,84px)]">
        <div className="modernist-label mb-[22px] flex flex-wrap items-center gap-[12px_18px] text-foreground/60 [font-feature-settings:'tnum'1]">
          <span>{post.dateFull}</span>
          <span aria-hidden className="size-2 flex-none bg-brand" />
          <span>{post.readTime}</span>
          <span aria-hidden className="size-2 flex-none bg-brand" />
          <span>{post.category}</span>
        </div>

        <h1 className="ml-[-0.058em] m-0 max-w-[22ch] font-sans text-[clamp(34px,5.6vw,62px)] font-extrabold leading-[1.02] tracking-[-0.03em]">
          {post.title}
        </h1>

        {post.lead && (
          <p className="mt-[clamp(24px,4vw,36px)] m-0 max-w-[46ch] text-[19px] leading-8 text-foreground/88">
            {post.lead}
          </p>
        )}

        <hr className="mt-[clamp(32px,5vw,48px)] h-0.5 border-0 bg-divider" />

        <div className="grid grid-cols-1 items-start gap-y-10 pt-[clamp(32px,5vw,44px)] sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:gap-[0_clamp(24px,5vw,56px)]">
          <aside className="flex flex-col gap-2.5 sm:sticky sm:top-[72px]">
            <span className="modernist-label text-foreground/55">
              In this post
            </span>
            {post.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="border-b border-brand/45 pb-px text-[14px] leading-6 text-foreground/70 transition-colors hover:text-brand-700"
              >
                {section.heading}
              </a>
            ))}
          </aside>

          <div className="flex max-w-[62ch] flex-col gap-7">
            {post.sections.map((section, sectionIndex) => (
              <div key={section.id}>
                <h2
                  id={section.id}
                  className="mt-3 m-0 scroll-mt-24 font-sans text-[clamp(24px,2.8vw,30px)] font-extrabold leading-[1.14] tracking-[-0.015em]"
                >
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className={`m-0 text-[17px] leading-[30px] ${
                      paragraphIndex > 0 ? 'mt-4 text-foreground/82' : 'mt-4'
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}

                {post.code && sectionIndex === 0 && (
                  <figure className="m-0 mt-6">
                    <div className="flex flex-col gap-1.5 bg-foreground px-[22px] py-5 text-[14px] leading-6 text-background [overflow-wrap:anywhere]">
                      {post.code.lines.map((line, lineIndex) =>
                        line.startsWith('$') ? (
                          <span key={lineIndex}>
                            <span className="text-brand-300">$</span>
                            {line.slice(1)}
                          </span>
                        ) : (
                          <span key={lineIndex} className="text-background/70">
                            {line}
                          </span>
                        ),
                      )}
                    </div>
                    {post.code.caption && (
                      <figcaption className="mt-3 text-[13px] leading-[22px] text-foreground/62">
                        {post.code.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {post.blockquote &&
                  post.blockquoteSection === section.id && (
                    <blockquote className="mt-4 max-w-[34ch] border-l-2 border-brand pl-6 font-sans text-[clamp(20px,2.4vw,26px)] font-extrabold leading-[1.3] tracking-[-0.015em]">
                      {post.blockquote}
                    </blockquote>
                  )}
              </div>
            ))}
          </div>
        </div>
      </article>

      <div className="mt-[clamp(44px,6vw,64px)] grid grid-cols-1 gap-y-6 border-t-2 border-divider pt-[26px] sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] sm:gap-[20px_clamp(24px,5vw,56px)]">
        <div className="flex flex-col gap-2">
          <span className="modernist-label text-foreground/55">Previous</span>
          <h3 className="m-0 font-sans text-[18px] font-extrabold leading-[26px] tracking-[-0.01em]">
            {previous ? (
              <Link
                to="/writing/$post"
                params={{ post: previous.slug }}
                className="transition-colors hover:text-brand-700"
              >
                {previous.title}
              </Link>
            ) : (
              <span className="text-foreground/40">—</span>
            )}
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          <span className="modernist-label text-foreground/55">Next</span>
          <h3 className="m-0 font-sans text-[18px] font-extrabold leading-[26px] tracking-[-0.01em]">
            {next ? (
              <Link
                to="/writing/$post"
                params={{ post: next.slug }}
                className="transition-colors hover:text-brand-700"
              >
                {next.title}
              </Link>
            ) : (
              <span className="text-foreground/40">—</span>
            )}
          </h3>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 pb-[clamp(32px,5vw,44px)] pt-[clamp(32px,5vw,44px)]">
        <Link to="/writing" className={ghostLink}>
          ← All writing
        </Link>
      </div>
    </div>
  );
}