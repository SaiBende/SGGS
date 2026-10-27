import { SignIn, useAuth } from '@clerk/react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ArrowRight, KeyRound, ShieldCheck, Sparkles } from 'lucide-react';
import { AuthShell } from './ui/auth-shell';
import { Badge } from './ui/badge';
import { clerkAppearance } from '../utils/clerkAppearance';
import {
    clearAuthRedirect,
    readAuthRedirect,
    rememberAuthRedirect,
} from '../utils/authRedirect';

// Clerk's prebuilt <SignIn> handles password/email-code sign-in and MFA. The
// route is mounted at /login/* so Clerk can use path routing for its internal
// steps. Password reset is linked separately to the email-code reset page.
function Login() {
    const { isLoaded, isSignedIn } = useAuth();
    const location = useLocation();
    const from = location.state?.from;
    const remembered = from ? rememberAuthRedirect(from) : null;
    const redirectTo = remembered || readAuthRedirect();

    if (isLoaded && isSignedIn) {
        clearAuthRedirect();
        return <Navigate to={redirectTo} replace />;
    }

    return (
        <AuthShell>
            <div className="mb-7">
                <Badge variant="brand" className="mb-4 gap-1.5">
                    <Sparkles className="h-3 w-3" /> Welcome back
                </Badge>
                <h1 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-ink">
                    Sign in to your studio.
                </h1>
                <p className="mt-2 text-[13px] leading-6 text-muted">
                    Pick up where you left off. Your links, QR codes and page are waiting.
                </p>
            </div>

            <div className="auth-clerk min-w-0">
                <SignIn
                    routing="path"
                    path="/login"
                    signUpUrl="/register"
                    fallbackRedirectUrl={redirectTo}
                    appearance={clerkAppearance}
                />
            </div>

            <div className="mt-5 flex items-center justify-between gap-4 border-t border-ink/10 pt-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-muted">
                    <KeyRound className="h-3.5 w-3.5 text-ink/35" /> Forgot your password?
                </span>
                <Link
                    to="/forgot-password"
                    className="inline-flex items-center gap-1 text-[12px] font-semibold text-brand-700 transition hover:text-brand-800"
                >
                    Reset it <ArrowRight className="h-3 w-3" />
                </Link>
            </div>

            <p className="mt-5 flex items-center gap-1.5 text-[10px] text-ink/35">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                Secure authentication powered by Clerk.
            </p>
        </AuthShell>
    );
}

export default Login;
