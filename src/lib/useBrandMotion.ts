"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

/**
 * The server has no idea what the visitor's motion preference is, so it must
 * report `false` — and if the client's first render disagreed we would get a
 * hydration mismatch on every reduced-motion visitor. That is not hypothetical:
 * these components swap whole element trees on this value.
 */
const getServerSnapshot = () => false;

/**
 * Reduced-motion preference, hydration-safe.
 *
 * `useSyncExternalStore` is the sanctioned way to read a client-only value:
 * React hydrates with the server snapshot, then re-renders with the real one on
 * the next tick — no mismatch, no flash of animation for reduced-motion users
 * because the global `@media (prefers-reduced-motion)` rule in globals.css has
 * already frozen every CSS animation before paint.
 *
 * Use this everywhere instead of Motion's own `useReducedMotion`, which reads
 * the media query during render.
 */
export function useBrandMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
