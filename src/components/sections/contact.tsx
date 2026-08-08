import { ArrowUpRight, Mail } from 'lucide-react';
import { profile, socials } from '@/data/portfolio';
import { Reveal } from '@/components/sections/reveal';
import { Button } from '@/components/ui/button';

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-16 text-center sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
          />
          <div className="relative">
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand">
              Contact
            </p>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Let's build something
              <br />
              great together<span className="text-brand">.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted-foreground">
              I'm {profile.availability.toLowerCase()} — whether it's a
              full-time role, a freelance project, or just a chat about the web.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
              >
                <a href={`mailto:${profile.email}`}>
                  <Mail className="size-4" />
                  {profile.email}
                </a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {socials
                .filter((s) => s.icon !== 'mail')
                .map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {social.label}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
