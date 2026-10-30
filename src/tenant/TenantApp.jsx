import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import RedirectURL from "../components/RedirectURL";
import ProfileCard from "../publicprofile/ProfileCard";
import { getTenantHandle, mainAppUrl } from "../lib/platform";
import TenantNotFound from "./TenantNotFound";

// Paths that belong to the authenticated app. A tenant host must never render
// Clerk or the dashboard, so send these to the main origin instead.
const MAIN_APP_PATHS = [
  "about",
  "dashboard",
  "forgot-password",
  "linktree",
  "login",
  "payment",
  "pricing",
  "qrgenerate",
  "register",
  "services",
  "shortenlink",
  "u",
];

function ExternalRedirect() {
  const location = useLocation();
  const to = mainAppUrl(
    `${location.pathname}${location.search}${location.hash}`
  );

  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <Loading message="Taking you to SGGS..." />
    </div>
  );
}

function TenantProfile() {
  const handle = getTenantHandle();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadSite = async () => {
      if (!handle) {
        setError("This subdomain is not connected to a profile.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/public/site?host=${encodeURIComponent(
            window.location.hostname
          )}`
        );
        const data = await response.json();

        if (!response.ok || data.error) {
          throw new Error(data.error || "Site not found");
        }

        if (!cancelled) {
          setProfile(data);
          setError(null);
          document.title = `@${data.username} · SGGS`;
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError.message || "Site not found");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadSite();

    return () => {
      cancelled = true;
    };
  }, [handle]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-white">
        <Loading message="Opening profile..." className="text-white" />
      </div>
    );
  }

  if (error) {
    return <TenantNotFound message={error} />;
  }

  return (
    <ProfileCard
      username={profile?.username}
      initialProfile={profile}
    />
  );
}

function TenantApp() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/" element={<TenantProfile />} />

        {MAIN_APP_PATHS.map((path) => (
          <Route
            key={path}
            path={`${path}/*`}
            element={<ExternalRedirect />}
          />
        ))}

        <Route path="/:shortId" element={<RedirectURL />} />
        <Route path="*" element={<TenantNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default TenantApp;
