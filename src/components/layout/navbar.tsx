import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, Sparkles, X } from 'lucide-react';
import { useChat } from '@/hooks/use-chat';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Projects', to: '/projects' },
  { label: 'Writing', to: '/writing' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openChat } = useChat();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-divider bg-background">
      <div className="mx-auto flex h-[62px] max-w-[900px] items-center justify-between px-[clamp(20px,5vw,56px)]">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-sans text-[15px] font-extrabold tracking-[0.02em] text-foreground"
        >
          <span aria-hidden className="size-2.5 flex-none bg-brand" />
          lavizp
        </Link>

        {/* Desktop nav */}
        <nav className="modernist-label hidden items-center gap-[22px] text-foreground md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="border-b-2 border-transparent text-foreground/70 transition-colors hover:border-brand hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#hello"
            className="border-b-2 border-transparent text-foreground/70 transition-colors hover:border-brand hover:text-foreground"
          >
            Say hello
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button
            onClick={() => openChat()}
            size="sm"
            className="bg-brand text-brand-foreground hover:bg-brand-600"
          >
            <Sparkles className="size-3.5" />
            Ask my AI
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-divider transition-[max-height,opacity] duration-300 md:hidden',
          mobileOpen ? 'max-h-96 border-t-2 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="flex flex-col gap-1 px-[clamp(20px,5vw,56px)] py-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="modernist-label border-b border-divider py-3 text-foreground/70 transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#hello"
            onClick={() => setMobileOpen(false)}
            className="modernist-label border-b border-divider py-3 text-foreground/70 transition-colors hover:text-brand"
          >
            Say hello
          </a>
          <Button
            onClick={() => {
              setMobileOpen(false);
              openChat();
            }}
            className="mt-3 bg-brand text-brand-foreground hover:bg-brand-600"
            size="sm"
          >
            <Sparkles className="size-3.5" />
            Ask my AI
          </Button>
        </nav>
      </div>
    </header>
  );
}