import { Link } from "react-router-dom";
import { Check, Link2, QrCode, Sparkles, UserRound } from "lucide-react";
import { BackgroundBeams } from "./background-beams";
import { GridPattern } from "./grid-pattern";
import { Spotlight } from "./spotlight";
import { Badge } from "./badge";
import { BrandMark } from "./brand-mark";

const benefits = [
  { icon: Link2, label: "Branded short links" },
  { icon: QrCode, label: "QR codes with your logo" },
  { icon: UserRound, label: "A link-in-bio page" },
  { icon: Sparkles, label: "Click history and trends" },
];

export function AuthShell({ children }) {
  return (
    <section className="container-wide py-5 sm:py-8 lg:py-10">
      <div className="mx-auto grid w-full min-h-[calc(100vh-10rem)] max-w-[1180px] grid-cols-1 overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-card lg:grid-cols-[0.92fr_1.08fr]">
        <aside className="noise relative hidden overflow-hidden bg-ink p-10 lg:flex lg:flex-col lg:justify-between xl:p-12">
          <GridPattern stroke="rgba(255,255,255,0.06)" size={52} />
          <BackgroundBeams className="opacity-50" />
          <Spotlight className="-left-40 -top-40" fill="rgba(109,94,246,0.48)" />
          <div aria-hidden="true" className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-sky-400/10 blur-[90px]" />

          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <BrandMark className="border border-white/10" />
              <span className="font-display text-lg font-extrabold tracking-[-0.05em] text-white">SGGS</span>
            </Link>

            <div className="mt-16 max-w-sm">
              <Badge variant="dark-outline" className="mb-5 gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> One workspace
              </Badge>
              <h1 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.06em] text-white">
                Every link you share,{" "}
                <span className="text-gradient-warm">in one calm place.</span>
              </h1>
              <p className="mt-5 text-sm leading-6 text-white/45">
                Create short links, design QR codes, and keep your public page
                looking like you. No detours.
              </p>
            </div>

            <ul className="mt-9 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit.label} className="flex items-center gap-3 text-[12px] text-white/55">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-brand-300">
                    <benefit.icon className="h-3 w-3" />
                  </span>
                  {benefit.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 flex items-center gap-3 border-t border-white/10 pt-5 text-[10px] text-white/25">
            <span className="flex items-center gap-1.5">
              <Check className="h-3 w-3 text-emerald-400" /> Secure by Clerk
            </span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Built by Sai Bende</span>
          </div>
        </aside>

        <div className="flex min-w-0 items-center justify-center px-5 py-9 sm:px-10 sm:py-12">
          <div className="w-full min-w-0 max-w-[420px]">
            <Link to="/" className="mb-8 inline-flex items-center gap-2 lg:hidden">
              <BrandMark size="sm" />
              <span className="font-display text-base font-extrabold tracking-[-0.05em] text-ink">SGGS</span>
            </Link>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthShell;
