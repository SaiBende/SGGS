import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const variants = {
  primary:
    "bg-ink text-white shadow-[0_10px_30px_-14px_rgba(11,11,16,0.8)] hover:bg-brand-600 active:translate-y-px",
  brand:
    "bg-brand-600 text-white shadow-[0_14px_34px_-16px_rgba(91,74,232,0.8)] hover:bg-brand-700 active:translate-y-px",
  secondary:
    "border border-ink/15 bg-white text-ink hover:border-ink/25 hover:bg-ink/[0.035] active:translate-y-px",
  soft:
    "bg-brand-50 text-brand-700 hover:bg-brand-100 active:translate-y-px",
  ghost: "text-ink/65 hover:bg-ink/[0.055] hover:text-ink",
  danger:
    "bg-red-50 text-red-700 hover:bg-red-100 active:translate-y-px",
  "dark-outline":
    "border border-white/15 bg-white/[0.06] text-white hover:border-white/30 hover:bg-white/[0.1]",
  "white":
    "bg-white text-ink shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] hover:bg-ink-50 active:translate-y-px",
  "white-ghost": "text-white/65 hover:bg-white/10 hover:text-white",
};

const sizes = {
  sm: "h-9 rounded-lg px-3.5 text-[13px]",
  md: "h-11 rounded-xl px-5 text-sm",
  lg: "h-12 rounded-xl px-6 text-sm",
  xl: "h-14 rounded-full px-7 text-[15px]",
  icon: "h-10 w-10 rounded-xl",
  "icon-sm": "h-8 w-8 rounded-lg",
};

// eslint-disable-next-line react-refresh/only-export-components -- shared style helper intentionally lives beside the component.
export function buttonVariants({ variant = "primary", size = "md", className } = {}) {
  return cn(
    "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-semibold transition duration-200 disabled:pointer-events-none disabled:opacity-55",
    variants[variant],
    sizes[size],
    className
  );
}

export const Button = forwardRef(function Button(
  { className, variant = "primary", size = "md", type = "button", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
});

export default Button;
