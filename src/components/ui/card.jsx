import { useRef, useState } from "react";
import { cn } from "../../lib/utils";

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn("rounded-3xl border border-ink/10 bg-white shadow-card", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Aceternity-style spotlight card. The cursor position is written to CSS
 * variables and a soft radial highlight follows it without re-rendering the
 * card on every mouse move.
 */
export function SpotlightCard({
  className,
  children,
  spotlightColor = "rgba(109,94,246,0.16)",
  as: Comp = "div",
  ...props
}) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  const handleMove = (event) => {
    if (!ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
    ref.current.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <Comp
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-card",
        className
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(520px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${spotlightColor}, transparent 48%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </Comp>
  );
}

export function CardHeader({ className, children }) {
  return <div className={cn("px-5 pb-0 pt-5 sm:px-6 sm:pt-6", className)}>{children}</div>;
}

export function CardBody({ className, children }) {
  return <div className={cn("p-5 sm:p-6", className)}>{children}</div>;
}

export function CardFooter({ className, children }) {
  return (
    <div className={cn("border-t border-ink/10 px-5 py-4 sm:px-6", className)}>
      {children}
    </div>
  );
}

export default Card;
