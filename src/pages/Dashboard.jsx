import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  Copy,
  Download,
  ExternalLink,
  LayoutDashboard,
  Link2,
  Loader2,
  MousePointerClick,
  MoreHorizontal,
  Pencil,
  Plus,
  QrCode,
  Search,
  Sparkles,
  Trash2,
  TrendingUp,
  UserRound,
  Wallet,
} from "lucide-react";
import { apiFetch } from "../utils/auth";
import { cn } from "../lib/utils";
import { shortDomain, shortUrl } from "../lib/brand";
import VisitTrends from "../components/VisitTrends";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import { Button, buttonVariants } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { StatCard } from "../components/ui/stat-card";
import { Modal } from "../components/ui/modal";
import { EmptyState } from "../components/ui/empty-state";
import { Label } from "../components/ui/input";
import { BackgroundBeams } from "../components/ui/background-beams";

const LOGO_URL =
  "https://res.cloudinary.com/sggs/image/upload/v1731136210/user_profile_photos/logo_yqftnr.png";

const planLimits = { basic: 10, standard: 30, premium: Infinity };
const rowAccents = [
  "bg-brand-50 text-brand-600",
  "bg-sky-50 text-sky-600",
  "bg-emerald-50 text-emerald-600",
  "bg-amber-50 text-amber-600",
  "bg-coral-400/10 text-coral-600",
];

const capitalize = (value = "") => value.charAt(0).toUpperCase() + value.slice(1);
const formatNumber = (value) => Number(value || 0).toLocaleString();
const formatDate = (value, options = { month: "short", day: "numeric", year: "numeric" }) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, options);
};

