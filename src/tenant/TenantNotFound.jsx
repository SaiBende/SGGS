import { buttonVariants } from "../components/ui/button";
import { mainAppUrl } from "../lib/platform";

function TenantNotFound({ message = "This page does not exist." }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
          404
        </p>
        <h1 className="mt-3 font-display text-2xl font-semibold tracking-[-0.04em]">
          Page not found
        </h1>
        <p className="mt-2 text-sm leading-6 text-white/50">{message}</p>
        <a
          href={mainAppUrl("")}
          className={buttonVariants({
            variant: "dark-outline",
            size: "md",
            className: "mt-6",
          })}
        >
          Go to SGGS
        </a>
      </div>
    </div>
  );
}

export default TenantNotFound;
