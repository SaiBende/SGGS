import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "./ui/card";
import { cn } from "../lib/utils";

function ProductCard({
  icon,
  eyebrow,
  title,
  description,
  to,
  cta = "Explore",
  accent = "brand",
  children,
  className,
}) {
  const accents = {
    brand: "bg-brand-50 text-brand-600",
    sky: "bg-sky-50 text-sky-600",
    coral: "bg-coral-400/10 text-coral-600",
  };

  return (
    <SpotlightCard
      className={cn("flex h-full flex-col overflow-hidden", className)}
      spotlightColor="rgba(109,94,246,0.12)"
    >
      <Link to={to} className="flex h-full flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl", accents[accent] || accents.brand)}>
            {icon}
          </div>
          <ArrowUpRight className="h-4 w-4 text-ink/25 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600" />
        </div>
        {eyebrow && <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.17em] text-ink/35">{eyebrow}</p>}
        <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.035em] text-ink">{title}</h3>
        <p className="mt-2 text-[13px] leading-6 text-muted">{description}</p>
        <div className="mt-5 flex-1">{children}</div>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink transition group-hover:text-brand-600">
          {cta} <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </Link>
    </SpotlightCard>
  );
}

export default ProductCard;
