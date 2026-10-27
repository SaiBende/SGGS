import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  LogIn,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { apiFetch } from '../utils/auth';
import Loading from './Loading';
import { BackgroundBeams } from './ui/background-beams';
import { GridPattern } from './ui/grid-pattern';
import { Badge } from './ui/badge';
import { buttonVariants } from './ui/button';

function StatusShell({ icon, badge, title, description, children }) {
  return (
    <section className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-card">
        <div className="noise relative overflow-hidden bg-ink px-6 py-10 text-center sm:px-10">
          <GridPattern stroke="rgba(255,255,255,0.06)" size={48} />
          <BackgroundBeams className="opacity-40" />
          <div className="relative z-10">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-white">
              {icon}
            </span>
            <Badge variant="dark-outline" className="mt-5">
              {badge}
            </Badge>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-white sm:text-4xl">
              {title}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-[13px] leading-6 text-white/45">
              {description}
            </p>
          </div>
        </div>
        <div className="p-6 sm:p-8">{children}</div>
      </div>
    </section>
  );
}

function Return() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    if (!sessionId) {
      setStatus('error');
      return undefined;
    }

    apiFetch(`/payment/session-status?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (cancelled) return;
        if (!response.ok) {
          setStatus(response.status === 401 ? 'login' : 'error');
          return;
        }
        setStatus(data.status);
        setCustomerEmail(data.customer_email || '');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const returnTo = {
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
  };

  if (status === 'open') {
    return <Navigate to="/pricing" replace />;
  }

  if (status === null || status === 'loading') {
    return (
      <section className="container-page py-20">
        <div className="mx-auto max-w-md rounded-[2rem] border border-ink/10 bg-white p-8 shadow-card">
          <Loading message="Checking your payment status..." className="min-h-[30vh]" />
        </div>
      </section>
    );
  }

  if (status === 'complete') {
    return (
      <StatusShell
        icon={<CheckCircle2 className="h-6 w-6 text-emerald-300" />}
        badge="Payment complete"
        title="You're all set."
        description="Your plan is active and your workspace is ready for more links."
      >
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
          <p className="flex items-center gap-2 text-[12px] font-semibold text-emerald-800">
            <ShieldCheck className="h-4 w-4" /> Purchase confirmed
          </p>
          <p className="mt-2 text-[12px] leading-6 text-emerald-700/80">
            {customerEmail
              ? `A receipt has been sent to ${customerEmail}.`
              : 'Your payment was processed successfully.'}
          </p>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Link to="/dashboard" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
            Open dashboard <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/pricing" className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
            View plans
          </Link>
        </div>

        <p className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-muted">
          <Mail className="h-3.5 w-3.5" /> Questions? Email{' '}
          <a
            href="mailto:hello@saibende.tech"
            className="font-medium text-ink underline decoration-ink/20 underline-offset-4 hover:text-brand-600"
          >
            hello@saibende.tech
          </a>
        </p>
      </StatusShell>
    );
  }

  if (status === 'login') {
    return (
      <StatusShell
        icon={<LogIn className="h-6 w-6 text-brand-300" />}
        badge="One more step"
        title="Sign in to check this payment."
        description="We need to confirm the session belongs to your account before showing the receipt."
      >
        <div className="rounded-2xl border border-ink/10 bg-canvas p-4 text-center">
          <CreditCard className="mx-auto h-5 w-5 text-brand-500" />
          <p className="mt-2 text-[12px] leading-6 text-muted">
            You will be brought back to this page after signing in.
          </p>
        </div>
        <Link
          to="/login"
          state={{ from: returnTo }}
          className={buttonVariants({ variant: 'primary', size: 'lg', className: 'mt-5 w-full' })}
        >
          <LogIn className="h-4 w-4" /> Sign in <ArrowRight className="h-4 w-4" />
        </Link>
      </StatusShell>
    );
  }

  return (
    <StatusShell
      icon={<AlertTriangle className="h-6 w-6 text-amber-300" />}
      badge="Payment status"
      title="We couldn't verify this session."
      description="The checkout may have expired, been cancelled, or the link is incomplete."
    >
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="flex items-center gap-2 text-[12px] font-semibold text-amber-800">
          <AlertTriangle className="h-4 w-4" /> If you were charged
        </p>
        <p className="mt-2 text-[12px] leading-6 text-amber-700/80">
          Email{' '}
          <a
            href="mailto:hello@saibende.tech"
            className="font-medium underline decoration-amber-400 underline-offset-4"
          >
            hello@saibende.tech
          </a>{' '}
          with the approximate time of your purchase and we will help.
        </p>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <Link to="/pricing" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
          Back to pricing <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/dashboard" className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
          Go to dashboard
        </Link>
      </div>
    </StatusShell>
  );
}

export default Return;
export { Return };
