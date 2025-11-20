import { BookOpen } from 'lucide-react';

export function BlogNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-gray-50 rounded-xl shadow-lg m-8">
      <BookOpen className="w-16 h-16 text-indigo-500 mb-4" />
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
        404 - Post Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        We couldn't locate the blog post you are looking for. (Mocked for
        compilation fix.)
      </p>
      <a
        href="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 shadow-md"
      >
        Back to Home
      </a>
    </div>
  );
}
