import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth, useUser } from "@clerk/react";
import { toast } from "react-toastify";
import {
  ChevronDown,
  LayoutDashboard,
  Link2,
  LogOut,
  Menu,
  QrCode,
  Sparkles,
  X,
} from "lucide-react";
import { apiFetch } from "../utils/auth";
import { cn } from "../lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { BrandMark } from "./ui/brand-mark";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/services", label: "Tools" },
  { to: "/linktree", label: "Link in bio" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
];

function Navigationbar() {
  const [profile, setProfile] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user: clerkUser } = useUser();
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchUser = async () => {
      if (!isLoaded) return;
      if (!isSignedIn) {
        setProfile(null);
        return;
      }

      try {
        const response = await apiFetch("/user/isauth", { method: "POST" });
        if (response.status === 401) {
          if (!cancelled) setProfile(null);
          return;
        }
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = await response.json();
        if (!cancelled && result.success) setProfile(result.user);
      } catch (error) {
        console.error("Error fetching navigation profile:", error);
      }
    };

    fetchUser();
    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn]);

  const handleLogout = async () => {
    try {
      toast.success("You’re signed out");
      await signOut({ redirectUrl: "/" });
      setProfile(null);
      setUserMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Could not log out. Please try again.");
    }
  };

  const displayName = profile?.username || profile?.email?.split("@")[0] || clerkUser?.firstName || "Account";
  const initials = String(displayName)
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-ink/10 bg-canvas/80 backdrop-blur-xl transition-shadow duration-300",
        scrolled && "shadow-[0_8px_30px_-24px_rgba(11,11,16,0.45)]"
      )}
    >
      <div className="container-wide flex h-[72px] items-center justify-between gap-5">
        <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label="SGGS home">
          <BrandMark />
          <span className="leading-none">
            <span className="block font-display text-[19px] font-extrabold tracking-[-0.05em] text-ink">
              SGGS
            </span>
            <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.24em] text-ink/40">
              link studio
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3.5 py-2 text-[13px] font-medium transition",
                  isActive
                    ? "bg-ink/[0.06] text-ink"
                    : "text-ink/55 hover:bg-ink/[0.04] hover:text-ink"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {isSignedIn ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((value) => !value)}
                className="flex h-10 items-center gap-2 rounded-full border border-ink/10 bg-white pl-1.5 pr-3 text-sm font-medium text-ink/70 shadow-sm transition hover:border-ink/20 hover:text-ink"
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
              >
                {clerkUser?.imageUrl ? (
                  <img src={clerkUser.imageUrl} alt="" className="h-7 w-7 rounded-full object-cover" />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-sky-400 text-[10px] font-bold text-white">
                    {initials || "S"}
                  </span>
                )}
                <span className="max-w-[120px] truncate">{displayName}</span>
                <ChevronDown className={cn("h-3.5 w-3.5 text-ink/35 transition", userMenuOpen && "rotate-180")} />
              </button>

              {userMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-[calc(100%+10px)] w-64 overflow-hidden rounded-2xl border border-ink/10 bg-white p-1.5 shadow-float"
                >
                  <div className="border-b border-ink/10 px-3 pb-3 pt-2.5">
                    <p className="truncate text-sm font-semibold text-ink">{displayName}</p>
                    <p className="mt-0.5 truncate text-[11px] text-muted">{profile?.email || clerkUser?.primaryEmailAddress?.emailAddress}</p>
                  </div>
                  <div className="py-1.5">
                    <Link to="/dashboard" role="menuitem" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-ink/65 transition hover:bg-ink/[0.04] hover:text-ink">
                      <LayoutDashboard className="h-4 w-4 text-ink/40" /> Dashboard
                    </Link>
                    <Link to="/qrgenerate" role="menuitem" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-ink/65 transition hover:bg-ink/[0.04] hover:text-ink">
                      <QrCode className="h-4 w-4 text-ink/40" /> QR studio
                    </Link>
                    <Link to="/linktree" role="menuitem" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-ink/65 transition hover:bg-ink/[0.04] hover:text-ink">
                      <Link2 className="h-4 w-4 text-ink/40" /> Link in bio
                    </Link>
                  </div>
                  <div className="border-t border-ink/10 pt-1.5">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className={buttonVariants({ variant: "ghost", size: "sm", className: "h-10" })}>
                Sign in
              </Link>
              <Link to="/register" className={buttonVariants({ variant: "primary", size: "sm", className: "h-10 rounded-full px-4" })}>
                Start free <Sparkles className="h-3.5 w-3.5" />
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {!isSignedIn && (
            <Link to="/register" className={buttonVariants({ variant: "primary", size: "sm", className: "h-9 rounded-full px-3.5" })}>
              Start free
            </Link>
          )}
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-white text-ink/65 shadow-sm transition hover:text-ink"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-nav" className="border-t border-ink/10 bg-canvas/95 px-4 pb-5 pt-3 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-xl flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  cn(
                    "rounded-xl px-3.5 py-3 text-sm font-medium transition",
                    isActive ? "bg-ink text-white" : "text-ink/60 hover:bg-ink/[0.05] hover:text-ink"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mx-auto mt-4 max-w-xl border-t border-ink/10 pt-4">
            {isSignedIn ? (
              <>
                <div className="mb-3 flex items-center gap-2.5 px-1">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-sky-400 text-[10px] font-bold text-white">
                    {initials || "S"}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{displayName}</p>
                    <p className="truncate text-[11px] text-muted">{profile?.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to="/dashboard" className={buttonVariants({ variant: "primary", size: "md", className: "flex-1" })}>
                    Dashboard
                  </Link>
                  <Button variant="secondary" size="md" onClick={handleLogout} aria-label="Sign out">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className={buttonVariants({ variant: "secondary", size: "md", className: "flex-1" })}>
                  Sign in
                </Link>
                <Link to="/register" className={buttonVariants({ variant: "primary", size: "md", className: "flex-1" })}>
                  Start free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navigationbar;
