import { useLocation } from '@tanstack/react-router';
import { profile, socials } from '@/data/portfolio';

const copyByPath = [
  {
    match: /^\/writing\//,
    banner: ['Disagree with this?', 'Write to me — I like that.'],
    footer: 'Hand-written HTML, no trackers. Comments happen by email.',
  },
  {
    match: /^\/writing$/,
    banner: ['Disagree with a post?', 'Tell me — I like that.'],
    footer: 'Hand-written HTML, no trackers. Seven posts, no newsletter.',
  },
  {
    match: /^\/projects$/,
    banner: ['Want one of these', 'built for your team?'],
    footer:
      'Hand-written HTML, no trackers. Three tools, six experiments, one inbox.',
  },
  {
    match: /^\//,
    banner: ['Come say hello.', 'I answer everything.'],
    footer:
      'Hand-written HTML, no trackers. Three tools, six experiments, one inbox.',
  },
];

export function Footer() {
  const { pathname } = useLocation();
  const copy =
    copyByPath.find((entry) => entry.match.test(pathname)) ?? copyByPath[0];

  const bannerLinks = [
    { label: profile.email, href: `mailto:${profile.email}` },
    ...socials
      .filter((s) => s.icon !== 'mail' && s.icon !== 'linkedin')
      .map((s) => ({ label: s.label, href: s.href })),
  ];

  return (
    <>
      <section id="hello" className="bg-neutral-900 text-background">
        <div className="mx-auto max-w-[900px] px-[clamp(20px,5vw,56px)] py-[clamp(56px,9vw,84px)]">
          <span aria-hidden className="mb-[26px] block size-3 bg-brand" />
          <h2 className="ml-[-0.058em] m-0 font-sans text-[clamp(30px,4.4vw,52px)] font-extrabold leading-[1.06] tracking-[-0.015em]">
            <span className="block">{copy.banner[0]}</span>
            <span className="block">{copy.banner[1]}</span>
          </h2>
          <div className="modernist-label mt-[34px] flex flex-wrap gap-[14px_28px] text-[15px] leading-6 text-background">
            {bannerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="border-b-2 border-background pb-px text-background [overflow-wrap:anywhere] hover:border-brand-300 hover:text-brand-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[900px] px-[clamp(20px,5vw,56px)]">
        <footer className="pb-14 pt-11 text-[13px] leading-7 text-foreground/70">
          {copy.footer}
        </footer>
      </div>
    </>
  );
}