const DEFAULT_PLATFORM_DOMAIN = "sggs.saibende.in";

export const PLATFORM_DOMAIN = (
  import.meta.env.VITE_PLATFORM_DOMAIN || DEFAULT_PLATFORM_DOMAIN
)
  .trim()
  .toLowerCase();

// Hosts that always render the full app, even though they sit under the
// platform domain (www is the important one).
const MAIN_HOSTS = new Set(
  (
    import.meta.env.VITE_MAIN_HOSTS ||
    "sggs.saibende.in,www.sggs.saibende.in,sggs-kappa.vercel.app"
  )
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean)
);

export function normalizeHost(value = window.location.hostname) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/:\d+$/, "")
    .replace(/\.$/, "");
}

function platformBases() {
  const bases = [PLATFORM_DOMAIN];
  if (import.meta.env.DEV) bases.push("localhost", "127.0.0.1");
  return bases;
}

// Returns the handle for a platform tenant host, or null for the main app.
export function getTenantHandle(hostname = window.location.hostname) {
  const host = normalizeHost(hostname);
  if (!host || MAIN_HOSTS.has(host)) return null;

  for (const base of platformBases()) {
    if (!base || host === base) continue;
    if (!host.endsWith(`.${base}`)) continue;

    const label = host.slice(0, -(base.length + 1));
    if (!label || label.includes(".")) return null;
    if (/^\d+$/.test(label)) return null;

    return label;
  }

  return null;
}

export function isTenantHost(hostname) {
  return Boolean(getTenantHandle(hostname));
}

export function platformHost(handle) {
  if (!handle) return "";
  if (import.meta.env.DEV) return `${handle}.localhost`;
  return `${handle}.${PLATFORM_DOMAIN}`;
}

export function platformUrl(handle) {
  if (!handle) return "";

  if (import.meta.env.DEV) {
    const port = window.location.port ? `:${window.location.port}` : "";
    return `${window.location.protocol}//${handle}.localhost${port}`;
  }

  return `https://${handle}.${PLATFORM_DOMAIN}`;
}

// Used when a tenant host receives a link that belongs to the main app
// (login, pricing, dashboard, etc.). Keeps auth and Clerk on the main origin.
export function mainAppUrl(path = "") {
  const clean = String(path || "").replace(/^\/+/, "");

  if (import.meta.env.DEV) {
    const port = window.location.port ? `:${window.location.port}` : "";
    return `${window.location.protocol}//localhost${port}/${clean}`;
  }

  return `https://${PLATFORM_DOMAIN}/${clean}`;
}
