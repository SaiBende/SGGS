import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className,
  size = "md",
}) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  const widths = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-3xl",
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 cursor-default bg-ink/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative z-10 w-full overflow-hidden rounded-3xl border border-white/40 bg-canvas shadow-float",
              widths[size],
              className
            )}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-ink/55 transition hover:bg-white hover:text-ink"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            {(title || description) && (
              <div className="border-b border-ink/10 px-6 pb-5 pt-6 pr-16">
                {title && (
                  <h2 id="modal-title" className="font-display text-xl font-semibold tracking-[-0.03em] text-ink">
                    {title}
                  </h2>
                )}
                {description && <p className="mt-2 text-sm leading-6 text-muted">{description}</p>}
              </div>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default Modal;
