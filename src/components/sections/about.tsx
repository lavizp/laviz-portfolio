import { Briefcase, MapPin, Sparkles } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { SectionHeading } from '@/components/sections/section-heading';
import { Reveal } from '@/components/sections/reveal';

const facts = [
  { icon: MapPin, label: 'Location', value: profile.location },
  { icon: Briefcase, label: 'Role', value: profile.role },
  { icon: Sparkles, label: 'Status', value: profile.availability },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
      <Reveal>
        <SectionHeading eyebrow="About" title="A developer who cares about craft" />
      </Reveal>
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {profile.bio}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <dl className="space-y-5 rounded-2xl border border-border bg-card p-6">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-start gap-3">
                <span className="mt-0.5 rounded-lg bg-brand/10 p-2 text-brand">
                  <fact.icon className="size-4" />
                </span>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-foreground">
                    {fact.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
