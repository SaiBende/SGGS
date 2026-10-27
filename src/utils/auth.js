import { getToken as getClerkToken } from "@clerk/react";

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

// Clerk's standalone getToken() waits for initialization, so this is safe to
// call from event handlers and effects alike.
export const getToken = () => getClerkToken();

// Central API helper. Always attaches the current Clerk bearer token and
// leaves JSON/FormData detection to the caller's headers.
export const apiFetch = async (path, options = {}) => {
    const token = await getClerkToken();
    const headers = new Headers(options.headers || {});

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const isFormData =
        typeof FormData !== "undefined" && options.body instanceof FormData;

    if (options.body != null && !isFormData && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const url = /^https?:\/\//i.test(path) ? path : `${API_URL}${path}`;

    return fetch(url, {
        credentials: "include",
        ...options,
        headers,
    });
};
