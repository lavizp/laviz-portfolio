import { skills } from '@/data/portfolio';

const SkillsResponse = () => {
  return (
    <div>
      <h3 className="mb-3 font-serif text-base font-semibold text-foreground">
        Skills
      </h3>
      <div className="space-y-3">
        {skills.map((group) => (
          <div key={group.category}>
            <h4 className="mb-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {group.category}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsResponse;
