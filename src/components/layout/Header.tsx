"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { navItems, headerCta } from "@/content/nav";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { Wordmark } from "./Wordmark";

/**
 * Header.
 *
 * A floating pill that contracts past 80px of scroll. It NEVER hides — a
 * disappearing header costs conversions, and the CTA has to stay reachable.
 *
 * Client component for one reason: it needs scroll position for the contract
 * state, the progress line and active-section tracking. All three are driven
 * from a SINGLE passive scroll listener coalesced into one rAF, and the
 * progress line is written to a CSS custom property rather than React state, so
 * scrolling causes no re-renders at all. Only the boolean `scrolled` and the
 * active section id are ever allowed to hit React.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.split("#")[1] ?? "");
    let frame = 0;

    const read = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;

      // Written straight to CSS. The progress line is information, so it is
      // retained under reduced motion, but it must never cost a render.
      barRef.current?.style.setProperty("--progress", String(progress));

      setScrolled(doc.scrollTop > 80);

      // Active section: the last one whose top has passed the header.
      let current: string | null = null;
      for (const id of sectionIds) {
        if (!id) continue;
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 140) current = id;
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="container-content pt-4 md:pt-6">
        <div
          ref={barRef}
          className={cn(
            "pointer-events-auto relative flex items-center justify-between gap-4",
            "bg-paper-100/80 rounded-full border px-4 backdrop-blur-xl md:px-5",
            "transition-[height,border-color,box-shadow] duration-300 ease-out",
            "motion-reduce:transition-none",
            scrolled
              ? "border-copper-500/25 h-14 shadow-md"
              : "border-paper-300/70 h-[72px] shadow-sm",
          )}
        >
          {/* Start of the line in RTL is the right edge. */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 rounded-full py-2"
            aria-label={`${site.businessName} — לעמוד הבית`}
          >
            <Wordmark className="text-copper-500 size-7" />
            <span className="text-body-sm font-display font-semibold whitespace-nowrap">
              {site.businessName}
            </span>
          </Link>

          <nav aria-label="ניווט ראשי" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const id = item.href.split("#")[1];
                const isActive = id !== undefined && id === activeId;
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "group relative flex items-center gap-2 rounded-sm px-3 py-2",
                        "text-body-sm transition-colors duration-200",
                        isActive
                          ? "text-copper-600"
                          : "text-text-secondary hover:text-text-primary",
                      )}
                    >
                      {/* Active marker sits at the item's start (right in RTL). */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "bg-copper-500 size-1.5 rounded-full transition-opacity duration-200",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                      />
                      <span className="relative">
                        {item.label}
                        {/* Underline grows from the start edge (right in RTL). */}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "bg-copper-500 absolute inset-x-0 -bottom-0.5 h-px origin-right",
                            "scale-x-0 transition-transform duration-200 ease-out",
                            "group-hover:scale-x-100",
                            "motion-reduce:transition-none",
                          )}
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              href={headerCta.href}
              size="md"
              className="hidden md:inline-flex"
              data-analytics-cta="header"
            >
              {headerCta.label}
            </Button>
            <MobileMenu />
          </div>

          {/* Scroll progress. Grows from the right, because Hebrew starts there.
              `scaleX` on a right-origin element, driven by --progress. */}
          <span
            aria-hidden="true"
            className={cn(
              "bg-copper-500 absolute inset-x-4 bottom-0 h-px origin-right",
              "transition-opacity duration-300",
              scrolled ? "opacity-100" : "opacity-0",
            )}
            style={{ transform: "scaleX(var(--progress, 0))" }}
          />
        </div>
      </div>
    </header>
  );
}
