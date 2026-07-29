"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { navItems, headerCta } from "@/content/nav";
import { site, whatsappHref, telHref } from "@/content/site";
import { Button } from "@/components/ui/Button";
import {
  MenuIcon,
  CloseIcon,
  WhatsAppIcon,
  PhoneIcon,
} from "@/components/ui/icons";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { AvailabilityDot } from "./AvailabilityDot";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Mobile menu.
 *
 * Client component: open state, focus trap, scroll lock and Escape handling.
 *
 * The toggle is a real `<button aria-expanded>` controlling the panel by id, and
 * the panel is a real `<nav>` of real anchors — so with JavaScript disabled the
 * links are still present and reachable (see the `:target` note below).
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  // A stable, human id so the CSS `:target` no-JS fallback can address it.
  const panelId = "mobile-menu";
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  // Scroll lock. Compensating for the scrollbar width prevents the layout
  // shifting sideways as the menu opens.
  useEffect(() => {
    if (!open) return;
    const { body, documentElement: doc } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingInlineEnd;
    const scrollbar = window.innerWidth - doc.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingInlineEnd = `${scrollbar}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingInlineEnd = previousPadding;
    };
  }, [open]);

  // Escape to close, and a focus trap over the panel.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = [
        ...panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ].filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  // Move focus into the panel on open, and return it to the trigger on close.
  useEffect(() => {
    if (open) {
      const panel = panelRef.current;
      panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    } else {
      // Only steal focus back if it is still inside the (now closed) panel.
      if (panelRef.current?.contains(document.activeElement)) {
        triggerRef.current?.focus();
      }
    }
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "סגירת התפריט" : "פתיחת התפריט"}
        className={cn(
          "grid size-11 place-content-center rounded-full lg:hidden",
          "text-text-primary transition-colors duration-200",
          "hover:text-copper-600",
        )}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Without JavaScript the button above cannot do anything, so a real
          anchor targets the panel and CSS `:target` opens it. */}
      <noscript>
        <a
          href={`#${panelId}`}
          aria-label="פתיחת התפריט"
          className="grid size-11 place-content-center rounded-full lg:hidden"
        >
          <MenuIcon />
        </a>
      </noscript>

      <div
        id={panelId}
        ref={panelRef}
        data-open={open}
        className={cn(
          // Visibility is owned by CSS (.mobile-menu), which also provides the
          // `:target` fallback. See globals.css.
          "mobile-menu bg-paper-100 fixed inset-0 z-50 flex-col lg:hidden",
        )}
      >
        <div className="container-content flex h-[72px] shrink-0 items-center justify-end pt-4">
          <button
            type="button"
            onClick={close}
            aria-label="סגירת התפריט"
            className="text-text-primary hover:text-copper-600 grid size-11 place-content-center rounded-full"
          >
            <CloseIcon />
          </button>
          <noscript>
            <a
              href="#"
              aria-label="סגירת התפריט"
              className="grid size-11 place-content-center rounded-full"
            >
              <CloseIcon />
            </a>
          </noscript>
        </div>

        <nav
          aria-label="ניווט ראשי"
          className="container-content flex-1 overflow-y-auto pt-6"
        >
          <ul className={cn(open && "enter-stagger", "grid gap-1")}>
            {navItems.map((item, index) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={close}
                  className={cn(
                    "flex items-baseline justify-between gap-4 py-3",
                    "font-display font-semibold",
                    "text-[clamp(2rem,9vw,2.75rem)] leading-tight",
                    "hover:text-copper-600 transition-colors duration-200",
                  )}
                >
                  <span>{item.label}</span>
                  <MonoLabel tone="muted" as="span" className="shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </MonoLabel>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="container-content border-paper-300 shrink-0 border-t py-6"
          style={{
            paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))",
          }}
        >
          <Button href={headerCta.href} onClick={close} className="w-full">
            {headerCta.label}
          </Button>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <Button
              href={whatsappHref}
              external
              variant="secondary"
              icon={<WhatsAppIcon className="size-5" />}
              data-analytics-whatsapp="mobile_menu"
            >
              WhatsApp
            </Button>
            <Button
              href={telHref}
              variant="secondary"
              icon={<PhoneIcon className="size-5" />}
              data-analytics-phone="mobile_menu"
            >
              שיחה
            </Button>
          </div>

          {site.availableForWork ? (
            <p className="text-body-sm text-text-secondary mt-5 flex items-center gap-2">
              <AvailabilityDot />
              {site.availabilityLabel}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}
