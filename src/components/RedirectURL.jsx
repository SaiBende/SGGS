import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, Link2, Loader2 } from 'lucide-react';
import ErrorState from './ErrorState';
import { Badge } from './ui/badge';
import { buttonVariants } from './ui/button';

function RedirectURL() {
  const { shortId } = useParams();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchRedirectURL = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${shortId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.redirectURL) {
            window.location.href = data.redirectURL;
            return;
          }
        }
        if (!cancelled) setNotFound(true);
      } catch (error) {
        console.error('Error fetching redirect URL:', error);
        if (!cancelled) setNotFound(true);
      }
    };

    fetchRedirectURL();

    return () => {
      cancelled = true;
    };
  }, [shortId]);

  if (notFound) {
    return (
      <section className="container-page py-16">
        <div className="mx-auto max-w-lg overflow-hidden rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
          <ErrorState
            title="This link has gone missing"
            message={`The short link "${shortId}" doesn't exist or was deleted.`}
            className="py-6"
          >
            <Link to="/" className={buttonVariants({ variant: 'primary', size: 'md' })}>
              Back to home
            </Link>
          </ErrorState>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page flex min-h-[65vh] items-center justify-center py-14">
      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-card">
        <div className="h-1 w-full bg-brand-gradient" />
        <div className="p-7 text-center sm:p-9">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 text-brand-600">
            <Link2 className="h-6 w-6" />
          </div>
          <Badge variant="brand" className="mt-5 gap-1.5">
            <Loader2 className="h-3 w-3 animate-spin" /> Redirecting
          </Badge>
          <h1 className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em] text-ink">
            Taking you there.
          </h1>
          <p className="mx-auto mt-2 max-w-xs text-[13px] leading-6 text-muted">
            Opening <span className="font-semibold text-ink">/{shortId}</span>. This
            should only take a moment.
          </p>

          <div className="mt-7 flex items-center justify-center gap-1.5">
            {[0, 1, 2].map((item) => (
              <span
                key={item}
                className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-brand-400"
                style={{ animationDelay: `${item * 180}ms` }}
              />
            ))}
          </div>

          <a
            href={`${import.meta.env.VITE_API_URL}/${shortId}`}
            className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-semibold text-ink/45 transition hover:text-brand-600"
          >
            Taking too long? Open manually <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default RedirectURL;
