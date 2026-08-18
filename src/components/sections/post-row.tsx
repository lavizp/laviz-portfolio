import { Link } from '@tanstack/react-router';
import type { WritingPost } from '@/data/portfolio';

interface PostRowProps {
  post: WritingPost;
  variant?: 'full' | 'compact' | 'landing';
  isLast?: boolean;
}

function PostLink({
  post,
  children,
}: {
  post: WritingPost;
  children: React.ReactNode;
}) {
  return (
    <Link
      to="/writing/$post"
      params={{ post: post.slug }}
      className="transition-colors hover:text-brand-700"
    >
      {children}
    </Link>
  );
}

export function PostRow({
  post,
  variant = 'full',
  isLast = false,
}: PostRowProps) {
  const border = isLast ? 'border-b-2 border-t-2' : 'border-t-2';

  if (variant === 'landing') {
    return (
      <div
        className={`grid grid-cols-[minmax(0,1fr)_7rem] items-baseline gap-[4px_clamp(16px,3vw,40px)] border-divider py-5 ${border}`}
      >
        <h3 className="m-0 font-sans text-[19px] font-extrabold leading-7 tracking-[-0.01em]">
          <PostLink post={post}>{post.title}</PostLink>
        </h3>
        <p className="modernist-label m-0 text-foreground/62 [font-feature-settings:'tnum'1]">
          {post.date}
        </p>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        className={`grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-[8px_clamp(20px,4vw,44px)] border-divider py-[18px] ${border}`}
      >
        <p className="modernist-label m-0 text-foreground/58 [font-feature-settings:'tnum'1]">
          {post.date}
        </p>
        <h3 className="m-0 font-sans text-[19px] font-extrabold leading-[26px] tracking-[-0.01em]">
          <PostLink post={post}>{post.title}</PostLink>
        </h3>
      </div>
    );
  }

  return (
    <article
      className={`grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-[8px_clamp(20px,4vw,44px)] border-divider py-6 ${border}`}
    >
      <p className="modernist-label m-0 text-foreground/58 [font-feature-settings:'tnum'1]">
        {post.date}
      </p>
      <div className="flex flex-col gap-2">
        <h2 className="m-0 font-sans text-[clamp(21px,2.6vw,28px)] font-extrabold leading-[1.14] tracking-[-0.015em]">
          <PostLink post={post}>{post.title}</PostLink>
        </h2>
        <p className="m-0 max-w-[52ch] text-[15.5px] leading-[27px] text-foreground/78">
          {post.excerpt}
        </p>
      </div>
    </article>
  );
}