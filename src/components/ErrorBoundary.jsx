import React from 'react';

// Catches render-time crashes anywhere in the tree below, so users get a
// friendly fallback instead of a blank white screen.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Uncaught render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-paper px-5 py-12">
          <div className="w-full max-w-md overflow-hidden rounded-[2rem] border border-ink/10 bg-white text-center shadow-card">
            <div className="h-1 w-full bg-brand-gradient" />
            <div className="p-7 sm:p-9">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM10.34 3.94 1.97 18a2.02 2.02 0 0 0 1.73 3h16.6a2.02 2.02 0 0 0 1.73-3L13.66 3.94a2.02 2.02 0 0 0-3.32 0z"
                  />
                </svg>
              </span>
              <h1 className="mt-5 font-display text-2xl font-semibold tracking-[-0.04em] text-ink">
                Something went sideways.
              </h1>
              <p className="mt-2 text-sm leading-6 text-muted">
                An unexpected error stopped this page from rendering. Reloading
                usually fixes it.
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-ink px-5 text-sm font-semibold text-white transition hover:bg-brand-600"
                >
                  Reload page
                </button>
                <a
                  href="/"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-ink/15 bg-white px-5 text-sm font-semibold text-ink transition hover:border-ink/25"
                >
                  Back home
                </a>
              </div>
            </div>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
