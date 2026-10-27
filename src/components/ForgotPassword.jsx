import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth, useSignIn } from '@clerk/react';
import { toast } from 'react-toastify';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  KeyRound,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { AuthShell } from './ui/auth-shell';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input, Label } from './ui/input';
import { cn } from '../lib/utils';
import { clearAuthRedirect, readAuthRedirect } from '../utils/authRedirect';

const errorMessage = (error) => {
  const first = error?.errors?.[0];
  return (
    first?.longMessage ||
    first?.message ||
    error?.message ||
    'Something went wrong. Please try again.'
  );
};

const steps = [
  { id: 'request', label: 'Email', icon: Mail },
  { id: 'verify', label: 'Code', icon: KeyRound },
  { id: 'password', label: 'Password', icon: LockKeyhole },
];

// Clerk's prebuilt <SignIn> does not expose its reset link on instances with
// non-strict enumeration protection, so this page starts Clerk's standard
// email-code reset flow while the sign-in and sign-up pages stay prebuilt.
function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState('request');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirectTo] = useState(() => readAuthRedirect());

  const { isLoaded, isSignedIn } = useAuth();
  const { signIn, fetchStatus } = useSignIn();
  const navigate = useNavigate();

  if (isLoaded && isSignedIn) {
    clearAuthRedirect();
    return <Navigate to={redirectTo} replace />;
  }

  const busy = !isLoaded || loading || fetchStatus === 'fetching';
  const currentIndex = steps.findIndex((item) => item.id === step);

  const run = async (action) => {
    setError(null);
    setLoading(true);
    try {
      await action();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setError('Enter the email address you use for SGGS.');
      return;
    }

    run(async () => {
      const { error: createError } = await signIn.create({
        identifier: email.trim(),
      });
      if (createError) throw createError;

      const { error: sendError } = await signIn.resetPasswordEmailCode.sendCode();
      if (sendError) throw sendError;

      toast.success('Verification code sent');
      setStep('verify');
    });
  };

  const handleVerify = (event) => {
    event.preventDefault();
    if (!code.trim()) {
      setError('Enter the code from your email.');
      return;
    }

    run(async () => {
      const { error: verifyError } = await signIn.resetPasswordEmailCode.verifyCode({
        code: code.trim(),
      });
      if (verifyError) throw verifyError;

      setStep('password');
    });
  };

  const handleReset = (event) => {
    event.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    run(async () => {
      const { error: resetError } = await signIn.resetPasswordEmailCode.submitPassword({
        password,
      });
      if (resetError) throw resetError;

      if (signIn.status === 'complete') {
        const { error: finalizeError } = await signIn.finalize();
        if (finalizeError) throw finalizeError;
        clearAuthRedirect();
        toast.success('Password reset. You are now signed in.');
        navigate(redirectTo, { replace: true });
        return;
      }

      clearAuthRedirect();
      toast.success('Password updated. Please sign in with your new password.');
      navigate('/login', { replace: true });
    });
  };

  const startOver = () => {
    setCode('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
    setStep('request');
  };

  return (
    <AuthShell>
      <div className="mb-7">
        <Badge variant="brand" className="mb-4 gap-1.5">
          <KeyRound className="h-3 w-3" /> Account recovery
        </Badge>
        <h1 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-ink">
          Reset your password.
        </h1>
        <p className="mt-2 text-[13px] leading-6 text-muted">
          {step === 'request' && 'Enter your account email and we will send a verification code.'}
          {step === 'verify' && `Enter the code we sent to ${email.trim()}.`}
          {step === 'password' && 'Choose a new password for your account.'}
        </p>
      </div>

      <div className="mb-6 flex items-center gap-1.5" aria-label="Recovery progress">
        {steps.map((item, index) => {
          const complete = index < currentIndex;
          const active = index === currentIndex;
          return (
            <div key={item.id} className="flex flex-1 items-center gap-1.5">
              <span
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold transition',
                  complete && 'border-emerald-200 bg-emerald-50 text-emerald-600',
                  active && 'border-brand-300 bg-brand-50 text-brand-700',
                  !complete && !active && 'border-ink/10 bg-canvas text-ink/30'
                )}
              >
                {complete ? <Check className="h-3 w-3" /> : index + 1}
              </span>
              <span
                className={cn(
                  'text-[10px] font-semibold',
                  active ? 'text-ink/70' : 'text-ink/30'
                )}
              >
                {item.label}
              </span>
              {index < steps.length - 1 && (
                <span
                  className={cn(
                    'h-px flex-1',
                    index < currentIndex ? 'bg-emerald-200' : 'bg-ink/10'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {error && (
        <div
          className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] leading-5 text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}

      {step === 'request' && (
        <form className="space-y-4" onSubmit={handleRequest}>
          <div>
            <Label htmlFor="reset-email" required>
              Email address
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
              <Input
                id="reset-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="pl-10"
                placeholder="you@example.com"
                autoFocus
              />
            </div>
          </div>
          <Button type="submit" variant="primary" size="lg" disabled={busy} className="w-full">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
            {busy ? 'Sending code...' : 'Send reset code'}
            {!busy && <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>
      )}

      {step === 'verify' && (
        <form className="space-y-4" onSubmit={handleVerify}>
          <div>
            <Label htmlFor="reset-code" required>
              Verification code
            </Label>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
              <Input
                id="reset-code"
                name="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                value={code}
                onChange={(event) => setCode(event.target.value)}
                className="pl-10 tracking-[0.25em]"
                placeholder="Enter the code"
                autoFocus
              />
            </div>
          </div>
          <Button type="submit" variant="primary" size="lg" disabled={busy} className="w-full">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            {busy ? 'Verifying...' : 'Verify code'}
          </Button>
          <Button type="button" variant="ghost" size="md" onClick={startOver} disabled={busy} className="w-full">
            Use a different email
          </Button>
        </form>
      )}

      {step === 'password' && (
        <form className="space-y-4" onSubmit={handleReset}>
          <div>
            <Label htmlFor="reset-password" required>
              New password
            </Label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
              <Input
                id="reset-password"
                name="new-password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="pl-10"
                placeholder="At least 8 characters"
                autoFocus
              />
            </div>
          </div>
          <div>
            <Label htmlFor="reset-confirm-password" required>
              Confirm new password
            </Label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
              <Input
                id="reset-confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="pl-10"
                placeholder="Repeat your new password"
              />
            </div>
          </div>
          <Button type="submit" variant="primary" size="lg" disabled={busy} className="w-full">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
            {busy ? 'Resetting...' : 'Reset password'}
          </Button>
        </form>
      )}

      <div className="mt-6 flex items-center justify-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink/50 transition hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
        </Link>
      </div>
    </AuthShell>
  );
}

export default ForgotPassword;
