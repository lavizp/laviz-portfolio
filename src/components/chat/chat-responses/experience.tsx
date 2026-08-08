import { experience } from '@/data/portfolio';

const ExperienceResponse = () => {
  return (
    <div>
      <h3 className="mb-3 font-serif text-base font-semibold text-foreground">
        Experience
      </h3>
      <div className="space-y-4">
        {experience.map((job) => (
          <div
            key={job.company}
            className="border-b border-border pb-3 last:border-0 last:pb-0"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h4 className="text-sm font-semibold text-foreground">
                {job.role}
              </h4>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {job.period}
              </span>
            </div>
            <p className="text-xs font-medium text-brand">{job.company}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {job.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceResponse;
