import { cn } from "../../lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
  titleClassName,
  children,
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]",
            dark
              ? "border-white/15 bg-white/[0.06] text-white/60"
              : "border-ink/10 bg-white/70 text-ink/55 backdrop-blur"
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", dark ? "bg-brand-300" : "bg-brand-500")} />
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.045em] sm:text-4xl lg:text-[2.9rem]",
          dark ? "text-white" : "text-ink",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-[15px] leading-7 sm:text-base",
            align === "center" && "mx-auto",
            dark ? "text-white/55" : "text-muted"
          )}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
  compact = false,
}) {
  return (
    <section className={cn("relative overflow-hidden", compact ? "pb-12 pt-14 sm:pb-16" : "pb-20 pt-16 sm:pb-24 sm:pt-20", className)}>
      <div aria-hidden="true" className="absolute inset-0 bg-grid-fade opacity-70" />
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-[22rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand-400/10 blur-[110px]" />
      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/75 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55 shadow-sm backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {eyebrow}
            </div>
          )}
          <h1 className="font-display text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.055em] text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-muted sm:text-lg sm:leading-8">
              {description}
            </p>
          )}
          {actions && <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{actions}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}

export default SectionHeading;
