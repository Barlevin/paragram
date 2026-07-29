import { cn } from "@/lib/cn";
import { MonoLabel } from "@/components/ui/MonoLabel";

/* ==========================================================================
   SectionShell

   Owns the band colour, vertical rhythm, container width and the
   `aria-labelledby` wiring that connects every <section> to its real heading.

   Server component.
   ========================================================================== */

type Band = "paper" | "ink" | "ink-deep";

const BAND_CLASS: Record<Band, string> = {
  paper: "band-paper",
  ink: "band-ink on-ink",
  "ink-deep": "band-ink-deep on-ink",
};

export function SectionShell({
  id,
  band = "paper",
  eyebrow,
  eyebrowIndex,
  heading,
  headingId,
  intro,
  children,
  container = "content",
  className,
  headingClassName,
  labelledBy,
}: {
  id?: string;
  band?: Band;
  eyebrow?: string;
  eyebrowIndex?: number;
  heading?: React.ReactNode;
  headingId?: string;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  container?: "content" | "wide" | "narrow" | "none";
  className?: string;
  headingClassName?: string;
  /** Use when the heading is rendered by a child rather than by the shell. */
  labelledBy?: string;
}) {
  const resolvedHeadingId = headingId ?? (id ? `${id}-heading` : undefined);
  const containerClass = {
    content: "container-content",
    wide: "container-wide",
    narrow: "container-narrow",
    none: "",
  }[container];

  const isInk = band !== "paper";

  return (
    <section
      id={id}
      aria-labelledby={labelledBy ?? resolvedHeadingId}
      className={cn(BAND_CLASS[band], "py-24 md:py-32 xl:py-40", className)}
    >
      <div className={containerClass}>
        {eyebrow ? (
          <MonoLabel
            index={eyebrowIndex}
            tone={isInk ? "inverse" : "copper"}
            className="mb-4"
          >
            {eyebrow}
          </MonoLabel>
        ) : null}

        {heading ? (
          <h2
            id={resolvedHeadingId}
            className={cn(
              "text-display-md max-w-[24ch] text-balance",
              headingClassName,
            )}
          >
            {heading}
          </h2>
        ) : null}

        {intro ? (
          <div
            className={cn(
              "measure text-body-lg mt-5",
              isInk ? "text-text-inverse-secondary" : "text-text-secondary",
            )}
          >
            {intro}
          </div>
        ) : null}

        {children}
      </div>
    </section>
  );
}
