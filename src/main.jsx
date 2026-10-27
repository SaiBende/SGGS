import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import '@fontsource-variable/inter'
import '@fontsource-variable/manrope'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import './index.css'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {publishableKey ? (
      <ClerkProvider publishableKey={publishableKey}>
        <App />
      </ClerkProvider>
    ) : (
      <main className="flex min-h-screen items-center justify-center bg-paper px-5 py-12">
        <div className="w-full max-w-lg rounded-[2rem] border border-amber-200 bg-white p-6 shadow-card sm:p-8">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
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
          <h1 className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em] text-ink">
            Clerk is not configured
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            Add <code className="rounded bg-canvas px-1.5 py-0.5 font-mono text-[12px] text-ink">VITE_CLERK_PUBLISHABLE_KEY</code> to
            <code className="mx-1 rounded bg-canvas px-1.5 py-0.5 font-mono text-[12px] text-ink">SGGS/.env</code>
            (or your host&apos;s environment variables) and restart the dev server.
          </p>
        </div>
      </main>
    )}
  </StrictMode>,
)
