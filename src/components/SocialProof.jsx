import { Link } from "react-router-dom";
import { ArrowRight, Globe2, Heart, ShieldCheck, Zap } from "lucide-react";
import { SocialIcon } from "./ui/social-icon";
import { Badge } from "./ui/badge";

const platforms = ["instagram", "youtube", "tiktok", "x", "github", "linkedin", "whatsapp"];

function SocialProof() {
  return (
    <section className="overflow-hidden border-y border-ink/10 bg-canvas py-14 sm:py-16">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge variant="brand" className="mb-4 gap-1.5">
              <Heart className="h-3 w-3" /> Made for sharing
            </Badge>
            <h2 className="font-display text-3xl font-semibold leading-[1.08] tracking-[-0.05em] text-ink sm:text-4xl">
              Looks good next to the content you already make.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted">
              Your links do not have to look like an afterthought. Keep the same
              care you put into a post, a product, or a portfolio.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              {platforms.map((platform) => (
                <span
                  key={platform}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3.5 py-2 text-[12px] font-medium capitalize text-ink/60 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700"
                >
                  <SocialIcon platform={platform} className="h-3.5 w-3.5" />
                  {platform === "x" ? "X / Twitter" : platform}
                </span>
              ))}
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-ink/15 px-3.5 py-2 text-[12px] font-medium text-ink/40">
                <Globe2 className="h-3.5 w-3.5" /> anywhere
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Zap, title: "Fast by default", body: "No page reloads. No detours." },
                { icon: ShieldCheck, title: "Private by design", body: "Your links, your rules." },
                { icon: ArrowRight, title: "One less tab", body: "Create and track in one place." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-ink/10 bg-white p-4">
                  <item.icon className="h-4 w-4 text-brand-600" />
                  <p className="mt-3 text-[12px] font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 text-[11px] leading-5 text-muted">{item.body}</p>
                </div>
              ))}
            </div>

            <Link
              to="/register"
              className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand-700 transition hover:text-brand-800"
            >
              Make your links feel like yours <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialProof;