function prettyUrl(url) {
  return String(url || "").replace(/^https?:\/\//, "");
}

function LinkRow({
  url,
  index,
  copied,
  onCopy,
  onAnalytics,
  onQr,
  onRename,
  onDelete,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const clicks = url.visitHistory?.length || 0;

  useEffect(() => {
    if (!menuOpen) return undefined;
    const close = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [menuOpen]);

  return (
    <div className="group relative flex flex-col gap-3 border-b border-ink/[0.07] px-3 py-4 transition last:border-0 hover:bg-ink/[0.018] sm:flex-row sm:items-center sm:px-5">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", rowAccents[index % rowAccents.length])}>
          <Link2 className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <a
            href={shortUrl(url.shortId)}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate text-[13px] font-semibold text-ink transition hover:text-brand-600"
          >
            {prettyUrl(shortUrl(url.shortId))}
          </a>
          <p className="mt-0.5 max-w-[420px] truncate text-[11px] text-muted" title={url.redirectURL}>
            {url.redirectURL}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 pl-12 sm:justify-end sm:pl-0">
        <div className="flex items-center gap-5">
          <div className="text-right">
            <p className="text-[13px] font-semibold tabular-nums text-ink">{formatNumber(clicks)}</p>
            <p className="text-[10px] text-muted">clicks</p>
          </div>
          <div className="hidden w-20 xl:block">
            <div className="h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-sky-400"
                style={{ width: `${Math.min(100, clicks * 8 + 12)}%` }}
              />
            </div>
          </div>
          <div className="hidden text-[11px] text-muted sm:block">{formatDate(url.createdAt, { month: "short", day: "numeric" })}</div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onCopy(url)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/35 transition hover:bg-white hover:text-ink hover:shadow-sm"
            title="Copy short link"
            aria-label="Copy short link"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => onAnalytics(url)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/35 transition hover:bg-white hover:text-ink hover:shadow-sm"
            title="View analytics"
            aria-label="View analytics"
          >
            <BarChart3 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onQr(url)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/35 transition hover:bg-white hover:text-ink hover:shadow-sm"
            title="View QR code"
            aria-label="View QR code"
          >
            <QrCode className="h-3.5 w-3.5" />
          </button>
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white hover:text-ink hover:shadow-sm",
                menuOpen ? "bg-white text-ink shadow-sm" : "text-ink/35"
              )}
              title="More actions"
              aria-label="More actions"
              aria-expanded={menuOpen}
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-[calc(100%+6px)] z-30 w-44 overflow-hidden rounded-xl border border-ink/10 bg-white p-1 shadow-float">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onRename(url);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] font-medium text-ink/65 transition hover:bg-ink/[0.04] hover:text-ink"
                >
                  <Pencil className="h-3.5 w-3.5" /> Rename back-half
                </button>
                <a
                  href={url.redirectURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] font-medium text-ink/65 transition hover:bg-ink/[0.04] hover:text-ink"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Open destination
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(url);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] font-medium text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete link
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlanCard({ user, linkCount, className }) {
  const limit = planLimits[user.category] ?? 10;
  const isUnlimited = limit === Infinity;
  const usage = isUnlimited ? 0 : Math.min(100, (linkCount / limit) * 100);
  const paid = Boolean(user.planExpiresAt) || user.category !== "basic";
  const planName = user.category === "basic" && !paid ? "Free" : capitalize(user.category);

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-ink/10 bg-ink p-5 text-white", className)}>
      <BackgroundBeams className="opacity-30" />
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="dark-outline" className="capitalize">
            {planName} plan
          </Badge>
          <Sparkles className="h-4 w-4 text-brand-300" />
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/35">Links used</p>
            <p className="mt-1 font-display text-2xl font-semibold tracking-[-0.04em]">
              {formatNumber(linkCount)}
              <span className="ml-1 text-sm font-medium text-white/35">/ {isUnlimited ? "∞" : limit}</span>
            </p>
          </div>
          {isUnlimited ? (
            <Badge variant="success" className="border-emerald-400/20 bg-emerald-400/10 text-emerald-300">Unlimited</Badge>
          ) : (
            <span className="text-[11px] text-white/35">{Math.round(usage)}%</span>
          )}
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 to-sky-300 transition-all duration-700"
            style={{ width: isUnlimited ? "100%" : `${Math.max(4, usage)}%` }}
          />
        </div>
        <p className="mt-3 text-[10px] leading-4 text-white/35">
          {user.planExpiresAt
            ? `Active until ${formatDate(user.planExpiresAt, { month: "short", day: "numeric", year: "numeric" })}`
            : "Free plan · Upgrade for more room."}
        </p>
        <Link
          to="/pricing"
          className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.07] py-2 text-[11px] font-semibold text-white transition hover:bg-white/[0.12]"
        >
          {user.category === "premium" ? "Manage plan" : "Upgrade plan"} <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

function ProfileRailCard({ user, onCopy, copied }) {
  const profileUrl = `${import.meta.env.VITE_FRONTEND_URL}/u/${user.username}`;

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
      <div className="flex items-center gap-3">
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-brand-500 to-sky-400 text-[11px] font-bold text-white">
          <img
            src={user.profilephoto}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
          {String(user.username || "S").slice(0, 1).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-ink">@{user.username}</p>
          <p className="text-[11px] text-muted">Your public page</p>
        </div>
        <span className="ml-auto h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.12)]" />
      </div>

      <div className="mt-4 flex items-center gap-1.5 rounded-lg border border-ink/10 bg-canvas px-2.5 py-2">
        <span className="min-w-0 flex-1 truncate text-[10px] text-muted">{profileUrl}</span>
        <button
          type="button"
          onClick={onCopy}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-ink/35 transition hover:bg-white hover:text-ink"
          aria-label="Copy profile URL"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link to="/linktree" className={buttonVariants({ variant: "secondary", size: "sm", className: "h-9" })}>
          Edit page
        </Link>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "soft", size: "sm", className: "h-9" })}
        >
          Open <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

function QuickActions() {
  const actions = [
    { to: "/shortenlink", icon: Plus, label: "Create a short link", hint: "Paste a URL" },
    { to: "/qrgenerate", icon: QrCode, label: "Design a QR code", hint: "Brand it" },
    { to: "/linktree", icon: UserRound, label: "Edit your page", hint: "Link in bio" },
  ];

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-2 shadow-card">
      {actions.map((action) => (
        <Link
          key={action.to}
          to={action.to}
          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-ink/[0.035]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink/[0.04] text-ink/45 transition group-hover:bg-brand-50 group-hover:text-brand-600">
            <action.icon className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12px] font-semibold text-ink">{action.label}</span>
            <span className="block text-[10px] text-muted">{action.hint}</span>
          </span>
          <ArrowRight className="h-3.5 w-3.5 text-ink/25 transition group-hover:translate-x-0.5 group-hover:text-brand-600" />
        </Link>
      ))}
    </div>
  );
}

