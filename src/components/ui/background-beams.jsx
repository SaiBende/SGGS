import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const paths = [
  "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
  "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
  "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
  "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
  "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
  "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
  "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
  "M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
  "M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811",
  "M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803",
  "M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795",
  "M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787",
  "M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779",
  "M-289 -293C-289 -293 -221 112 243 239C707 366 775 771 775 771",
];

/**
 * Aceternity-style animated SVG beams for dark sections. Kept to a small
 * number of paths so it stays smooth on low-end laptops and phones.
 */
export function BackgroundBeams({ className }) {
  const id = useId().replace(/:/g, "");

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <svg
        className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`beam-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6d5ef6" stopOpacity="0" />
            <stop offset="42%" stopColor="#8d7bff" stopOpacity="0.65" />
            <stop offset="72%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {paths.map((d, index) => (
          <motion.path
            key={d}
            d={d}
            stroke={`url(#beam-${id})`}
            strokeWidth={index % 4 === 0 ? 1.1 : 0.6}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0.08, 0.55, 0.14],
            }}
            transition={{
              pathLength: { duration: 4.6, delay: index * 0.12, ease: "easeInOut" },
              opacity: {
                duration: 6 + (index % 5),
                delay: index * 0.1,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default BackgroundBeams;
