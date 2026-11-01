// Client-side mirror of the backend username rules. The backend still
// validates every save; this only keeps the live preview and helper text in
// sync while the user types.
export function normalizeUsername(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

export function usernameHandle(value) {
  return normalizeUsername(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30)
    .replace(/-+$/g, "");
}

export function normalizeHandleInput(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/g, "")
    .slice(0, 30);
}
