import { Link } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { QRCodeCanvas } from "qrcode.react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Link2,
  Plus,
  QrCode,
  Sparkles,
  UserRound,
} from "lucide-react";
import Hero from "../components/Hero";
import ShortenLink from "../components/ShortenLink";
import ProductCard from "../components/ProductCard";
import Featured from "../components/Featured";
import SocialProof from "../components/SocialProof";
import { SectionHeading } from "../components/ui/section-heading";
import { Badge } from "../components/ui/badge";
import { BackgroundBeams } from "../components/ui/background-beams";
import { GridPattern } from "../components/ui/grid-pattern";
import { Spotlight } from "../components/ui/spotlight";
import { buttonVariants } from "../components/ui/button";
import { BRAND, brandShortLink } from "../lib/brand";

const faqs = [
  {
    question: "What can I create with SGGS?",
    answer:
      "You can create branded short links, custom QR codes, and a public link-in-bio profile. Every short link can be tracked, copied, renamed, or deleted from your dashboard.",
  },
  {
    question: "Do I need a paid plan to start?",
    answer:
      "No. You can start with a free account, create links, and explore the QR and profile tools. Paid plans raise your link limit and extend access to the premium tools.",
  },
  {
    question: "Can I use my own custom back-half?",
    answer:
      `Yes. When you shorten a URL you can choose a memorable back-half, as long as it is available. Your link will look like ${brandShortLink("your-name")} instead of a random string.`,
  },
  {
    question: "Where do the analytics come from?",
    answer:
      "Every visit to one of your short links is recorded. Open the dashboard and choose a link to see its visit history as a simple daily trend.",
  },
  {
    question: "What is the link-in-bio page?",
    answer:
      "It is a shareable profile at /u/your-username with your photo, bio, and social links. You can update it whenever you like, then share one URL everywhere.",
  },
];

function ShortLinkVisual() {
  return (
    <div className="mt-5 space-y-2">
      {["portfolio", "launch"].map((slug, index) => (
        <div key={slug} className="flex items-center gap-2 rounded-xl border border-ink/10 bg-white px-3 py-2.5 shadow-sm">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
            <Link2 className="h-3 w-3" />
          </span>
          <span className="min-w-0 truncate text-[11px] font-semibold text-ink">{brandShortLink(slug)}</span>
          <span className="ml-auto text-[10px] text-muted">{index === 0 ? "842" : "2.1k"} clicks</span>
        </div>
      ))}
    </div>
  );
}

function QrVisual() {
  return (
    <div className="mt-5 flex items-center gap-3 rounded-2xl border border-ink/10 bg-white p-3">
      <div className="rounded-lg border border-ink/10 p-1.5">
        <QRCodeCanvas
          value={BRAND.url}
          size={62}
          bgColor="#ffffff"
          fgColor="#0b0b10"
          level="H"
          includeMargin={false}
        />
      </div>
      <div>
        <p className="text-[11px] font-semibold text-ink">Your colours. Your logo.</p>
        <p className="mt-1 text-[10px] leading-4 text-muted">One code, every surface.</p>
      </div>
    </div>
  );
}

