import { cn } from "@/lib/cn";

/**
 * Drafting annotation label. One of the four permitted decorative elements
 * (with the draft grid, dimension lines and corner registration marks).
 *
 * Hebrew inside a mono label falls through from JetBrains Mono to Assistant
 * automatically, because the mono face carries no Hebrew glyphs.
 *
 * Server component.
 */
export function MonoLabel({
  children,
  index,
  tone = "copper",
  className,
  as: Tag = "p",
}: {
  children?: React.ReactNode;
  /** Rendered as a zero-padded numeral, e.g. 01. */
  index?: number;
  tone?: "copper" | "muted" | "inverse" | "draft";
  className?: string;
  as?: "p" | "span" | "div" | "dt";
}) {
  const toneClass = {
    copper: "text-copper-600",
    muted: "text-text-tertiary",
    inverse: "text-text-inverse-secondary",
    draft: "text-draft-400",
  }[tone];

  // No `uppercase` here: Hebrew has no case, so text-transform is meaningless
  // at best and, on the Latin technical terms these labels mix in, unwanted.
  return (
    <Tag className={cn("mono-label", toneClass, className)}>
      {index !== undefined ? (
        <span dir="ltr" className="ltr-isolate me-2 tabular-nums">
          {String(index).padStart(2, "0")}
        </span>
      ) : null}
      {children}
    </Tag>
  );
}

/** A 1px rule. Always exactly 1px, never scaled. */
export function Hairline({
  className,
  tone = "paper",
  animated = false,
}: {
  className?: string;
  tone?: "paper" | "ink" | "copper";
  animated?: boolean;
}) {
  const toneClass = {
    paper: "bg-paper-300",
    ink: "bg-ink-700",
    copper: "bg-copper-500",
  }[tone];

  return (
    <span
      aria-hidden="true"
      className={cn(
        "block h-px w-full",
        toneClass,
        // Draws itself right-to-left when animated.
        animated && "rule-fill",
        className,
      )}
    />
  );
}
