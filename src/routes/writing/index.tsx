import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { writing } from '@/lib/posts';
import { Reveal, Lines } from '@/components/sections/portfolio-home';

export const Route = createFileRoute('/writing/')({
  component: WritingIndexPage,
});

function WritingIndexPage() {
  const years = [...new Set(writing.map((post) => post.year))].sort(
    (a, b) => b - a,
  );
  return (
    <div className="wide-section article-page">
      <header className="section-head">
        <div>
          <div className="eyebrow" data-reveal="up">
            <span>Writing</span>
            {writing.length} posts
          </div>
          <h2 data-reveal="lines">
            <Lines>{['Notes from', 'the workbench.']}</Lines>
          </h2>
        </div>
        <p data-reveal="up" style={{ ['--i' as string]: 1 }}>
          What I learned building things — TypeScript, tooling, and the parts I
          had to relearn.
        </p>
      </header>

      {years.map((year) => (
        <section key={year} className="writing-year">
          <div className="eyebrow" data-reveal="up">
            <span>{year}</span>
          </div>
          {writing
            .filter((post) => post.year === year)
            .map((post, index) => (
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
        </section>
      ))}

      <Link className="text-link article-back" to="/">
        <ArrowLeft size={18} /> Back home
      </Link>
    </div>
  );
}
