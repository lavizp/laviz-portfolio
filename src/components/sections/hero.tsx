import { profile, stats } from '@/data/portfolio';

export function Hero() {
  return (
    <header id="top" className="flex flex-col items-start">
      <h1 className="ml-[-0.058em] max-w-[12ch] font-sans text-[clamp(44px,9.4vw,104px)] font-extrabold leading-[0.94] tracking-[-0.035em]">
        {profile.name.split(' ')[0]}
        <br />
        {profile.name.split(' ')[1]}
      </h1>

      <div className="mt-[clamp(32px,5vw,52px)] grid w-full grid-cols-1 items-start gap-y-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-[20px_clamp(24px,5vw,56px)]">
        <p className="m-0 max-w-[34ch] text-[18px] leading-[30px]">
          {profile.tagline}
        </p>
        <div className="flex flex-col items-start gap-3.5">
          {profile.availableForWork && (
            <div className="modernist-label flex items-center gap-2.5">
              <span
                aria-hidden
                className="size-[9px] flex-none bg-brand"
              />
              <span>{profile.availability}</span>
            </div>
          )}
          <p className="m-0 max-w-[28ch] text-[15.5px] leading-[26px] text-foreground/72">
            Three tools shipped, all still maintained. Mail lands in my inbox,
            not a form.
          </p>
        </div>
      </div>

      <div className="mt-[clamp(36px,6vw,60px)] grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[2px] border-y-2 border-divider bg-divider">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex flex-col gap-2 bg-background pb-[22px] pt-5 ${
              index > 0 ? 'pl-[22px]' : ''
            }`}
          >
            <span className="modernist-label text-foreground/55">
              {stat.label}
            </span>
            <span className="font-sans text-2xl font-extrabold leading-7 tracking-[-0.01em] [font-feature-settings:'tnum'1]">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </header>
  );
}