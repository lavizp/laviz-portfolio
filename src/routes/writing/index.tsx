import { createFileRoute, Link } from '@tanstack/react-router';
import { PageHeader } from '@/components/sections/page-header';
import { PostRow } from '@/components/sections/post-row';
import { writing } from '@/lib/posts';

export const Route = createFileRoute('/writing/')({
  component: WritingIndexPage,
});

const ghostLink =
  'inline-flex items-center gap-1.5 border-b-2 border-brand pb-px font-sans text-sm font-semibold text-brand hover:text-brand-700';

function WritingIndexPage() {
  const current = writing.filter((post) => post.year === 2026);
  const archive = writing.filter((post) => post.year !== 2026);

  return (
    <div className="mx-auto max-w-[900px] px-[clamp(20px,5vw,56px)]">
      <PageHeader
        title="Writing"
        intro="Notes on building small tools, the parts of TypeScript I keep relearning, and the occasional post about why I deleted a feature."
      />

      <section className="pt-[clamp(40px,6vw,64px)]">
        <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-[10px_32px]">
          <span className="modernist-label text-foreground/60 [font-feature-settings:'tnum'1]">
            2026
          </span>
          <span className="modernist-label text-foreground/55 [font-feature-settings:'tnum'1]">
            Four posts
          </span>
        </div>

        {current.map((post, index) => (
          <PostRow
            key={post.slug}
            post={post}
            variant="full"
            isLast={index === current.length - 1}
          />
        ))}
      </section>

      <section className="pt-[clamp(40px,6vw,60px)]">
        <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-[10px_32px]">
          <span className="modernist-label text-foreground/60 [font-feature-settings:'tnum'1]">
            2025
          </span>
          <span className="modernist-label text-foreground/55 [font-feature-settings:'tnum'1]">
            Archive
          </span>
        </div>

        {archive.map((post, index) => (
          <PostRow
            key={post.slug}
            post={post}
            variant="compact"
            isLast={index === archive.length - 1}
          />
        ))}
      </section>

      <div className="flex flex-wrap gap-4 pb-[clamp(36px,5vw,52px)] pt-[clamp(36px,5vw,52px)]">
        <Link to="/" className={ghostLink}>
          ← Back home
        </Link>
        <a href="#" className={ghostLink}>
          RSS
        </a>
      </div>
    </div>
  );
}
