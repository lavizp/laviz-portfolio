import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function BlogMarkdown({ markdown }: { markdown: string }) {
  return (
    <Markdown
      components={{
        h1: ({ children }) => (
          <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4 first:mt-0">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            {children}
          </h4>
        ),
        p: ({ children }) => (
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 text-lg">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700 text-lg">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="ml-4">{children}</li>,
        code: (props) => {
          const { children, className, node, ...rest } = props as any;
          const match = /language-(\w+)/.exec(className || '');
          const isInline = !match;

          return isInline ? (
            <code
              className="bg-gray-100 text-pink-600 px-2 py-1 rounded text-sm font-mono"
              {...rest}
            >
              {children}
            </code>
          ) : (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
              className="rounded-lg my-4"
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          );
        },
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-600 my-4">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-indigo-600 hover:text-indigo-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt}
            className="max-w-full h-auto rounded-lg shadow-md my-6"
          />
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-gray-900">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        hr: () => <hr className="my-8 border-gray-300" />,
      }}
    >
      {markdown}
    </Markdown>
  );
}
