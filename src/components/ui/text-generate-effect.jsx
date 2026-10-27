import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function TextGenerateEffect({
  words = "",
  className,
  wordClassName,
  delay = 0,
  duration = 0.7,
  once = true,
}) {
  const items = String(words).split(/\s+/).filter(Boolean);

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      transition={{ staggerChildren: 0.055, delayChildren: delay }}
    >
      {items.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className={cn("inline-block", wordClassName)}
          variants={{
            hidden: { opacity: 0, y: 8, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {word}
          {index < items.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default TextGenerateEffect;
