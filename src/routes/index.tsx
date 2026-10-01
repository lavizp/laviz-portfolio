import { createFileRoute } from '@tanstack/react-router';
import { Hero } from '@/components/sections/hero';
import { PortfolioHome } from '@/components/sections/portfolio-home';

export const Route = createFileRoute('/')({ component: HomePage });

function HomePage() {
  return (
    <>
      <Hero />
      <PortfolioHome />
    </>
  );
}
