import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useChat } from '@/hooks/use-chat';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Projects } from '@/components/sections/projects';
import { Writing } from '@/components/sections/writing';

export const Route = createFileRoute('/')({
  validateSearch: (search) => ({
    prompt: (search.prompt as string) || '',
    chat: (search.chat as string) || '',
  }),
  component: HomePage,
});

function HomePage() {
  const { prompt, chat } = Route.useSearch();
  const { openChat } = useChat();

  // Deep links like /?chat=open or legacy /chat?prompt=... open the widget.
  useEffect(() => {
    if (chat === 'open' || prompt) {
      openChat(prompt || undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mx-auto max-w-[900px] px-[clamp(20px,5vw,56px)]">
        <Hero />
        <About />
        <Projects />
        <Writing />
      </div>
    </>
  );
}