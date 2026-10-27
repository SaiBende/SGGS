import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { apiFetch } from "../utils/auth";
import { PageHero } from "../components/ui/section-heading";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { SpotlightCard } from "../components/ui/card";
import { MovingBorderCard } from "../components/ui/moving-border";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

const plans = [
  {
    title: "Basic",
    price: 29,
    duration: "6 months",
    limit: "10 active links",
    description: "The essentials for a personal project or a first campaign.",
    features: [
      "Up to 10 active short links",
      "Custom back-halves",
      "QR code generation & download",
      "Daily visit trends",
      "Public link-in-bio page",
      "6 months of access",
    ],
    cta: "Choose Basic",
  },
  {
    title: "Standard",
    price: 99,
    duration: "24 months",
    limit: "30 active links",
    description: "More room for creators, freelancers and small teams.",
    features: [
      "Up to 30 active short links",
      "Everything in Basic",
      "Custom back-halves",
      "QR code generation & download",
      "Daily visit trends",
      "Public link-in-bio page",
      "24 months of access",
    ],
    cta: "Choose Standard",
    popular: true,
  },
  {
    title: "Premium",
    price: 499,
    duration: "36 months",
    limit: "Unlimited links",
    description: "For high-volume link libraries and long-running projects.",
    features: [
      "Unlimited active short links",
      "Everything in Standard",
      "Custom back-halves",
      "QR code generation & download",
      "Daily visit trends",
      "Public link-in-bio page",
      "36 months of access",
    ],
    cta: "Choose Premium",
  },
];

const included = [
  "Custom back-halves",
  "QR downloads",
  "Visit trends",
  "Link-in-bio page",
  "Secure Stripe checkout",
];

function PlanCard({ plan, redirectingPlan, onBuy }) {
  const content = (
    <div className="flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-[-0.035em] text-ink">{plan.title}</h2>
          <p className="mt-1 text-[11px] font-medium text-muted">{plan.limit}</p>
        </div>
        {plan.popular && (
          <Badge variant="brand" className="gap-1">
            <Sparkles className="h-3 w-3" /> Popular
          </Badge>
        )}
      </div>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-4xl font-semibold tracking-[-0.06em] text-ink">₹{plan.price}</span>
        <span className="text-[12px] text-muted">one-time</span>
      </div>
      <p className="mt-2 text-[12px] text-muted">{plan.duration} of access</p>

      <p className="mt-5 text-[13px] leading-6 text-muted">{plan.description}</p>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-[12px] leading-5 text-ink/65">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check className="h-2.5 w-2.5" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant={plan.popular ? "brand" : "secondary"}
        size="lg"
        onClick={() => onBuy(plan)}
        disabled={redirectingPlan === plan.title}
        className="mt-7 w-full"
      >
        {redirectingPlan === plan.title ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Redirecting...
          </>
        ) : (
          <>
            {plan.cta} <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
      <p className="mt-3 text-center text-[10px] text-muted">No auto-renewal. Access is activated after checkout.</p>
    </div>
  );

  if (plan.popular) {
    return (
      <MovingBorderCard className="h-full bg-white" containerClassName="h-full" duration={7}>
        {content}
      </MovingBorderCard>
    );
  }

  return <SpotlightCard className="h-full">{content}</SpotlightCard>;
}

function Pricing() {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();
  const [error, setError] = useState(null);
  const [redirectingPlan, setRedirectingPlan] = useState(null);

  const handleBuyNow = async (plan) => {
    setError(null);

    if (isLoaded && !isSignedIn) {
      navigate("/login", {
        state: { from: { pathname: "/pricing", search: "", hash: "" } },
      });
      return;
    }

    if (!stripePromise) {
      setError("Payments are not configured yet. Please try again later.");
      return;
    }

    setRedirectingPlan(plan.title);
    try {
      const response = await apiFetch("/payment/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planName: plan.title }),
      });

      if (response.status === 401) {
        navigate("/login", {
          state: { from: { pathname: "/pricing", search: "", hash: "" } },
        });
        return;
      }

      const session = await response.json();
      if (session.error) throw new Error(session.error);

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (checkoutError) {
      console.error("Error redirecting to Stripe Checkout:", checkoutError);
      setError(checkoutError.message || "Something went wrong starting checkout. Please try again.");
      setRedirectingPlan(null);
    }
  };

  return (
    <div className="pb-20">
      <PageHero
        eyebrow="Simple pricing"
        title={
          <>
            More room for the links{" "}
            <span className="text-gradient">that matter.</span>
          </>
        }
        description="One-time plans with no auto-renewal. Start free, upgrade when your link library grows."
        actions={
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="outline" className="gap-1.5 px-3 py-2 text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Secure Stripe checkout
            </Badge>
            <Badge variant="outline" className="gap-1.5 px-3 py-2 text-[11px]">
              <Zap className="h-3.5 w-3.5 text-amber-500" /> Activate instantly
            </Badge>
          </div>
        }
      />

      <section className="container-page">
        {error && (
          <div className="mx-auto mb-6 max-w-2xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-[12px] text-red-700" role="alert">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard
              key={plan.title}
              plan={plan}
              redirectingPlan={redirectingPlan}
              onBuy={handleBuyNow}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl border border-ink/10 bg-white px-5 py-4 shadow-card">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/35">
            Every plan includes
          </span>
          {included.map((item) => (
            <span key={item} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink/55">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> {item}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-ink/10 bg-canvas px-5 py-4 sm:flex-row sm:items-center">
          <p className="text-[12px] leading-5 text-muted">
            Not sure which plan fits? Start with a free account and upgrade later.
          </p>
          <Link to={isSignedIn ? "/dashboard" : "/register"} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink transition hover:text-brand-600">
            {isSignedIn ? "Go to dashboard" : "Create a free account"} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
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
              Plans are one-time purchases. When a plan ends, your account moves
              back to the free link limit without deleting your existing links.
            </p>
          </div>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {[
              {
                q: "How does a plan get activated?",
                a: "After a successful Stripe checkout, you are returned to a confirmation page and your plan is applied to the account you were signed in with.",
              },
              {
                q: "Do my links disappear when a plan ends?",
                a: "No. Existing links stay in place. You simply return to the limits of the free plan until you upgrade again.",
              },
              {
                q: "Is this a subscription?",
                a: "No. Each plan is a one-time payment for the stated access period. There is no automatic renewal.",
              },
              {
                q: "Which plan has unlimited links?",
                a: "Premium has unlimited active short links. Basic includes 10 and Standard includes 30.",
              },
            ].map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[14px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/35 transition group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50 group-open:text-brand-600">
                    <span className="text-base leading-none">+</span>
                  </span>
                </summary>
                <p className="mt-3 max-w-xl pr-8 text-[13px] leading-6 text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
