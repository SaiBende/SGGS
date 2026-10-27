import { cn } from "../../lib/utils";

export function MovingBorderCard({
  children,
  className,
  containerClassName,
  duration = 6,
  borderClassName = "from-brand-500 via-sky-400 to-brand-500",
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.7rem] p-px",
        containerClassName
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute left-1/2 top-1/2 aspect-square w-[180%] -translate-x-1/2 -translate-y-1/2 animate-border-spin bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0deg,transparent_250deg,var(--tw-gradient-from)_290deg,var(--tw-gradient-via)_330deg,var(--tw-gradient-to)_360deg)] opacity-90",
          borderClassName
        )}
        style={{ animationDuration: `${duration}s` }}
      />
      <div className={cn("relative overflow-hidden rounded-[calc(1.7rem-1px)] bg-white", className)}>
        {children}
      </div>
    </div>
  );
}

export function ShimmerButton({
  children,
  className,
  as: Comp = "button",
  ...props
}) {
  return (
    <Comp
      className={cn(
        "group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-6 text-sm font-semibold text-white shadow-[0_16px_40px_-18px_rgba(11,11,16,0.8)] transition hover:bg-brand-600 disabled:pointer-events-none disabled:opacity-55",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.22)_48%,transparent_70%)] transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Comp>
  );
}

export default MovingBorderCard;
