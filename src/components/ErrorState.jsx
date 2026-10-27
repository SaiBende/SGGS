import { AlertTriangle, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

// Shared error fallback — icon, title, message and an optional retry action.
// `tone="dark"` is used on the full-black public profile page.
function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try again',
  className = '',
  tone = 'light',
  children,
}) {
  const dark = tone === 'dark';

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 px-4 py-12 text-center',
        dark ? 'text-white' : 'text-ink',
        className
      )}
      role="alert"
    >
      <span
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-2xl',
          dark ? 'bg-red-400/10 text-red-300' : 'bg-red-50 text-red-600'
        )}
      >
        <AlertTriangle className="h-5 w-5" />
      </span>
      <h3 className="font-display text-lg font-semibold tracking-[-0.02em]">{title}</h3>
      {message && (
        <p className={cn('max-w-md text-sm leading-6', dark ? 'text-white/50' : 'text-muted')}>
          {message}
        </p>
      )}
      {onRetry && (
        <Button
          type="button"
          onClick={onRetry}
          variant={dark ? 'dark-outline' : 'primary'}
          size="md"
          className="mt-1"
        >
          <RotateCcw className="h-3.5 w-3.5" /> {retryLabel}
        </Button>
      )}
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
}

export default ErrorState;
