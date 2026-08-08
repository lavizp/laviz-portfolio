import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useChat } from '@/hooks/use-chat';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { Skills } from '@/components/sections/skills';
import { Contact } from '@/components/sections/contact';

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
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
