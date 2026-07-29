import { cn } from "@/lib/cn";

/**
 * The site's ONE palette-transition device, reused at every band boundary: a
 * full-bleed diagonal wipe travelling from the right (where Hebrew begins) with
 * a copper hairline riding its leading edge.
 *
 * Having exactly one transition device is what makes the band changes read as a
 * system rather than as decoration.
 *
 * Purely decorative and `aria-hidden`. Server component, zero JavaScript — the
 * shape is a `clip-path` polygon, so there is nothing to animate or measure.
 */
export function BandTransition({
  from,
  to,
  className,
}: {
  from: "paper" | "ink" | "ink-deep";
  to: "paper" | "ink" | "ink-deep";
  className?: string;
}) {
  const bg = {
    paper: "bg-paper-100",
    ink: "bg-ink-900",
    "ink-deep": "bg-ink-950",
  };

  return (
    <div
      aria-hidden="true"
      className={cn("relative h-[12vh] min-h-16 w-full", bg[from], className)}
    >
      {/* The incoming band, cut on a diagonal that rises toward the right. */}
      <div
        className={cn("absolute inset-0", bg[to])}
        style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
      />
      {/* Copper hairline on the leading edge. Drawn as a rotated-free gradient
          line so it stays exactly 1px at every viewport width. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top right, transparent calc(50% - 0.5px), var(--color-copper-500) calc(50% - 0.5px), var(--color-copper-500) calc(50% + 0.5px), transparent calc(50% + 0.5px))",
        }}
      />
    </div>
  );
}
