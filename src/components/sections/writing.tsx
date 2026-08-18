import { Link } from '@tanstack/react-router';
import { writing } from '@/data/portfolio';
import { PostRow } from '@/components/sections/post-row';

export function Writing() {
  const featured = writing.filter((post) => post.year === 2026).slice(0, 3);

  return (
    <section id="writing" className="pb-14 pt-10">
      <span className="modernist-label mb-2.5 block text-foreground/60">
        Writing
      </span>

      <div className="flex flex-col">
        {featured.map((post, index) => (
          <PostRow
            key={post.slug}
            post={post}
            variant="landing"
            isLast={index === featured.length - 1}
          />
        ))}
      </div>

      <div className="mt-7 flex">
        <Link
          to="/writing"
          className="inline-flex items-center gap-1.5 border-b-2 border-brand pb-px font-sans text-sm font-semibold text-brand hover:text-brand-700"
        >
          More writing →
        </Link>
      </div>
    </section>
  );
}