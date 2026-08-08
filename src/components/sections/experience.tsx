import { experience } from '@/data/portfolio';
import { SectionHeading } from '@/components/sections/section-heading';
import { Reveal } from '@/components/sections/reveal';

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24"
    >
      <Reveal>
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="A track record of shipping thoughtful, performant products."
        />
      </Reveal>
      <div className="relative">
        <div
          aria-hidden
          className="absolute bottom-2 left-[7px] top-2 w-px bg-border"
        />
        <ol className="space-y-10">
          {experience.map((job, index) => (
            <Reveal key={job.company} delay={index * 0.08}>
              <li className="relative pl-10">
                <span
                  className={`absolute left-0 top-1.5 flex size-4 items-center justify-center rounded-full border-2 ${
                    job.current
                      ? 'border-brand bg-brand/20'
                      : 'border-border bg-card'
                  }`}
                >
                  {job.current && (
                    <span className="size-1.5 rounded-full bg-brand" />
                  )}
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {job.role}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {job.period}
                  </span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-brand">
                  {job.company}
                </p>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {job.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
