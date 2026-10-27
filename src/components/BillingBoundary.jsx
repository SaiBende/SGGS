import React from "react";
import { AlertTriangle, Mail, RotateCw } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";

const isBillingDisabled = (error) => {
  const message = String(error?.message || "");
  return (
    error?.code === "cannot_render_billing_disabled" ||
    /billing is disabled/i.test(message)
  );
};

// Clerk's billing components throw when Billing has not been enabled for the
// Clerk application. Keep that failure local to the billing surface instead of
// letting the global boundary replace the whole page.
class BillingBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    if (isBillingDisabled(error)) {
      console.warn(
        "[billing] Clerk Billing is not enabled for this application.",
        info?.componentStack || ""
      );
      return;
    }
    console.error("[billing] Billing component failed:", error, info);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.fallback !== undefined) {
      return this.props.fallback;
    }

    const disabled = isBillingDisabled(this.state.error);

    return (
      <div className="flex min-h-[18rem] items-center justify-center rounded-2xl border border-dashed border-ink/10 bg-canvas px-6 py-10 text-center">
        <div className="max-w-md">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <h3 className="mt-4 font-display text-lg font-semibold tracking-[-0.03em] text-ink">
            Billing is temporarily unavailable
          </h3>
          <p className="mt-2 text-[12px] leading-6 text-muted">
            {disabled && import.meta.env.DEV
              ? "Clerk Billing is not enabled for this application yet. Enable it in the Clerk Dashboard, then create the monthly and yearly plans."
              : "We couldn't load the plan tools right now. Please try again in a moment."}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <Button variant="secondary" size="sm" onClick={this.reset}>
              <RotateCw className="h-3.5 w-3.5" /> Try again
            </Button>
            <a
              href="mailto:hello@saibende.tech"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              <Mail className="h-3.5 w-3.5" /> Contact support
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default BillingBoundary;
