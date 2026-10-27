import { useId } from "react";
import { cn } from "../../lib/utils";

export function GridPattern({ className, stroke = "rgba(11,11,16,0.07)", size = 48 }) {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <defs>
        <pattern id={`grid-${id}`} width={size} height={size} patternUnits="userSpaceOnUse">
          <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke={stroke} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
    </svg>
  );
}

export default GridPattern;
