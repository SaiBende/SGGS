import { cn } from "../../lib/utils";

export function StatCard({ label, value, hint, icon, accent = "brand", className }) {
  const accents = {
    brand: "bg-brand-50 text-brand-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    sky: "bg-sky-50 text-sky-600",
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-ink/10 bg-white p-5 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-float",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-medium text-muted">{label}</p>
          <p className="mt-2 font-display text-[1.75rem] font-semibold leading-none tracking-[-0.045em] text-ink">
            {value}
          </p>
          {hint && <p className="mt-2 text-[11px] leading-4 text-ink/40">{hint}</p>}
        </div>
        {icon && (
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              accents[accent] || accents.brand
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
