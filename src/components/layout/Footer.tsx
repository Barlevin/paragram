import Link from "next/link";
import { site, whatsappHref, telHref, mailtoHref } from "@/content/site";
import { footerNav } from "@/content/nav";
import { Ltr } from "@/components/ui/Ltr";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Wordmark } from "./Wordmark";
import { AvailabilityDot } from "./AvailabilityDot";
import { WhatsAppIcon, PhoneIcon, MailIcon } from "@/components/ui/icons";

/** Server component — entirely static. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="band-ink-deep on-ink">
      <div className="container-content py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — identity and direct contact. */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <Wordmark className="text-copper-400 size-7" />
              <span className="font-display text-body-lg font-semibold">
                {site.businessName}
              </span>
            </div>

            <p className="measure text-body-sm text-text-inverse-secondary mt-4">
              {site.tagline}
            </p>

            {site.availableForWork ? (
              <p className="text-body-sm mt-5 flex items-center gap-2">
                <AvailabilityDot />
                {site.availabilityLabel}
              </p>
            ) : null}

            <ul className="mt-6 grid gap-3">
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-whatsapp="footer"
                  className="text-body-sm hover:text-copper-400 inline-flex min-h-11 items-center gap-2.5 transition-colors"
                >
                  <WhatsAppIcon className="text-copper-400 size-5" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={telHref}
                  data-analytics-phone="footer"
                  className="text-body-sm hover:text-copper-400 inline-flex min-h-11 items-center gap-2.5 transition-colors"
                >
                  <PhoneIcon className="text-copper-400 size-5" />
                  <Ltr>{site.phoneDisplay}</Ltr>
                </a>
              </li>
              <li>
                <a
                  href={mailtoHref}
                  data-analytics-email="footer"
                  className="text-body-sm hover:text-copper-400 inline-flex min-h-11 items-center gap-2.5 transition-colors"
                >
                  <MailIcon className="text-copper-400 size-5" />
                  <Ltr>{site.email}</Ltr>
                </a>
              </li>
            </ul>
          </div>

          {/* Columns 2–4 — link groups. */}
          {footerNav.map((group) => (
            <nav key={group.key} aria-labelledby={`footer-${group.key}`}>
              <MonoLabel tone="inverse" as="p" className="mb-4">
                <span id={`footer-${group.key}`}>{group.title}</span>
              </MonoLabel>
              <ul className="grid gap-2">
                {group.links.map((link) => (
                  <li key={`${group.key}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-text-inverse-secondary hover:text-copper-400 inline-flex min-h-11 min-w-11 items-center transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-ink-700 mt-14 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-body-sm text-text-inverse-secondary">
            © <Ltr>{year}</Ltr> {site.businessName}. כל הזכויות שמורות.
          </p>

          {site.socials.length > 0 ? (
            <ul className="flex items-center gap-4">
              {site.socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm text-text-inverse-secondary hover:text-copper-400 inline-flex min-h-11 min-w-11 items-center transition-colors"
                  >
                    {social.labelHe}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          <MonoLabel tone="inverse" as="p">
            נבנה ב-Next.js
          </MonoLabel>
        </div>
      </div>
    </footer>
  );
}
