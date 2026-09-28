import { profile } from '@/data/portfolio';

export function About() {
  return (
    <section
      id="about"
      className="grid grid-cols-1 items-start gap-y-4 py-11 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:gap-[20px_clamp(24px,5vw,64px)]"
    >
      <span className="modernist-label text-foreground/60">About</span>
      <div className="flex max-w-[54ch] flex-col gap-6">
        <p className="m-0 text-[16.5px] leading-7">
          <strong className="font-semibold">{profile.firstName}</strong> goes by{' '}
          <strong className="font-semibold">lavizp</strong> most places online.
          Days are spent writing TypeScript; evenings are spent building the
          small things around it — CLIs that do one job, documentation tooling
          that gets out of the way, and the occasional experiment that never
          leaves my machine.
        </p>
        <p className="m-0 text-[16.5px] leading-7 text-foreground/78">
          Everything below is something I use myself, which is the only quality
          bar I really trust. If one of them is useful to you too, that's a very
          good day.
        </p>
      </div>
    </section>
  );
}