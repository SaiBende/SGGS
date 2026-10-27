import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export function Label({ className, children, required, ...props }) {
  return (
    <label className={cn("label-base", className)} {...props}>
      {children}
      {required && <span className="ml-1 text-brand-600">*</span>}
    </label>
  );
}

export function FieldHint({ children, className }) {
  return <p className={cn("mt-1.5 text-xs leading-5 text-muted", className)}>{children}</p>;
}

export function FieldError({ children, className }) {
  return (
    <p className={cn("mt-1.5 text-xs font-medium leading-5 text-red-600", className)}>
      {children}
    </p>
  );
}

export const Input = forwardRef(function Input({ className, invalid, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "field-base h-12",
        invalid && "border-red-400 focus:border-red-500 focus:ring-red-500/10",
        className
      )}
      {...props}
    />
  );
});

export const Textarea = forwardRef(function Textarea({ className, invalid, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "field-base min-h-28 resize-y leading-6",
        invalid && "border-red-400 focus:border-red-500 focus:ring-red-500/10",
        className
      )}
      {...props}
    />
  );
});

export const Select = forwardRef(function Select({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        "field-base h-12 appearance-none py-0 pr-10",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

export function Checkbox({ className, label, ...props }) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-2.5 text-sm text-ink/65", className)}>
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 rounded border-ink/25 text-brand-600 accent-brand-600 focus:ring-brand-500/20"
        {...props}
      />
      {label && <span className="leading-5">{label}</span>}
    </label>
  );
}
