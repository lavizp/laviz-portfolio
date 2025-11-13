import { createFileRoute, notFound } from '@tanstack/react-router';

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
    return { markdown };
  },
  notFoundComponent: () => <div>Blog not found</div>,
});

function RouteComponent() {
  const { markdown } = Route.useLoaderData();
  return <div>{markdown}</div>;
}
