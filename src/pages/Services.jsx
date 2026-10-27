import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Link2,
  QrCode,
  Sparkles,
  UserRound,
} from "lucide-react";
import ShortenLink from "../components/ShortenLink";
import { PageHero, SectionHeading } from "../components/ui/section-heading";
import { Badge } from "../components/ui/badge";
import { buttonVariants } from "../components/ui/button";
import { SpotlightCard } from "../components/ui/card";
import { SocialIcon } from "../components/ui/social-icon";
import { brandShortLink } from "../lib/brand";

const tools = [
  {
    icon: Link2,
    title: "Short links",
    description: "Make a long URL memorable with a clean short link and a custom back-half.",
    to: "/shortenlink",
    cta: "Open shortener",
    accent: "bg-brand-50 text-brand-600",
    visual: (
      <div className="mt-5 space-y-2">
        {["podcast", "menu"].map((slug) => (
          <div key={slug} className="flex items-center gap-2 rounded-xl border border-ink/10 bg-white px-3 py-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
              <Link2 className="h-3 w-3" />
            </span>
            <span className="min-w-0 flex-1 truncate text-[11px] font-semibold text-ink">{brandShortLink(slug)}</span>
            <span className="ml-auto text-[10px] text-muted">ready</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: QrCode,
    title: "QR studio",
    description: "Choose your colours, add a logo and download a QR code made for your brand.",
    to: "/qrgenerate",
    cta: "Open QR studio",
    accent: "bg-sky-50 text-sky-600",
    visual: (
      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-ink/10 bg-white p-3">
        <div className="grid h-14 w-14 grid-cols-4 gap-0.5 rounded-lg bg-ink p-1.5">
          {Array.from({ length: 16 }).map((_, index) => (
            <span key={index} className={(index * 7) % 3 === 0 ? "rounded-sm bg-white" : "rounded-sm bg-ink"} />
          ))}
        </div>
        <div>
          <p className="text-[11px] font-semibold text-ink">Scan-ready</p>
          <p className="mt-1 text-[10px] text-muted">PNG · high resolution</p>
        </div>
      </div>
    ),
  },
  {
    icon: UserRound,
    title: "Link in bio",
    description: "One public page for your photo, bio and every link worth sharing.",
    to: "/linktree",
    cta: "Open profile builder",
    accent: "bg-coral-400/10 text-coral-600",
    visual: (
      <div className="mt-5 rounded-2xl border border-ink/10 bg-[#111118] p-3">
        <div className="flex flex-col items-center rounded-xl bg-white/[0.04] px-3 py-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-sky-400 text-[9px] font-bold text-white">SB</span>
          <span className="mt-2 text-[10px] font-semibold text-white">@yourname</span>
          <div className="mt-2 grid w-full gap-1.5">
            {["Portfolio", "Say hello"].map((label) => (
              <span key={label} className="rounded-md border border-white/10 bg-white/[0.06] py-1 text-center text-[8px] text-white/55">{label}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

function Services() {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="The studio"
        title={
          <>
            One small studio for{" "}
            <span className="text-gradient">every link you share.</span>
          </>
        }
        description="Create the link, shape the code, and give everything a home. Three focused tools that work better together."
        actions={
          <>
            <Link to="/register" className={buttonVariants({ variant: "primary", size: "lg" })}>
              Get started free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/pricing" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              See plans
            </Link>
          </>
        }
      />

      <section className="container-page">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {tools.map((tool) => (
            <SpotlightCard key={tool.title} className="flex h-full flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tool.accent}`}>
                  <tool.icon className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-ink/10 bg-canvas px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">Included</span>
              </div>
              <h2 className="mt-5 font-display text-xl font-semibold tracking-[-0.035em] text-ink">{tool.title}</h2>
              <p className="mt-2 text-[13px] leading-6 text-muted">{tool.description}</p>
              <div className="flex-1">{tool.visual}</div>
              <Link to={tool.to} className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink transition hover:text-brand-600">
                {tool.cta} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="container-page">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <SectionHeading
                eyebrow="Try it now"
                title={
                  <>
                    A cleaner link is{" "}
                    <span className="text-gradient">one paste away.</span>
                  </>
                }
                description="Start with the shortener. You can add a custom back-half, copy the result, and download its QR code immediately."
              />
              <div className="mt-7 space-y-4">
                {[
                  "Paste the URL you want people to reach",
                  "Choose a short back-half if you want one",
                  "Copy the link or download the matching QR code",
                ].map((step, index) => (
                  <div key={step} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[13px] leading-6 text-ink/60">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex items-center gap-2 text-[11px] text-muted">
                <Check className="h-3.5 w-3.5 text-emerald-500" /> No setup fee. No credit card.
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <ShortenLink />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Badge variant="brand" className="mb-3 gap-1.5">
                <Sparkles className="h-3 w-3" /> More than a shortener
              </Badge>
              <h2 className="font-display text-2xl font-semibold tracking-[-0.04em] text-ink sm:text-3xl">
                Ready to see what your links can do?
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
                Create a free account and keep every link, QR code and page in one place.
              </p>
            </div>
            <Link to="/register" className={buttonVariants({ variant: "primary", size: "lg", className: "shrink-0" })}>
              Create your account <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-3 border-t border-ink/10 pt-6 sm:grid-cols-3">
            {[
              { icon: BarChart3, label: "Visit history" },
              { icon: QrCode, label: "QR download" },
              { icon: SocialIcon, label: "Social links" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-[12px] font-medium text-ink/55">
                <item.icon className="h-4 w-4 text-brand-500" /> {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
