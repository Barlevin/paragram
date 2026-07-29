import { z } from "zod";
import { CtaSchema, NavItemSchema, parseContent } from "./schema";

/**
 * Primary navigation. Homepage anchors, in RTL reading order.
 *
 * These are real anchor links, so navigation works with JavaScript disabled and
 * find-in-page still scrolls correctly.
 */
export const navItems = parseContent(
  z.array(NavItemSchema).length(6),
  [
    { key: "services", label: "שירותים", href: "/#services", order: 1 },
    { key: "work", label: "עבודות", href: "/#work", order: 2 },
    { key: "process", label: "תהליך", href: "/#process", order: 3 },
    { key: "about", label: "עליי", href: "/#about", order: 4 },
    { key: "testimonials", label: "המלצות", href: "/#testimonials", order: 5 },
    { key: "faq", label: "שאלות נפוצות", href: "/#faq", order: 6 },
  ],
  "content/nav.ts",
);

export const headerCta = parseContent(
  CtaSchema,
  {
    key: "header-primary",
    label: "בואו נדבר",
    href: "/contact",
    location: "header",
    variant: "primary",
  },
  "content/nav.ts (headerCta)",
);

/** Footer link columns. */
export const footerNav = parseContent(
  z.array(
    z.object({
      key: z.string(),
      title: z.string(),
      links: z.array(z.object({ label: z.string(), href: z.string() })).min(2),
    }),
  ),
  [
    {
      key: "site",
      title: "באתר",
      links: [
        { label: "שירותים", href: "/#services" },
        { label: "עבודות", href: "/#work" },
        { label: "תהליך העבודה", href: "/#process" },
        { label: "עליי", href: "/#about" },
        { label: "שאלות נפוצות", href: "/#faq" },
      ],
    },
    {
      key: "services",
      title: "מה אני בונה",
      links: [
        { label: "אתרי תדמית לעסקים", href: "/#services" },
        { label: "דפי נחיתה", href: "/#services" },
        { label: "חנויות אונליין", href: "/#services" },
        { label: "מערכות ואפליקציות ווב", href: "/#services" },
        { label: "עיצוב מחדש לאתר קיים", href: "/#services" },
      ],
    },
    {
      key: "legal",
      title: "מידע",
      links: [
        { label: "מדיניות פרטיות", href: "/privacy" },
        { label: "הצהרת נגישות", href: "/accessibility" },
      ],
    },
  ],
  "content/nav.ts (footerNav)",
);

export const skipLinkLabel = "דילוג לתוכן המרכזי";
