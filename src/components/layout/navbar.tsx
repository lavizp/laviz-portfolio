import { useState } from 'react';
import { Menu, Sparkles, X } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { useChat } from '@/hooks/use-chat';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openChat } = useChat();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a
          href="#top"
          className="font-serif text-lg font-semibold tracking-tight text-foreground"
        >
          {profile.name}
          <span className="text-brand">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button
            onClick={() => openChat()}
            className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
            size="sm"
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
            className="rounded-full"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-border/60 transition-[max-height,opacity] duration-300 md:hidden',
          mobileOpen ? 'max-h-96 border-t opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button
            onClick={() => {
              setMobileOpen(false);
              openChat();
            }}
            className="mt-2 rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
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
