import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-5xl text-gray-900 font-bold mb-8 animate-pulse">
        Coming Soon
      </h1>
      <p className="text-gray-900 text-lg mb-8">
        We're working hard to bring you something amazing. Stay tuned!
      </p>
    </div>
  );
}
