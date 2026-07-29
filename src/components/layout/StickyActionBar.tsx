"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { whatsappHref, telHref } from "@/content/site";
import { WhatsAppIcon, PhoneIcon } from "@/components/ui/icons";

/**
 * Mobile sticky action bar.
 *
 * Appears after 60% scroll depth and hides whenever the contact form is in view,
 * so it can never cover a field the visitor is filling in. Probably the
 * highest-ROI conversion element on the site.
 *
 * Client component: needs scroll depth. Uses the same single-rAF pattern as the
 * header, and `#contact` visibility is read from the same loop rather than
 * adding an IntersectionObserver.
 */
export function StickyActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const depth = max > 0 ? doc.scrollTop / max : 0;

      let contactInView = false;
      const contact = document.getElementById("contact");
      if (contact) {
        const rect = contact.getBoundingClientRect();
        contactInView = rect.top < window.innerHeight && rect.bottom > 0;
      }

      const next = depth > 0.6 && !contactInView;
      setVisible((prev) => (prev === next ? prev : next));
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
    <div
      // Hidden from assistive tech and the tab order while off-screen; the same
      // actions are always available in the footer and the mobile menu.
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 lg:hidden",
        "border-paper-300 bg-paper-100/90 border-t backdrop-blur-md",
        "transition-transform duration-300 ease-out",
        "motion-reduce:transition-none",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex gap-2 p-3">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? undefined : -1}
          data-analytics-whatsapp="sticky_bar"
          className={cn(
            "inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md",
            "bg-copper-500 text-body-sm text-paper-50 font-semibold",
            "hover:bg-copper-400 transition-colors duration-200",
          )}
        >
          <WhatsAppIcon className="size-5" />
          שליחת הודעה
        </a>
        <a
          href={telHref}
          tabIndex={visible ? undefined : -1}
          data-analytics-phone="sticky_bar"
          aria-label="התקשרות טלפונית"
          className={cn(
            "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5",
            "border-paper-300 bg-paper-50 text-body-sm border font-semibold",
            "hover:border-copper-500 transition-colors duration-200",
          )}
        >
          <PhoneIcon className="size-5" />
          שיחה
        </a>
      </div>
    </div>
  );
}