function BioVisual() {
  return (
    <div className="mt-5 rounded-2xl border border-ink/10 bg-[#111118] p-3">
      <div className="flex flex-col items-center rounded-xl bg-white/[0.04] px-4 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-sky-400 text-[10px] font-bold text-white">
          SB
        </span>
        <span className="mt-2 text-[10px] font-semibold text-white">Your name</span>
        <div className="mt-3 w-full space-y-1.5">
          <div className="rounded-md bg-white/[0.08] py-1.5 text-center text-[8px] text-white/60">Portfolio</div>
          <div className="rounded-md bg-white/[0.08] py-1.5 text-center text-[8px] text-white/60">Latest work</div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const { isSignedIn } = useAuth();

  return (
    <>
      <Hero />

      <section id="shorten" className="section-space">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <SectionHeading
              eyebrow="The short-link studio"
              title={
                <>
                  Paste it. Shorten it.{" "}
                  <span className="text-gradient">Move on.</span>
                </>
              }
              description="Turn a long URL into something worth sharing. Add a custom back-half, get a matched QR code, and keep the click history in one place."
            />

            <div className="mt-8 space-y-4">
              {[
                "Custom back-halves that are easy to say out loud",
                "A downloadable QR code with every short link",
                "Visit history you can open from your dashboard",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-ink/65">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-medium text-ink/40">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-brand-500" /> No credit card
              </span>
              <span className="inline-flex items-center gap-1.5">
                <QrCode className="h-3.5 w-3.5 text-brand-500" /> QR included
              </span>
              <Link to="/pricing" className="inline-flex items-center gap-1 text-ink/60 underline decoration-ink/20 underline-offset-4 transition hover:text-ink">
                See plan limits <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <ShortenLink compact />
          </div>
        </div>
      </section>

      <Featured />

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Three tools, one home"
              title="Pick a starting point."
              description="Whether you need one short link or a whole profile, each tool is designed to work on its own — and better together."
            />
            <Link
              to="/services"
              className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-ink/55 transition hover:text-ink"
            >
              Open the full studio <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <ProductCard
              to="/shortenlink"
              icon={<Link2 className="h-5 w-5" />}
              eyebrow="Short links"
              title="Long URLs, shortened."
              description="A clean link for the bio, the group chat, or the back of a business card."
              cta="Create a short link"
            >
              <ShortLinkVisual />
            </ProductCard>

            <ProductCard
              to="/qrgenerate"
              icon={<QrCode className="h-5 w-5" />}
              eyebrow="QR studio"
              title="Codes with character."
              description="Pick colours, add a logo, and download a QR code that fits your brand."
              cta="Design a QR code"
              accent="sky"
            >
              <QrVisual />
            </ProductCard>

            <ProductCard
              to="/linktree"
              icon={<UserRound className="h-5 w-5" />}
              eyebrow="Link in bio"
              title="One page. Every link."
              description="A public profile with your photo, bio, and the places people should go next."
              cta="Build your page"
              accent="coral"
            >
              <BioVisual />
            </ProductCard>
          </div>
        </div>
      </section>

      <SocialProof />

      <section className="section-space">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <Badge variant="outline" className="mb-5 gap-1.5">
              <Sparkles className="h-3 w-3 text-brand-500" /> Good to know
            </Badge>
            <h2 className="font-display text-3xl font-semibold leading-[1.08] tracking-[-0.05em] text-ink sm:text-4xl">
              A few answers before you start.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
              Still curious? Reach out at{" "}
              <a href="mailto:hello@saibende.tech" className="font-medium text-ink underline decoration-ink/20 underline-offset-4 hover:text-brand-600">
                hello@saibende.tech
              </a>
              .
            </p>
          </div>

          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/50 transition group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50 group-open:text-brand-600">
                    <Plus className="h-3.5 w-3.5" />
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl pr-10 text-sm leading-6 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <div className="container-page">
          <div className="noise relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 sm:rounded-[2.75rem] sm:px-12 sm:py-20">
            <GridPattern stroke="rgba(255,255,255,0.07)" size={56} />
            <BackgroundBeams className="opacity-50" />
            <Spotlight className="-right-32 -top-40" fill="rgba(56,189,248,0.35)" />
            <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <Badge variant="dark-outline" className="mb-5 gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Your next link is waiting
                </Badge>
                <h2 className="max-w-2xl font-display text-3xl font-semibold leading-[1.05] tracking-[-0.055em] text-white sm:text-4xl lg:text-5xl">
                  Make the next thing you share{" "}
                  <span className="text-gradient-warm">easier to find.</span>
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-6 text-white/50">
                  Start with one link. Stay for the clean dashboard, the QR codes,
                  and the page that finally keeps everything together.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                  to={isSignedIn ? "/dashboard" : "/register"}
                  className={buttonVariants({ variant: "white", size: "xl", className: "w-full sm:w-auto" })}
                >
                  {isSignedIn ? "Open dashboard" : "Start for free"} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/pricing"
                  className={buttonVariants({ variant: "dark-outline", size: "xl", className: "w-full text-white sm:w-auto" })}
                >
                  Compare plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
