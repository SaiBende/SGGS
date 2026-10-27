import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Link2,
  Share2,
  Sparkles,
} from "lucide-react";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import { BackgroundBeams } from "../components/ui/background-beams";
import { GridPattern } from "../components/ui/grid-pattern";
import { Spotlight } from "../components/ui/spotlight";
import { SocialIcon, platformLabel } from "../components/ui/social-icon";
import { Badge } from "../components/ui/badge";
import { BrandMark } from "../components/ui/brand-mark";
import { buttonVariants } from "../components/ui/button";

function ProfileCard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const { username } = params;

  const loadProfile = useCallback(async () => {
    setProfile(null);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/u/${username}`);
      const data = await response.json();
      if (!response.ok || data.error) {
        setError(data.error || "Profile not found");
      } else {
        setProfile(data);
      }
    } catch (fetchError) {
      console.error("Error fetching profile:", fetchError);
      setError("Unable to load this profile. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const shareProfile = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `@${profile?.username || username} on SGGS`,
          text: profile?.description || "Check out my links.",
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (shareError) {
      if (shareError?.name !== "AbortError") {
        console.error("Could not share profile:", shareError);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-white">
        <Loading message="Opening profile..." className="text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink px-5 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <ErrorState title="Profile unavailable" message={error} onRetry={loadProfile} tone="dark">
            <Link to="/" className={buttonVariants({ variant: "dark-outline", size: "md", className: "text-white" })}>
              Go home
            </Link>
          </ErrorState>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const links = Object.entries(profile.socialMediaLinks || {}).filter(([, link]) => link);
  const initial = String(profile.username || username || "S").slice(0, 1).toUpperCase();

  return (
    <div className="noise relative min-h-screen overflow-hidden bg-ink text-white">
      <GridPattern stroke="rgba(255,255,255,0.065)" size={56} />
      <BackgroundBeams className="opacity-35" />
      <Spotlight className="-left-32 -top-40" fill="rgba(109,94,246,0.46)" />
      <div aria-hidden="true" className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-sky-400/10 blur-[100px]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[520px] flex-col px-5 py-6 sm:py-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-[13px] font-semibold text-white/70 transition hover:text-white">
            <BrandMark size="sm" className="border border-white/10" />
            SGGS
          </Link>
          <Badge variant="dark-outline" className="gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Public page
          </Badge>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <div className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.045] p-5 shadow-float backdrop-blur-xl sm:p-7">
              <div className="flex flex-col items-center text-center">
                <div className="relative flex h-24 w-24 items-center justify-center">
                  <div className="absolute inset-0 animate-pulse-soft rounded-full bg-gradient-to-tr from-brand-500/50 via-sky-400/30 to-transparent blur-xl" />
                  <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-gradient-to-br from-brand-500 to-sky-400 text-2xl font-bold text-white">
                    {profile.profilephoto && (
                      <img
                        src={profile.profilephoto}
                        alt={profile.username}
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                    {!profile.profilephoto && initial}
                  </div>
                </div>

                <h1 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-white">
                  @{profile.username}
                </h1>
                {profile.description && (
                  <p className="mt-2 max-w-sm text-[13px] leading-6 text-white/50">
                    {profile.description}
                  </p>
                )}

                <div className="mt-5 flex w-full gap-2">
                  <button
                    type="button"
                    onClick={shareProfile}
                    className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] text-[12px] font-semibold text-white/70 transition hover:bg-white/[0.1] hover:text-white"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Share2 className="h-3.5 w-3.5" />}
                    {copied ? "Link copied" : "Share page"}
                  </button>
                  <a
                    href={profile.profilephoto || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/50 transition hover:bg-white/[0.1] hover:text-white"
                    aria-label="View profile photo"
                    onClick={(event) => {
                      if (!profile.profilephoto) event.preventDefault();
                    }}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="mt-6 space-y-2.5">
                {links.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/15 px-5 py-6 text-center">
                    <Link2 className="mx-auto h-5 w-5 text-white/25" />
                    <p className="mt-2 text-[11px] text-white/35">No links shared yet.</p>
                  </div>
                ) : (
                  links.map(([platform, link], index) => (
                    <motion.a
                      key={platform}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + index * 0.06, duration: 0.4 }}
                      className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 transition duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.09]"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.07] text-white/55 transition group-hover:bg-brand-500/20 group-hover:text-brand-200">
                        <SocialIcon platform={platform} className="h-4 w-4" />
                      </span>
                      <span className="flex-1 text-left text-[13px] font-semibold text-white/80">
                        {platformLabel(platform)}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-white/20 transition group-hover:text-white/60" />
                    </motion.a>
                  ))
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-col items-center gap-3 text-center">
              <p className="inline-flex items-center gap-1.5 text-[10px] text-white/25">
                <Sparkles className="h-3 w-3" /> Made with SGGS
              </p>
              <Link
                to="/register"
                className={buttonVariants({
                  variant: "dark-outline",
                  size: "sm",
                  className: "rounded-full px-4 text-white/60",
                })}
              >
                Create your own page <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-white/20">
          <span>One link for everything.</span>
          <a href="https://saibende.tech" target="_blank" rel="noreferrer" className="transition hover:text-white/50">
            saibende.tech
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