function WorkspaceNav() {
  const items = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    { icon: Link2, label: "Links", href: "#links" },
    { icon: QrCode, label: "QR studio", to: "/qrgenerate" },
    { icon: UserRound, label: "Link in bio", to: "/linktree" },
    { icon: Wallet, label: "Plans & billing", to: "/pricing" },
  ];

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-2 shadow-card">
      <p className="px-3 pb-1 pt-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/30">Workspace</p>
      {items.map((item) => {
        const className = cn(
          "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12px] font-medium transition",
          item.active ? "bg-ink text-white" : "text-ink/55 hover:bg-ink/[0.04] hover:text-ink"
        );
        if (item.to) {
          return (
            <Link key={item.label} to={item.to} className={className}>
              <item.icon className="h-4 w-4" /> {item.label}
            </Link>
          );
        }
        return (
          <a key={item.label} href={item.href || "#"} className={className}>
            <item.icon className="h-4 w-4" /> {item.label}
          </a>
        );
      })}
    </div>
  );
}

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [copiedLinkId, setCopiedLinkId] = useState(null);
  const [profileCopied, setProfileCopied] = useState(false);

  const [qrLink, setQrLink] = useState(null);
  const [analyticsLink, setAnalyticsLink] = useState(null);
  const [visitHistory, setVisitHistory] = useState([]);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);

  const [renameLink, setRenameLink] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [renameError, setRenameError] = useState(null);
  const [renameLoading, setRenameLoading] = useState(false);

  const [deleteLink, setDeleteLink] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const navigate = useNavigate();

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch("/user/dashboard", { method: "POST" });
      if (response.status === 401) {
        navigate("/login");
        return;
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || "Failed to load user data.");
      }
      setUserData(result);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(
        err.message === "Failed to fetch"
          ? "Could not reach the server. Check your connection and try again."
          : err.message || "Failed to load user data."
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const urls = useMemo(() => userData?.urls || [], [userData]);
  const user = userData?.user;

  const filteredUrls = useMemo(() => {
    const query = search.trim().toLowerCase();
    const list = urls.filter((url) => {
      if (!query) return true;
      return (
        url.shortId.toLowerCase().includes(query) ||
        url.redirectURL.toLowerCase().includes(query)
      );
    });

    return [...list].sort((a, b) => {
      if (sortBy === "clicks") {
        return (b.visitHistory?.length || 0) - (a.visitHistory?.length || 0);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [urls, search, sortBy]);

  const totalClicks = useMemo(
    () => urls.reduce((sum, url) => sum + (url.visitHistory?.length || 0), 0),
    [urls]
  );
  const limit = planLimits[user?.category] ?? 10;

  const copyText = async (text, onSuccess) => {
    try {
      await navigator.clipboard.writeText(text);
      onSuccess?.();
    } catch {
      toast.error("Could not copy. Select the text and copy it manually.");
    }
  };

  const copyShortLink = (url) => {
    copyText(shortUrl(url.shortId), () => {
      setCopiedLinkId(url._id);
      toast.success("Short link copied");
      window.setTimeout(() => setCopiedLinkId(null), 1800);
    });
  };

  const copyProfile = () => {
    if (!user) return;
    copyText(`${import.meta.env.VITE_FRONTEND_URL}/u/${user.username}`, () => {
      setProfileCopied(true);
      toast.success("Profile URL copied");
      window.setTimeout(() => setProfileCopied(false), 1800);
    });
  };

  const openAnalytics = async (url) => {
    setAnalyticsLink(url);
    setVisitHistory([]);
    setAnalysisError(null);
    setAnalysisLoading(true);

    try {
      const response = await apiFetch(`/${url.shortId}/status`, { method: "POST" });
      if (response.status === 401) {
        navigate("/login");
        return;
      }
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch analysis.");
      }
      setVisitHistory(result.visitHistory || []);
    } catch (err) {
      console.error("Error fetching analysis:", err);
      setAnalysisError(err.message || "Could not load analytics for this link.");
    } finally {
      setAnalysisLoading(false);
    }
  };

  const openRename = (url) => {
    setRenameLink(url);
    setRenameValue(url.shortId);
    setRenameError(null);
  };

  const handleRename = async (event) => {
    event.preventDefault();
    if (!renameLink) return;
    const nextId = renameValue.trim();

    if (!nextId) {
      setRenameError("Enter a new back-half.");
      return;
    }
    if (!/^[a-zA-Z0-9._-]+$/.test(nextId)) {
      setRenameError("Use letters, numbers, dots, underscores or hyphens.");
      return;
    }
    if (nextId === renameLink.shortId) {
      setRenameLink(null);
      return;
    }

    setRenameLoading(true);
    setRenameError(null);

    try {
      const response = await apiFetch(`/${renameLink.shortId}/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ changeId: nextId }),
      });

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      const result = await response.json();
      if (!response.ok || !result.updatedUrl) {
        throw new Error(result.error || "Could not rename this link.");
      }

      setUserData((previous) => ({
        ...previous,
        urls: previous.urls.map((url) =>
          url._id === renameLink._id ? { ...url, shortId: result.updatedUrl.shortId } : url
        ),
      }));
      toast.success("Link renamed");
      setRenameLink(null);
    } catch (err) {
      console.error("Error renaming link:", err);
      setRenameError(err.message || "Could not rename this link.");
    } finally {
      setRenameLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteLink) return;
    setDeleteLoading(true);

    try {
      const response = await apiFetch(`/${deleteLink.shortId}`, { method: "DELETE" });
      if (response.status === 401) {
        navigate("/login");
        return;
      }

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to delete the URL.");
      }

      setUserData((previous) => ({
        ...previous,
        user: { ...previous.user, urlCount: Math.max(0, previous.user.urlCount - 1) },
        urls: previous.urls.filter((url) => url._id !== deleteLink._id),
      }));
      if (analyticsLink?.shortId === deleteLink.shortId) {
        setAnalyticsLink(null);
      }
      toast.success("Short link deleted");
      setDeleteLink(null);
    } catch (err) {
      console.error("Error deleting URL:", err);
      toast.error(err.message || "Could not delete this link.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const downloadQr = () => {
    const canvas = document.getElementById("dashboard-qr");
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `sggs-${qrLink?.shortId || "link"}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <section className="container-page py-20">
        <Loading message="Loading your workspace..." className="min-h-[60vh]" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="container-page py-20">
        <ErrorState title="Couldn't load your dashboard" message={error} onRetry={loadDashboard} className="min-h-[55vh]" />
      </section>
    );
  }

  if (!userData) {
    return (
      <section className="container-page py-20">
        <Loading message="Loading your workspace..." className="min-h-[55vh]" />
      </section>
    );
  }

  return (
    <div className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[26rem] bg-grid-fade opacity-50" />
      <div className="container-page relative py-8 lg:py-10">
        <div className="flex flex-col gap-6 border-b border-ink/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
              <LayoutDashboard className="h-3.5 w-3.5" /> Workspace
            </div>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-ink sm:text-4xl">
              Welcome back, <span className="text-gradient">{user.username}</span>.
            </h1>
            <p className="mt-2 text-sm text-muted">Here is what your links have been up to.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/linktree" className={buttonVariants({ variant: "secondary", size: "md" })}>
              <UserRound className="h-4 w-4" /> Public page
            </Link>
            <Link to="/shortenlink" className={buttonVariants({ variant: "primary", size: "md" })}>
              <Plus className="h-4 w-4" /> Create link
            </Link>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
          <aside className="hidden space-y-4 lg:sticky lg:top-24 lg:block">
            <WorkspaceNav />
            <PlanCard user={user} linkCount={urls.length} />
            <div className="rounded-2xl border border-ink/10 bg-white p-4 shadow-card">
              <p className="text-[11px] font-semibold text-ink">Need a hand?</p>
              <p className="mt-1 text-[10px] leading-5 text-muted">Questions about links, plans or QR codes.</p>
              <a
                href="mailto:hello@saibende.tech"
                className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-700 hover:text-brand-800"
              >
                Talk to us <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
              <StatCard label="Active links" value={formatNumber(urls.length)} hint={limit === Infinity ? "Unlimited plan" : `${Math.max(0, limit - urls.length)} spots left`} icon={<Link2 className="h-4 w-4" />} />
              <StatCard label="Total clicks" value={formatNumber(totalClicks)} hint="Across all links" icon={<MousePointerClick className="h-4 w-4" />} accent="emerald" />
              <StatCard label="Current plan" value={user.category === "basic" && !user.planExpiresAt ? "Free" : capitalize(user.category)} hint={user.planExpiresAt ? `Until ${formatDate(user.planExpiresAt, { month: "short", day: "numeric" })}` : "Upgrade anytime"} icon={<Wallet className="h-4 w-4" />} accent="amber" />
              <StatCard label="Clicks / link" value={urls.length ? (totalClicks / urls.length).toFixed(1) : "0"} hint="Average performance" icon={<TrendingUp className="h-4 w-4" />} accent="sky" />
            </div>

            <div className="mt-4 lg:hidden">
              <PlanCard user={user} linkCount={urls.length} />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
              <section id="links" className="scroll-mt-24 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card">
                <div className="flex flex-col gap-3 border-b border-ink/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-display text-lg font-semibold tracking-[-0.03em] text-ink">Your links</h2>
                      <Badge variant="outline">{urls.length}</Badge>
                    </div>
                    <p className="mt-1 text-[11px] text-muted">Copy, analyse, rename or remove.</p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/30" />
                      <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search links..."
                        className="h-9 w-full rounded-lg border border-ink/10 bg-canvas pl-9 pr-3 text-[12px] text-ink outline-none transition placeholder:text-ink/30 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10 sm:w-44"
                      />
                    </div>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(event) => setSortBy(event.target.value)}
                        className="h-9 w-full appearance-none rounded-lg border border-ink/10 bg-white pl-3 pr-8 text-[12px] font-medium text-ink/60 outline-none transition focus:border-brand-400 sm:w-auto"
                      >
                        <option value="recent">Newest first</option>
                        <option value="clicks">Most clicks</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/30" />
                    </div>
                  </div>
                </div>

                {urls.length === 0 ? (
                  <div className="p-4 sm:p-5">
                    <EmptyState
                      icon={<Link2 className="h-5 w-5" />}
                      title="Your first link starts here"
                      description="Shorten a URL, add a custom back-half, and it will show up here with its own QR code and click history."
                      action={
                        <Link to="/shortenlink" className={buttonVariants({ variant: "primary", size: "md" })}>
                          <Plus className="h-4 w-4" /> Create your first link
                        </Link>
                      }
                      className="border-0 bg-canvas"
                    />
                  </div>
                ) : filteredUrls.length === 0 ? (
                  <div className="p-4 sm:p-5">
                    <EmptyState
                      icon={<Search className="h-5 w-5" />}
                      title="No links match that search"
                      description={`Nothing found for “${search}”. Try a different short link or destination.`}
                      action={<Button variant="secondary" onClick={() => setSearch("")}>Clear search</Button>}
                      className="border-0 bg-canvas"
                    />
                  </div>
                ) : (
                  <div>
                    {filteredUrls.map((url, index) => (
                      <LinkRow
                        key={url._id}
                        url={url}
                        index={index}
                        copied={copiedLinkId === url._id}
                        onCopy={copyShortLink}
                        onAnalytics={openAnalytics}
                        onQr={setQrLink}
                        onRename={openRename}
                        onDelete={setDeleteLink}
                      />
                    ))}
                    <div className="flex items-center justify-between border-t border-ink/[0.07] px-5 py-3 text-[10px] text-muted">
                      <span>Showing {filteredUrls.length} of {urls.length} links</span>
                      <Link to="/shortenlink" className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:text-brand-800">
                        Add another <Plus className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </section>

              <div className="space-y-4">
                <ProfileRailCard user={user} onCopy={copyProfile} copied={profileCopied} />
                <QuickActions />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={Boolean(analyticsLink)}
        onClose={() => {
          setAnalyticsLink(null);
          setVisitHistory([]);
          setAnalysisError(null);
        }}
        title="Link performance"
        description={analyticsLink ? prettyUrl(shortUrl(analyticsLink.shortId)) : undefined}
        size="lg"
      >
        <div className="p-5 sm:p-6">
          {analysisLoading ? (
            <Loading compact message="Loading visit history..." className="py-14" />
          ) : analysisError ? (
            <ErrorState
              title="Couldn't load analytics"
              message={analysisError}
              onRetry={() => openAnalytics(analyticsLink)}
              className="py-10"
            />
          ) : (
            <VisitTrends
              visitHistory={visitHistory}
              title={analyticsLink ? `Clicks for /${analyticsLink.shortId}` : "Visitor trends"}
              height={260}
            />
          )}
        </div>
      </Modal>

      <Modal
        open={Boolean(qrLink)}
        onClose={() => setQrLink(null)}
        title="QR code"
        description={qrLink ? prettyUrl(shortUrl(qrLink.shortId)) : undefined}
        size="sm"
      >
        {qrLink && (
          <div className="p-6">
            <div className="mx-auto w-fit rounded-2xl border border-ink/10 bg-white p-4 shadow-sm">
              <QRCodeCanvas
                id="dashboard-qr"
                value={shortUrl(qrLink.shortId)}
                size={230}
                bgColor="#ffffff"
                fgColor="#0b0b10"
                level="H"
                imageSettings={{ src: LOGO_URL, height: 38, width: 38, excavate: true }}
                includeMargin={false}
              />
            </div>
            <div className="mt-5 flex gap-2">
              <Button variant="primary" size="md" onClick={downloadQr} className="flex-1">
                <Download className="h-4 w-4" /> Download PNG
              </Button>
              <Button variant="secondary" size="md" onClick={() => copyShortLink(qrLink)}>
                {copiedLinkId === qrLink._id ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={Boolean(renameLink)}
        onClose={() => {
          if (!renameLoading) setRenameLink(null);
        }}
        title="Rename link"
        description="Choose a new back-half. Your old short link will stop working."
        size="sm"
      >
        <form onSubmit={handleRename} className="p-6">
          <Label htmlFor="rename-back-half" required>New back-half</Label>
          <div className="flex overflow-hidden rounded-xl border border-ink/15 bg-white focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10">
            <span className="flex shrink-0 items-center whitespace-nowrap border-r border-ink/10 bg-ink/[0.035] px-3 text-[11px] font-medium text-ink/40">
              {shortDomain()}/
            </span>
            <input
              id="rename-back-half"
              value={renameValue}
              onChange={(event) => setRenameValue(event.target.value.replace(/\s+/g, "-"))}
              className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none"
              autoFocus
              maxLength={32}
            />
          </div>
          {renameError && <p className="mt-2 text-[11px] font-medium text-red-600">{renameError}</p>}
          <div className="mt-5 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setRenameLink(null)} disabled={renameLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={renameLoading}>
              {renameLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Pencil className="h-4 w-4" />}
              Save name
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        open={Boolean(deleteLink)}
        onClose={() => {
          if (!deleteLoading) setDeleteLink(null);
        }}
        title="Delete this link?"
        description="This cannot be undone. The short link and its visit history will be removed."
        size="sm"
      >
        {deleteLink && (
          <div className="p-6">
            <div className="rounded-xl border border-red-200 bg-red-50 p-3">
              <p className="truncate text-[12px] font-semibold text-red-800">{prettyUrl(shortUrl(deleteLink.shortId))}</p>
              <p className="mt-1 truncate text-[10px] text-red-600">{deleteLink.redirectURL}</p>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setDeleteLink(null)} disabled={deleteLoading}>
                Keep it
              </Button>
              <Button variant="danger" onClick={handleDelete} disabled={deleteLoading}>
                {deleteLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                Delete link
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Dashboard;
