import { Link } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import { BackgroundBeams } from "./ui/background-beams";
import { BrandMark } from "./ui/brand-mark";
import { buttonVariants } from "./ui/button";
import { Badge } from "./ui/badge";

const productLinks = [
  { label: "Short links", to: "/services" },
  { label: "QR studio", to: "/qrgenerate" },
  { label: "Link in bio", to: "/linktree" },
  { label: "Dashboard", to: "/dashboard" },
];

const companyLinks = [
  { label: "About", to: "/about" },
  { label: "Pricing", to: "/pricing" },
  { label: "All tools", to: "/services" },
  { label: "Sign in", to: "/login" },
];

function Footer() {
  const { isSignedIn } = useAuth();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <BackgroundBeams className="opacity-40" />
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-48 w-[45rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[100px]" />

      <div className="container-page relative">
        <div className="border-b border-white/10 py-14 sm:py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Badge variant="dark-outline" className="mb-5 gap-2 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Built for every click
              </Badge>
              <h2 className="max-w-xl font-display text-3xl font-semibold leading-[1.08] tracking-[-0.05em] sm:text-4xl">
                Make every link work{" "}
                <span className="text-gradient-warm">a little harder.</span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/50">
                Short links, beautiful QR codes and a link-in-bio page. All in one
                calm, fast workspace.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to={isSignedIn ? "/dashboard" : "/register"}
                  className={buttonVariants({ variant: "white", size: "md", className: "rounded-full" })}
                >
                  {isSignedIn ? "Open dashboard" : "Start free"} <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/pricing"
                  className={buttonVariants({ variant: "dark-outline", size: "md", className: "rounded-full text-white" })}
                >
                  See plans
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:pl-10">
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">Product</h3>
                <ul className="mt-4 space-y-3">
                  {productLinks.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-white/60 transition hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">Company</h3>
                <ul className="mt-4 space-y-3">
                  {companyLinks.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-white/60 transition hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 py-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <BrandMark size="sm" className="border border-white/15" />
            <span className="font-display text-sm font-bold tracking-[-0.03em] text-white/80">SGGS</span>
            <span className="text-white/20">/</span>
            <span>Link infrastructure for people who share.</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="mailto:hello@saibende.tech" className="inline-flex items-center gap-1.5 transition hover:text-white">
              <Mail className="h-3.5 w-3.5" /> hello@saibende.tech
            </a>
            <span>© {year} SGGS</span>
            <a
              href="https://saibende.tech"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5" /> Built by Sai Bende
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
