import { Link } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import {
  ArrowRight,
  BarChart3,
  Check,
  Copy,
  Link2,
  MousePointerClick,
  QrCode,
  Zap,
} from "lucide-react";
import { brandShortLink, brandUrl } from "../lib/brand";
import { BackgroundBeams } from "./ui/background-beams";
import { GridPattern } from "./ui/grid-pattern";
import { Spotlight } from "./ui/spotlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { Badge } from "./ui/badge";
import { buttonVariants } from "./ui/button";

const LOGO_URL =
  "https://res.cloudinary.com/sggs/image/upload/v1731136210/user_profile_photos/logo_yqftnr.png";

const principles = [
  { letter: "S", label: "Shorten" },
  { letter: "G", label: "Generate" },
  { letter: "G", label: "Group" },
  { letter: "S", label: "Share" },
];

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[470px] lg:ml-auto">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[25rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/25 blur-[100px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, rotate: 1.5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/[0.07] p-2.5 shadow-2xl backdrop-blur-xl"
      >
        <div className="rounded-[1.35rem] border border-white/10 bg-[#111118] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/20 text-brand-300">
                <Link2 className="h-3.5 w-3.5" />
              </span>
              <span className="text-[11px] font-semibold text-white/70">Create a link</span>
            </div>
            <Badge variant="dark-outline" className="border-emerald-400/20 bg-emerald-400/10 text-[9px] text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
            </Badge>
          </div>

          <div className="mt-5">
            <div className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3">
              <Link2 className="h-3.5 w-3.5 shrink-0 text-white/30" />
              <span className="truncate text-[11px] text-white/40">https://your-long-url.com/launch</span>
              <span className="ml-auto hidden h-7 shrink-0 items-center rounded-lg bg-white px-2.5 text-[10px] font-bold text-ink sm:flex">
                Shorten
              </span>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-white/10 bg-white p-3.5 text-ink shadow-xl">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-2.5 w-2.5" />
                </span>
                Link ready
              </span>
              <span className="text-[9px] font-medium text-ink/35">just now</span>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-[12px] font-bold tracking-[-0.04em] text-ink sm:text-[18px]">
                  {brandShortLink("launch")}
                </p>
                <div className="mt-2 flex items-center gap-2 text-[10px] text-muted">
                  <span className="flex items-center gap-1">
                    <MousePointerClick className="h-3 w-3 text-brand-500" /> 1,284 clicks
                  </span>
                  <span className="h-1 w-1 rounded-full bg-ink/15" />
                  <span className="flex items-center gap-1">
                    <QrCode className="h-3 w-3 text-brand-500" /> QR ready
                  </span>
                </div>
              </div>
              <div className="rounded-xl border border-ink/10 bg-white p-1.5">
                <QRCodeCanvas
                  value={brandUrl("launch")}
                  size={56}
                  bgColor="#ffffff"
                  fgColor="#0b0b10"
                  level="H"
                  imageSettings={{ src: LOGO_URL, height: 12, width: 12, excavate: true }}
                  includeMargin={false}
                />
              </div>
            </div>

            <div className="mt-3 flex gap-1.5">
              <div className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-ink text-[10px] font-semibold text-white">
                <Copy className="h-3 w-3" /> Copy link
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink/10 text-ink/45">
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
            <div className="flex items-center gap-2 text-[10px] text-white/45">
              <Zap className="h-3 w-3 text-amber-300" />
              Scan to open
            </div>
            <div className="flex items-end gap-[3px]">
              {[7, 12, 9, 16, 11, 20, 14, 24, 18, 28, 22].map((height, index) => (
                <motion.span
                  key={index}
                  className="w-1 rounded-full bg-gradient-to-t from-brand-500 to-sky-300"
                  initial={{ height: 3 }}
                  animate={{ height: `${height}px` }}
                  transition={{ delay: 0.7 + index * 0.045, duration: 0.5 }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 16, y: -8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="absolute -right-2 -top-6 z-20 hidden rounded-2xl border border-white/15 bg-white/[0.09] p-3 shadow-xl backdrop-blur-xl sm:block"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
            <BarChart3 className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/35">This week</p>
            <p className="font-display text-lg font-semibold leading-none text-white">+28.4%</p>
          </div>
        </div>
        <div className="mt-3 flex h-8 items-end gap-1">
          {[20, 35, 28, 50, 42, 68, 56, 84].map((height, index) => (
            <span
              key={index}
              className="w-1.5 rounded-full bg-gradient-to-t from-brand-400/40 to-sky-300/80"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="absolute -bottom-4 -left-3 z-20 flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.09] py-2 pl-2 pr-4 shadow-xl backdrop-blur-xl sm:-left-8"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400 text-ink">
          <Check className="h-3.5 w-3.5" />
        </span>
        <div>
          <p className="text-[10px] font-semibold text-white">Link copied</p>
          <p className="text-[9px] text-white/35">Paste it anywhere</p>
        </div>
      </motion.div>
    </div>
  );
}

function Hero() {
  const { isSignedIn } = useAuth();
  const primaryTo = isSignedIn ? "/dashboard" : "/register";

  return (
    <section className="container-wide pt-5 sm:pt-7">
      <div className="noise relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink px-5 py-12 sm:rounded-[2.75rem] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
        <GridPattern stroke="rgba(255,255,255,0.07)" size={56} />
        <BackgroundBeams className="opacity-60" />
        <Spotlight className="-left-24 -top-32" fill="rgba(109,94,246,0.55)" />
        <div aria-hidden="true" className="absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-sky-400/10 blur-[90px]" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.17em] text-white/60 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-300 shadow-[0_0_12px_rgba(165,168,255,0.9)]" />
              Shorten · Generate · Group &amp; Share
            </motion.div>

            <h1 className="mt-6 max-w-[620px] font-display text-[3.05rem] font-semibold leading-[0.98] tracking-[-0.065em] text-white sm:text-6xl lg:text-[4.5rem]">
              <TextGenerateEffect words="Make every link" />
              <span className="mt-1 block text-gradient-warm">
                <TextGenerateEffect words="count." delay={0.22} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-6 max-w-lg text-[15px] leading-7 text-white/55 sm:text-base sm:leading-8"
            >
              Shorten the link. Generate the QR. Group your links, bio and
              analytics. Share it all from one calm workspace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                to={primaryTo}
                className={buttonVariants({
                  variant: "white",
                  size: "xl",
                  className: "group w-full sm:w-auto",
                })}
              >
                {isSignedIn ? "Open your dashboard" : "Start shortening free"}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/services"
                className={buttonVariants({
                  variant: "dark-outline",
                  size: "xl",
                  className: "w-full text-white sm:w-auto",
                })}
              >
                Explore the tools
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-white/35"
            >
              {["No credit card", "Free to start", "Built for creators"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-400" /> {item}
                </span>
              ))}
            </motion.div>
          </div>

          <HeroVisual />
        </div>

        <div className="relative z-10 mt-12 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6 sm:mt-16">
          <span className="mr-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">
            SGGS, in four moves
          </span>
          {principles.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-white/55"
            >
              <span className="font-display text-[10px] font-bold tracking-[0.04em] text-brand-300">
                {item.letter}
              </span>
              <span className="h-3 w-px bg-white/10" />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
