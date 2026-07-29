"use client";

import { createContext, useContext } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const ReducedMotionContext = createContext<boolean>(false);

/**
 * Shares one `prefers-reduced-motion` subscription across every consumer, so
 * the seam, the portfolio board, the form and the sticky bar don't each register
 * their own media-query listener.
 *
 * Mounted high in the tree but deliberately tiny: it renders `children`
 * untouched, so wrapping the app in it does not turn any of the section content
 * into client components.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  return (
    <ReducedMotionContext.Provider value={prefersReduced}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

/** Reads the shared preference. Safe to call outside the provider (returns false). */
export function usePrefersReducedMotion(): boolean {
  return useContext(ReducedMotionContext);
}
