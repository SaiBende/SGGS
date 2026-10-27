// Remember where a signed-out user was trying to go. Clerk's path routing
// changes the URL during sign-in/sign-up, which drops React Router location
// state; sessionStorage keeps the target across those steps (and across an
// OAuth round trip) until the session is established.
const KEY = 'sggs.auth.redirect';
const MAX_AGE = 15 * 60 * 1000;

export const authRedirectPath = (location) => {
    if (!location) return null;
    return `${location.pathname || '/'}${location.search || ''}${location.hash || ''}`;
};

export const rememberAuthRedirect = (location) => {
    const path = authRedirectPath(location);
    if (!path) return null;

    try {
        sessionStorage.setItem(KEY, JSON.stringify({ path, at: Date.now() }));
    } catch {
        // sessionStorage can be unavailable in strict privacy modes.
    }

    return path;
};

export const readAuthRedirect = (fallback = '/dashboard') => {
    try {
        const raw = sessionStorage.getItem(KEY);
        if (!raw) return fallback;

        const stored = JSON.parse(raw);
        if (!stored?.path || Date.now() - stored.at > MAX_AGE) {
            sessionStorage.removeItem(KEY);
            return fallback;
        }

        return stored.path;
    } catch {
        return fallback;
    }
};

export const clearAuthRedirect = () => {
    try {
        sessionStorage.removeItem(KEY);
    } catch {
        // Nothing to clear when storage is unavailable.
    }
};
