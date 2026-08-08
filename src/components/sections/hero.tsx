import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowDown, Github, Linkedin, Sparkles, Twitter } from 'lucide-react';
import { profile, socials } from '@/data/portfolio';
import { useChat } from '@/hooks/use-chat';
import { Button } from '@/components/ui/button';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
} as const;

function RotatingRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % roles.length),
      2600,
    );
    return () => window.clearInterval(id);
  }, [roles.length]);

  return (
    <span className="relative inline-flex h-[1.4em] min-w-[8ch] items-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="whitespace-nowrap text-brand"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const { openChat } = useChat();
  const socialLinks = socials.filter((s) => s.icon !== 'mail');

  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
      />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {profile.availableForWork && (
            <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {profile.availability}
            </span>
          )}

          <p className="mb-4 font-mono text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Hi, I'm
          </p>
          <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-7xl">
            {profile.name}
            <span className="text-brand">.</span>
          </h1>

          <p className="mt-6 text-xl text-muted-foreground sm:text-2xl">
            <RotatingRole roles={profile.roles} />
          </p>

          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            {profile.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a href="#projects">
                View my work
                <ArrowDown className="size-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => openChat()}
              className="rounded-full"
            >
              <Sparkles className="size-4 text-brand" />
              Ask my AI
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-1">
            {socialLinks.map((social) => {
              const Icon = iconMap[social.icon as keyof typeof iconMap];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
