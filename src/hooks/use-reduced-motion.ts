"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void): () => void {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/** The server can't know the preference; CSS already covers that case. */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Live reduced-motion preference.
 *
 * `useSyncExternalStore` is the right primitive here: a media query is external
 * state, so this stays correct when the preference is toggled mid-session
 * without triggering a cascading render on mount.
 *
 * This hook exists only for the JavaScript-driven pieces — the hero seam, GSAP
 * and the form step transitions. Everything CSS-animated already handles the
 * reduced case through `@media (prefers-reduced-motion: ...)` and does not need
 * to consult React at all.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
