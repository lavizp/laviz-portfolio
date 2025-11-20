import { createFileRoute, notFound } from '@tanstack/react-router';
import { Calendar, Clock } from 'lucide-react';
import { BlogMarkdown } from './-components/blog-markdown';
import { BlogNotFound } from './-components/blog-not-found';

function parseFrontmatter(markdown: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: markdown };
  }

  const frontmatterText = match[1];
  const content = match[2];

  const frontmatter: Record<string, string> = {};
  frontmatterText.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      frontmatter[key.trim()] = valueParts.join(':').trim();
    }
  });

  return { frontmatter, content };
}

export const Route = createFileRoute('/(layouted)/blog/$blogSlug')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { blogSlug } = params;
    const response = await fetch(`/blogs/${blogSlug}.md`);
    if (!response.ok) throw new Error('Failed to fetch blog');
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      throw notFound();
    }
    const markdown = await response.text();
    const { frontmatter, content } = parseFrontmatter(markdown);

    return {
      markdown: content,
      title: frontmatter.title || 'Untitled',
      date: frontmatter.date || 'Unknown date',
      readingTime: frontmatter.readingTime || null,
    };
  },
  notFoundComponent: () => <BlogNotFound />,
});

function RouteComponent() {
  const { markdown, title, date, readingTime } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <header className="p-8 md:p-12 border-b border-gray-100">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
              Published on {date}
            </div>
            {readingTime && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                {readingTime} min read
              </div>
            )}
          </div>
        </header>

        <main className="p-8 md:p-12">
          <BlogMarkdown markdown={markdown} />
        </main>

        <footer className="p-8 md:p-12 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-gray-600 font-medium">
            Did you enjoy this article? Share it with your network!
          </p>
        </footer>
      </div>
    </div>
  );
}
