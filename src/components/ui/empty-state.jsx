import { cn } from "../../lib/utils";

export function EmptyState({ icon, title, description, action, className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink/15 bg-white/60 px-6 py-14 text-center",
        className
      )}
    >
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          {icon}
        </div>
      )}
      <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-ink">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm leading-6 text-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export default EmptyState;
