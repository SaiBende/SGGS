export const BRAND = {
  name: "SGGS",
  fullName: "Shorten, Generate, Group & Share",
  domain: "sggs.saibende.in",
  shortDomain: "go.saibende.in",
  url: "https://sggs.saibende.in",
  tagline: "One workspace for every link",
};

function trimTrailingSlash(value) {
  return String(value || "").replace(/\/+$/, "");
}

// Short links live on the dedicated redirect host in production, where the
// backend answers with a real 302. Local development keeps them on the
// frontend origin so the legacy /:shortId route stays testable.
export function shortBaseUrl() {
  const configured = import.meta.env.VITE_SHORT_URL;
  if (configured) return trimTrailingSlash(configured);
  if (import.meta.env.PROD) return `https://${BRAND.shortDomain}`;
  return trimTrailingSlash(import.meta.env.VITE_FRONTEND_URL || BRAND.url);
}

export function shortDomain() {
  return shortBaseUrl().replace(/^https?:\/\//, "");
}

export function shortUrl(shortId) {
  return `${shortBaseUrl()}/${String(shortId || "").replace(/^\/+/, "")}`;
}

// Marketing previews always show the production short domain, never localhost.
export function brandShortLink(path = "") {
  const cleanPath = String(path || "").replace(/^\/+/, "");
  return cleanPath ? `${BRAND.shortDomain}/${cleanPath}` : BRAND.shortDomain;
}

export function brandUrl(path = "") {
  const cleanPath = String(path || "").replace(/^\/+/, "");
  return cleanPath ? `${BRAND.url}/${cleanPath}` : BRAND.url;
}
