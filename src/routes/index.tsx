import { createFileRoute } from '@tanstack/react-router';
import Hero from '@/components/home-page/hero';
import { ChatHero } from '@/components/home-page/chat';
export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ChatHero />
    </div>
  );
}
