import { Link } from "react-router-dom";
import { PricingTable, Show } from "@clerk/react";
import { SubscriptionDetailsButton } from "@clerk/react/experimental";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  CreditCard,
  Globe2,
  Settings2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { PageHero } from "../components/ui/section-heading";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import BillingBoundary from "../components/BillingBoundary";
import { BRAND } from "../lib/brand";
import { clerkBillingAppearance as clerkAppearance } from "../utils/clerkAppearance";

const included = [
  "Your own SGGS subdomain",
  "Custom back-halves",
  "QR downloads",
  "Visit trends",
  "Link-in-bio page",
  "Clerk-managed billing",
];

const faqs = [
  {
    q: "How does billing work?",
    a: "Plans are billed monthly or yearly through Clerk Billing. You can switch periods, change plans, or cancel from the Manage subscription drawer at any time.",
  },
  {
    q: "Which currency will I be charged in?",
    a: "Clerk Billing charges in USD. The exact amount is shown in the secure checkout drawer before you confirm. INR billing is not available on this rail yet.",
  },
  {
    q: "Can I switch from monthly to yearly?",
    a: "Yes. Open the plan manager and choose the yearly price for your plan. Clerk handles the change and shows any proration before you confirm.",
  },
  {
    q: "What happens when I cancel?",
    a: "Your plan stays active until the end of the period you already paid for. After that, your account moves to the Free plan and existing links stay in place.",
  },
  {
    q: "Do my links disappear when a plan ends?",
    a: "No. Existing links stay in place. You simply return to the limits of the Free plan until you upgrade again.",
  },
  {
    q: "Which plan has unlimited links?",
    a: "Premium has unlimited active short links. Basic includes 20 and Standard includes 30.",
  },
  {
    q: "Do I get my own subdomain?",
    a: `Yes. Every account, including Free, gets a personal link-in-bio page at yourname.${BRAND.domain}. Paid plans add more link capacity and premium tools; the address is included in every plan.`,
  },
  {
    q: "Does SGGS store my card details?",
    a: "No. Payment details are handled by Clerk Billing. SGGS only stores your plan and subscription status so quotas can be enforced.",
  },
];

function Pricing() {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="Plans & billing"
        title={
          <>
            More room for the links{" "}
            <span className="text-gradient">that matter.</span>
          </>
        }
        description={`Monthly or yearly plans, billed securely through Clerk. Every account includes a personal page at yourname.${BRAND.domain}. Upgrade, switch periods, or cancel whenever your link library changes.`}
        actions={
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="outline" className="gap-1.5 px-3 py-2 text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Secure
              Clerk checkout
            </Badge>
            <Badge variant="outline" className="gap-1.5 px-3 py-2 text-[11px]">
              <Zap className="h-3.5 w-3.5 text-amber-500" /> Activate instantly
            </Badge>
            <Badge variant="outline" className="gap-1.5 px-3 py-2 text-[11px]">
              <Globe2 className="h-3.5 w-3.5 text-brand-500" /> Personal page
              included
            </Badge>
          </div>
        }
      />

      <section className="container-page">
        <Show when="signed-in">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-ink/10 bg-white px-5 py-4 shadow-card sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <CreditCard className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-ink">
                  Your billing
                </p>
                <p className="mt-0.5 text-[11px] leading-5 text-muted">
                  Open the Clerk plan manager to view your plan, switch monthly
                  to yearly, or cancel.
                </p>
              </div>
            </div>
            <BillingBoundary fallback={null}>
              <SubscriptionDetailsButton
                subscriptionDetailsProps={{ appearance: clerkAppearance }}
              >
                <Button variant="secondary" size="md">
                  <Settings2 className="h-4 w-4" /> Manage subscription
                </Button>
              </SubscriptionDetailsButton>
            </BillingBoundary>
          </div>
        </Show>

        <div className="pricing-table-shell overflow-hidden rounded-[2rem] border border-ink/10 bg-white p-2 shadow-card sm:p-4">
          <BillingBoundary>
            <PricingTable
              for="user"
              highlightedPlan="standard"
              newSubscriptionRedirectUrl="/dashboard?billing=success"
              appearance={clerkAppearance}
              checkoutProps={{ appearance: clerkAppearance }}
              fallback={
                <div className="flex min-h-[18rem] items-center justify-center rounded-2xl border border-dashed border-ink/10 bg-canvas px-6 text-center">
                  <div>
                    <Sparkles className="mx-auto h-5 w-5 text-brand-500" />
                    <p className="mt-3 text-[13px] font-semibold text-ink">
                      Loading plans…
                    </p>
                    <p className="mt-1 text-[11px] text-muted">
                      Plans are loaded securely from Clerk Billing.
                    </p>
                  </div>
                </div>
              }
            />
          </BillingBoundary>
        </div>

        <p className="mt-3 text-center text-[11px] leading-5 text-muted">
          Use the <span className="font-semibold text-ink">Billed annually</span>{" "}
          switch on any paid plan to compare monthly and yearly pricing. The
          exact USD amount is shown by Clerk before you confirm.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl border border-ink/10 bg-white px-5 py-4 shadow-card">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/35">
            Every plan includes
          </span>
          {included.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink/55"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> {item}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-ink/10 bg-canvas px-5 py-4 sm:flex-row sm:items-center">
          <p className="text-[12px] leading-5 text-muted">
            Not sure which plan fits? Start with a free account and upgrade
            later.
          </p>
          <Show when="signed-in">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink transition hover:text-brand-600"
            >
              Go to dashboard <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Show>
          <Show when="signed-out">
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink transition hover:text-brand-600"
            >
              Create a free account <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Show>
        </div>
      </section>

      <section className="container-page mt-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Badge variant="outline" className="mb-4 gap-1.5">
              <Sparkles className="h-3 w-3 text-brand-500" /> Before you choose
            </Badge>
            <h2 className="font-display text-3xl font-semibold leading-[1.08] tracking-[-0.05em] text-ink sm:text-4xl">
              A few useful details.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted">
              Plans are subscriptions handled by Clerk. Cancel and your access
              continues until the end of the current billing period; your links
              are never deleted.
            </p>
            <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 px-3.5 py-3">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <p className="text-[11px] leading-5 text-emerald-800">
                Your plan is linked to your Clerk account, so it follows you
                across devices automatically.
              </p>
            </div>
          </div>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[14px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/35 transition group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50 group-open:text-brand-600">
                    <span className="text-base leading-none">+</span>
                  </span>
                </summary>
                <p className="mt-3 max-w-xl pr-8 text-[13px] leading-6 text-muted">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
