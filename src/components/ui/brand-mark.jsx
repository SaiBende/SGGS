import { Link2 } from "lucide-react";
import { cn } from "../../lib/utils";

const sizeStyles = {
  sm: { box: "h-8 w-8 rounded-lg", icon: "h-3.5 w-3.5" },
  md: { box: "h-9 w-9 rounded-xl", icon: "h-4 w-4" },
  lg: { box: "h-11 w-11 rounded-[0.9rem]", icon: "h-5 w-5" },
};

// A small, legible brand mark. The full logo asset contains its own wordmark,
// which becomes unreadable at navigation sizes, so the header uses this mark
// next to plain text instead.
export function BrandMark({ size = "md", className }) {
  const styles = sizeStyles[size] || sizeStyles.md;
  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-sky-400 text-white shadow-[0_8px_20px_-10px_rgba(91,74,232,0.75)]",
        styles.box,
        className
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(255,255,255,0.35),transparent_45%)]" />
      <Link2 className={cn("relative", styles.icon)} strokeWidth={2.2} />
    </span>
  );
}

export default BrandMark;
