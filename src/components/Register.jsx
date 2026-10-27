import { SignUp, useAuth } from '@clerk/react';
import { Navigate } from 'react-router-dom';
import { Check, ShieldCheck, Sparkles, UserRound } from 'lucide-react';
import { AuthShell } from './ui/auth-shell';
import { Badge } from './ui/badge';
import { clerkAppearance } from '../utils/clerkAppearance';
import { clearAuthRedirect, readAuthRedirect } from '../utils/authRedirect';

// Clerk's prebuilt <SignUp> handles email verification and any password
// completion steps. No app-specific username is collected; the backend
// generates a unique MongoDB username from the verified email address.
function Register() {
    const { isLoaded, isSignedIn } = useAuth();
    const redirectTo = readAuthRedirect();

    if (isLoaded && isSignedIn) {
        clearAuthRedirect();
        return <Navigate to={redirectTo} replace />;
    }

    return (
        <AuthShell>
            <div className="mb-7">
                <Badge variant="brand" className="mb-4 gap-1.5">
                    <Sparkles className="h-3 w-3" /> Start free
                </Badge>
                <h1 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-ink">
                    Create your studio.
                </h1>
                <p className="mt-2 text-[13px] leading-6 text-muted">
                    One account for your short links, QR codes and public page.
                    No credit card needed.
                </p>
            </div>

            <div className="auth-clerk min-w-0">
                <SignUp
                    routing="path"
                    path="/register"
                    signInUrl="/login"
                    fallbackRedirectUrl={redirectTo}
                    appearance={clerkAppearance}
                />
            </div>

            <div className="mt-5 rounded-xl border border-ink/10 bg-canvas p-3">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-ink/70">
                    <UserRound className="h-3.5 w-3.5 text-brand-500" /> Your public username is generated automatically.
                </p>
                <p className="mt-1 pl-5 text-[10px] leading-5 text-muted">
                    We use the first part of your verified email. You can edit your
                    page details later.
                </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-ink/35">
                <span className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> Free to start
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Secure by Clerk
                </span>
            </div>
        </AuthShell>
    );
}

export default Register;
