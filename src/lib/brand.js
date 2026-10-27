export const BRAND = {
  name: "SGGS",
  fullName: "Shorten, Generate, Group & Share",
  domain: "sggs.saibende.in",
  url: "https://sggs.saibende.in",
  tagline: "One workspace for every link",
};

function trimTrailingSlash(value) {
  return String(value || "").replace(/\/+$/, "");
}

// Live short links live on the frontend origin (or VITE_FRONTEND_URL in prod).
export function shortBaseUrl() {
  return trimTrailingSlash(import.meta.env.VITE_FRONTEND_URL || BRAND.url);
}

export function shortDomain() {
  return shortBaseUrl().replace(/^https?:\/\//, "");
}

export function shortUrl(shortId) {
  return `${shortBaseUrl()}/${String(shortId || "").replace(/^\/+/, "")}`;
}

// Marketing previews always show the production domain, never localhost.
export function brandShortLink(path = "") {
  const cleanPath = String(path || "").replace(/^\/+/, "");
  return cleanPath ? `${BRAND.domain}/${cleanPath}` : BRAND.domain;
}

export function brandUrl(path = "") {
  const cleanPath = String(path || "").replace(/^\/+/, "");
  return cleanPath ? `${BRAND.url}/${cleanPath}` : BRAND.url;
}
