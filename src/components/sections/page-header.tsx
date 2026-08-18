interface PageHeaderProps {
  title: string;
  intro: string;
}

export function PageHeader({ title, intro }: PageHeaderProps) {
  return (
    <header className="grid grid-cols-1 items-end gap-y-6 pt-[clamp(48px,9vh,96px)] sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-[22px_clamp(24px,5vw,56px)]">
      <h1 className="ml-[-0.058em] m-0 font-sans text-[clamp(40px,7.6vw,84px)] font-extrabold leading-[0.96] tracking-[-0.03em]">
        {title}
      </h1>
      <p className="m-0 mb-1.5 max-w-[34ch] text-[16.5px] leading-7 text-foreground/80">
        {intro}
      </p>
    </header>
  );
}