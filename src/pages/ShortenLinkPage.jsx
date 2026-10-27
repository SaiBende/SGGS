import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Check,
  Link2,
  QrCode,
  Sparkles,
} from 'lucide-react';
import ShortenLink from '../components/ShortenLink';
import { PageHero } from '../components/ui/section-heading';
import { Badge } from '../components/ui/badge';
import { buttonVariants } from '../components/ui/button';

const benefits = [
  {
    icon: Link2,
    title: 'Custom back-halves',
    body: 'Make the link easy to say, remember and share.',
  },
  {
    icon: QrCode,
    title: 'QR on every link',
    body: 'Download a matching code straight from the result card.',
  },
  {
    icon: BarChart3,
    title: 'Visit history',
    body: 'Open your dashboard to see every link’s daily trend.',
  },
];

function ShortenLinkPage() {
  return (
    <div className="pb-20">
      <PageHero
        compact
        eyebrow="Link shortener"
        title={
          <>
            A shorter path to{' '}
            <span className="text-gradient">where you’re going.</span>
          </>
        }
        description="Paste a destination, choose a back-half if you want one, and share the result. Every link comes with a QR code and a click history."
      />

      <div className="container-page">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="flex justify-center lg:justify-start">
            <ShortenLink />
          </div>

          <aside className="space-y-4">
            <div className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card">
              <Badge variant="brand" className="gap-1.5">
                <Sparkles className="h-3 w-3" /> Included with every link
              </Badge>
              <div className="mt-5 space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-canvas text-brand-600">
                      <benefit.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold text-ink">{benefit.title}</p>
                      <p className="mt-1 text-[11px] leading-5 text-muted">{benefit.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-ink/10 bg-[#111118] p-5 text-white shadow-card">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                After creating
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold tracking-[-0.035em]">
                It lands in your dashboard.
              </h2>
              <p className="mt-2 text-[11px] leading-5 text-white/40">
                Copy it later, download the QR, rename the back-half or check how
                many people visited.
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-[10px] text-white/35">
                <Check className="h-3.5 w-3.5 text-emerald-400" /> Saved to your account
              </div>
              <Link
                to="/dashboard"
                className={buttonVariants({
                  variant: 'white',
                  size: 'sm',
                  className: 'mt-5 w-full rounded-full',
                })}
              >
                Open dashboard <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ShortenLinkPage;
