import { parseContent, SiteSchema } from "./schema";

/**
 * Business details.
 *
 * Values marked [להשלמה] are placeholders awaiting real information. The phone
 * and WhatsApp numbers below are structurally valid so the app builds and the
 * links are exercisable in development, but they are NOT real and must be
 * replaced before launch.
 */
export const site = parseContent(
  SiteSchema,
  {
    businessName: "[להשלמה: שם העסק]",
    ownerName: "[להשלמה: שם מלא]",
    tagline: "אתרים בעבודת יד לעסקים שלא רוצים להיראות כמו כולם",
    yearsOfExperience: 8,

    // [להשלמה] — placeholder numbers, structurally valid so links work locally.
    phone: "0500000000",
    phoneDisplay: "050-0000000",
    whatsapp: "+972500000000",
    whatsappPrefill: "היי, הגעתי מהאתר ואשמח לשמוע עוד על בניית אתר לעסק שלי.",
    email: "hello@example.co.il",

    availableForWork: true,
    availabilityLabel: "זמין לפרויקטים חדשים",
    responsePromise: "תשובה תוך יום עסקים אחד",

    socials: [
      // [להשלמה] — remove or replace with real profiles before launch.
      {
        platform: "github",
        url: "https://github.com/example",
        labelHe: "GitHub",
      },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/example",
        labelHe: "LinkedIn",
      },
    ],

    legal: {
      privacyUpdatedAt: "2026-07-29",
      accessibilityUpdatedAt: "2026-07-29",
      conformanceTarget: "WCAG 2.2 ברמת AA",
    },
  },
  "content/site.ts",
);

/** wa.me deep link with the Hebrew prefill already encoded. */
export const whatsappHref = `https://wa.me/${site.whatsapp.replace("+", "")}?text=${encodeURIComponent(
  site.whatsappPrefill,
)}`;

export const telHref = `tel:${site.phone}`;
export const mailtoHref = `mailto:${site.email}`;
