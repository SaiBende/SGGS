import { cn } from "../../lib/utils";

const variants = {
  default: "border border-ink/10 bg-white text-ink/70",
  brand: "border border-brand-200/70 bg-brand-50 text-brand-700",
  solid: "border border-transparent bg-ink text-white",
  outline: "border border-ink/15 bg-transparent text-ink/60",
  success: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border border-amber-200 bg-amber-50 text-amber-700",
  coral: "border border-coral-400/30 bg-coral-400/10 text-coral-600",
  "dark-outline": "border border-white/15 bg-white/[0.06] text-white/70",
};

const sizes = {
  sm: "px-2.5 py-1 text-[11px]",
  md: "px-3 py-1.5 text-xs",
};

export function Badge({ children, variant = "default", size = "sm", className, dot = false, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold tracking-[0.01em]",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  );
}

export default Badge;
