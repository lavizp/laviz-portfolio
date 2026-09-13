import { createFileRoute } from '@tanstack/react-router';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Projects } from '@/components/sections/projects';
import { Writing } from '@/components/sections/writing';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
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
