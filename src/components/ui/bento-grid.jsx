import { cn } from "../../lib/utils";

export function BentoGrid({ className, children }) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-6", className)}>
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  footer,
  dark = false,
  children,
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border p-5 transition duration-300 hover:-translate-y-0.5",
        dark
          ? "border-white/10 bg-white/[0.045] hover:border-white/20 hover:bg-white/[0.065]"
          : "border-ink/10 bg-white shadow-card hover:border-ink/20 hover:shadow-float",
        className
      )}
    >
      {header}
      <div className={cn("flex flex-1 flex-col", header ? "pt-5" : "pt-1")}>
        {icon && (
          <div
            className={cn(
              "mb-4 flex h-10 w-10 items-center justify-center rounded-xl",
              dark ? "bg-white/10 text-white" : "bg-brand-50 text-brand-600"
            )}
          >
            {icon}
          </div>
        )}
        {title && (
          <h3
            className={cn(
              "font-display text-[17px] font-semibold tracking-[-0.025em]",
              dark ? "text-white" : "text-ink"
            )}
          >
            {title}
          </h3>
        )}
        {description && (
          <p
            className={cn(
              "mt-2 text-sm leading-6",
              dark ? "text-white/50" : "text-muted"
            )}
          >
            {description}
          </p>
        )}
        {children}
        {footer && <div className="mt-auto pt-5">{footer}</div>}
      </div>
    </div>
  );
}

export default BentoGrid;
