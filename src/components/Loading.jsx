import { cn } from '../lib/utils';

// Shared loading fallback — a restrained two-ring spinner with optional copy.
// The colour follows the parent text colour, so it works on light and dark
// surfaces without a second theme.
function Loading({ message = 'Loading...', compact = false, className = '' }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 text-brand-600',
        compact ? '' : 'py-12',
        className
      )}
      role="status"
      aria-live="polite"
    >
      <span className="relative flex h-12 w-12 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-current opacity-15" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-current border-r-current/60" />
        <span className="h-2 w-2 animate-pulse-soft rounded-full bg-current" />
      </span>
      {message && <p className="text-sm font-medium opacity-70">{message}</p>}
    </div>
  );
}

// Tiny spinner for inside buttons ("Signing in...", "Redirecting..." etc.)
export function InlineSpinner({ className = 'h-4 w-4' }) {
  return (
    <svg
      className={cn('animate-spin', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}

export default Loading;
