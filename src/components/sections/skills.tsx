import { skills } from '@/data/portfolio';
import { SectionHeading } from '@/components/sections/section-heading';
import { Reveal } from '@/components/sections/reveal';

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Skills"
          title="Tools of the trade"
          description="Technologies I reach for to build robust, delightful products."
        />
      </Reveal>
      <div className="grid gap-8 sm:grid-cols-3">
        {skills.map((group, index) => (
          <Reveal key={group.category} delay={index * 0.08}>
            <div>
              <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
