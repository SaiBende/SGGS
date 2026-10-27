import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Link2,
  LockKeyhole,
  Sparkles,
  Wand2,
} from "lucide-react";
import { PageHero, SectionHeading } from "../components/ui/section-heading";
import { Badge } from "../components/ui/badge";
import { buttonVariants } from "../components/ui/button";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import { BackgroundBeams } from "../components/ui/background-beams";
import { GridPattern } from "../components/ui/grid-pattern";

const values = [
  {
    icon: Wand2,
    title: "Make it feel considered",
    description: "Good tools should disappear into the work. We sweat the small details so your links feel like part of your brand.",
  },
  {
    icon: LockKeyhole,
    title: "Keep it yours",
    description: "Your links, your data, your page. We build with clear ownership in mind, not lock-in.",
  },
  {
    icon: Heart,
    title: "Stay useful",
    description: "No feature for the sake of a feature. Every surface earns its place by making sharing a little easier.",
  },
];

function About() {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="About SGGS"
        title={
          <>
            A calmer home for the links{" "}
            <span className="text-gradient">you share.</span>
          </>
        }
        description="SGGS started with a simple frustration: a link should not be the least considered part of something you made. So we built a small studio for short links, QR codes, and one very good profile page."
        actions={
          <>
            <Link to="/register" className={buttonVariants({ variant: "primary", size: "lg" })}>
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://saibende.tech"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Meet the maker <ArrowUpRight className="h-4 w-4" />
            </a>
          </>
        }
      />

      <section className="container-page">
        <div className="grid grid-cols-1 gap-10 border-y border-ink/10 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:py-20">
          <div>
            <Badge variant="outline" className="mb-5 gap-1.5">
              <Sparkles className="h-3 w-3 text-brand-500" /> The short version
            </Badge>
            <h2 className="font-display text-3xl font-semibold leading-[1.08] tracking-[-0.05em] text-ink sm:text-4xl">
              Built by one person who cares a little too much about links.
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-muted">
              <p>
                SGGS is a link-management workspace built by{" "}
                <a
                  href="https://saibende.tech"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-ink underline decoration-ink/20 underline-offset-4 transition hover:text-brand-600"
                >
                  Sai Bende
                </a>
                . It brings together the three things most people end up
                juggling: a shortener, a QR code maker, and a link-in-bio page.
              </p>
              <p>
                The goal is not to become another dashboard you dread opening.
                It is to make the small act of sharing a link feel intentional:
                a clean URL, a code that scans, a page that looks like you.
              </p>
              <p>
                The product is deliberately focused. Create a link, understand
                how it performs, and keep the experience calm. That is the whole
                idea.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Short links", "QR codes", "Link in bio", "Click history", "Built in India"].map((item) => (
                <span key={item} className="rounded-full border border-ink/10 bg-white px-3 py-1.5 text-[11px] font-medium text-ink/55 shadow-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-ink/10 bg-[#111118] p-5 shadow-float">
              <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-brand-500/30 via-[#171725] to-sky-400/20">
                <GridPattern stroke="rgba(255,255,255,0.08)" size={32} />
                <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-gradient-to-br from-brand-400 to-sky-400 text-4xl font-bold text-white">
                  <span>SB</span>
                  <img
                    src="https://res.cloudinary.com/sggs/image/upload/v1733195387/user_profile_photos/Firefly_20231020202317-nobg1_e52pal.png"
                    alt="Sai Bende"
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-lg font-semibold tracking-[-0.03em] text-white">Sai Bende</p>
                  <p className="mt-1 text-[11px] text-white/40">Designer & builder · SGGS</p>
                </div>
                <a
                  href="https://saibende.tech"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-[11px] font-semibold text-white/70 transition hover:bg-white/[0.1] hover:text-white"
                >
                  Website <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-3 hidden rounded-2xl border border-ink/10 bg-white p-3 shadow-float sm:block">
              <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-ink/35">Currently building</p>
              <p className="mt-1 font-display text-[13px] font-semibold text-ink">A better place for links.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we believe"
            title="Small surfaces. Real care."
            description="These are the three ideas that shape every screen, flow and empty state."
            align="center"
          />
          <BentoGrid className="mt-10">
            {values.map((value, index) => (
              <BentoGridItem
                key={value.title}
                className={index === 0 ? "md:col-span-2" : "md:col-span-2"}
                icon={<value.icon className="h-5 w-5" />}
                title={value.title}
                description={value.description}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      <section className="container-page">
        <div className="noise relative overflow-hidden rounded-[2rem] bg-ink px-6 py-12 sm:rounded-[2.5rem] sm:px-10 sm:py-16">
          <BackgroundBeams className="opacity-40" />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-brand-300">
              <Link2 className="h-5 w-5" />
            </span>
            <blockquote className="mt-5 font-display text-2xl font-medium leading-[1.3] tracking-[-0.03em] text-white sm:text-3xl">
              “The internet is a pile of links. We just want them to feel a
              little more human.”
            </blockquote>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">Sai Bende, maker</p>
            <div className="mt-7">
              <Link to="/register" className={buttonVariants({ variant: "white", size: "md", className: "rounded-full" })}>
                Build your page <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
