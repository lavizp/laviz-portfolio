import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'motion/react';
import blogList from '@/data/blog_list.json';
export const Route = createFileRoute('/(layouted)/blog/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col gap-10 max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-4xl tracking-tight">My Blogs</h1>
        <p className="text-muted-foreground text-lg">
          Note: Theese are AI generated blogs used as a placeholder, Ill soon be posting my own blogs here.
        </p>
      </div>
      
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {Object.entries(blogList).map(([slug, blog], index) => (
          <motion.div
            key={slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="break-inside-avoid mb-6"
          >
            <Link
              to="/blog/$blogSlug"
              params={{ blogSlug: slug }}
              className="group relative flex flex-col gap-3 rounded-2xl border bg-card p-4 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.author}</span>
                </div>
                
                <h2 className="font-semibold text-xl leading-tight group-hover:text-primary transition-colors">
                  {blog.title}
                </h2>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {blog.description}
                </p>
                
                <div className="mt-auto pt-2 flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
