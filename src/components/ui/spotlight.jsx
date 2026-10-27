import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * Aceternity-style spotlight cone. Best used inside a dark, relative section.
 */
export function Spotlight({ className, fill = "white", delay = 0.2 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -120 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "pointer-events-none absolute z-[1] h-[150%] w-[62%] -translate-y-1/3 rounded-full opacity-60 blur-3xl",
        className
      )}
      style={{
        background: `radial-gradient(ellipse at center, ${fill} 0%, transparent 67%)`,
      }}
    />
  );
}

export function SpotlightLine({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute left-1/2 top-0 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-300/70 to-transparent",
        className
      )}
    />
  );
}

export default Spotlight;
