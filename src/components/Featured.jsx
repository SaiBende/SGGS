import {
  ArrowUpRight,
  BarChart3,
  Link2,
  MousePointerClick,
  QrCode,
  Sparkles,
  UserRound,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { BRAND, brandShortLink, brandUrl } from "../lib/brand";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { SectionHeading } from "./ui/section-heading";
import { Badge } from "./ui/badge";

const LOGO_URL =
  "https://res.cloudinary.com/sggs/image/upload/v1731136210/user_profile_photos/logo_yqftnr.png";

function LinkListVisual() {
  const links = [
    { label: brandShortLink("launch"), clicks: "2.4k", growth: "+18%" },
    { label: brandShortLink("portfolio"), clicks: "1.1k", growth: "+9%" },
    { label: brandShortLink("menu"), clicks: "846", growth: "+24%" },
  ];

  return (
    <div className="relative mt-2 overflow-hidden rounded-2xl border border-ink/10 bg-canvas p-3">
      <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-700">
        <span className="h-1 w-1 rounded-full bg-emerald-500" /> Live
      </div>
      <div className="space-y-2">
        {links.map((link) => (
          <div
            key={link.label}
            className="flex items-center gap-2.5 rounded-xl border border-ink/[0.07] bg-white px-3 py-2.5"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Link2 className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0 flex-1 truncate text-[11px] font-semibold text-ink">{link.label}</span>
            <span className="text-[10px] text-muted">{link.clicks}</span>
            <span className="text-[9px] font-semibold text-emerald-600">{link.growth}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between rounded-xl bg-ink px-3 py-2.5 text-white">
        <span className="text-[10px] text-white/50">Total clicks this week</span>
        <span className="font-display text-sm font-semibold">+34.8%</span>
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  return (
    <div className="mt-4 rounded-2xl border border-ink/10 bg-canvas p-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-muted">Clicks</p>
          <p className="font-display text-xl font-semibold tracking-[-0.04em] text-ink">12,840</p>
        </div>
        <Badge variant="success" className="gap-1 text-[9px]">
          <ArrowUpRight className="h-3 w-3" /> 18.2%
        </Badge>
      </div>
      <div className="mt-3 flex h-16 items-end gap-1.5">
        {[32, 46, 40, 58, 48, 72, 62, 86, 74, 94, 82, 100].map((height, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-brand-500/20 to-brand-500/70"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function QrVisual() {
  return (
    <div className="mt-4 flex items-center gap-4 rounded-2xl border border-ink/10 bg-canvas p-3">
      <div className="rounded-xl border border-ink/10 bg-white p-2">
        <QRCodeCanvas
          value={brandUrl("qr")}
          size={72}
          bgColor="#ffffff"
          fgColor="#0b0b10"
          level="H"
          imageSettings={{ src: LOGO_URL, height: 14, width: 14, excavate: true }}
          includeMargin={false}
        />
      </div>
      <div>
        <p className="text-[11px] font-semibold text-ink">Scannable everywhere</p>
        <p className="mt-1 text-[10px] leading-4 text-muted">Colour, logo, shape. Make it yours.</p>
        <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-brand-600">
          Open QR studio <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
}

function ProfileVisual() {
  return (
    <div className="mt-4 rounded-2xl border border-ink/10 bg-[#111118] p-3">
      <div className="flex flex-col items-center rounded-xl bg-white/[0.04] px-4 py-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-400/60 bg-gradient-to-br from-brand-500 to-sky-400 text-sm font-bold text-white">
          SB
        </div>
        <p className="mt-2 text-[11px] font-semibold text-white">Sai Bende</p>
        <p className="mt-1 text-center text-[9px] leading-4 text-white/40">Designer, builder, link collector.</p>
        <div className="mt-3 grid w-full gap-1.5">
          {["Portfolio", "Latest work", "Say hello"].map((label) => (
            <span key={label} className="rounded-lg border border-white/10 bg-white/[0.06] py-1.5 text-center text-[9px] font-medium text-white/65">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Featured() {
  return (
    <section className="section-space">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Inside the workspace"
            title={
              <>
                Everything you need to make a link{" "}
                <span className="text-gradient">feel intentional.</span>
              </>
            }
            description="A calmer way to build, share and understand your corner of the internet. No spreadsheets, no duct tape."
          />
          <Badge variant="outline" className="w-fit gap-2 px-3.5 py-2 text-[11px]">
            <Sparkles className="h-3.5 w-3.5 text-brand-500" />
            Designed for focus
          </Badge>
        </div>

        <BentoGrid className="mt-10">
          <BentoGridItem
            className="md:col-span-4"
            icon={<Link2 className="h-5 w-5" />}
            title="Your links, finally in one place"
            description="Create branded short links, see how they perform, and keep every destination organised without another spreadsheet."
            header={<LinkListVisual />}
          />
          <BentoGridItem
            className="md:col-span-2"
            icon={<BarChart3 className="h-5 w-5" />}
            title="Clicks with context"
            description="Open a link and see its visit history. Know what is landing, and what needs another look."
            header={<AnalyticsVisual />}
          />
          <BentoGridItem
            className="md:col-span-2"
            icon={<QrCode className="h-5 w-5" />}
            title="QR codes that fit your brand"
            description="Colours, shapes and a logo. Download a code that looks like it belongs to you."
            header={<QrVisual />}
          />
          <BentoGridItem
            className="md:col-span-2"
            icon={<UserRound className="h-5 w-5" />}
            title="A link-in-bio worth visiting"
            description="One profile page for every place you exist. Add your photo, a short bio, and your best links."
            header={<ProfileVisual />}
          />
          <BentoGridItem
            className="md:col-span-2"
            icon={<MousePointerClick className="h-5 w-5" />}
            title="Short paths, clear intent"
            description="Custom back-halves turn long, forgettable URLs into something people can remember and share."
            header={
              <div className="mt-4 rounded-2xl border border-ink/10 bg-canvas p-3">
                <div className="flex min-w-0 items-center gap-2 rounded-xl border border-ink/10 bg-white px-3 py-2.5">
                  <span className="shrink-0 text-[9px] text-ink/30">{BRAND.domain}/</span>
                  <span className="truncate text-[11px] font-semibold text-ink">the-good-stuff</span>
                  <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[9px] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Available
                </div>
              </div>
            }
          />
        </BentoGrid>
      </div>
    </section>
  );
}

export default Featured;
