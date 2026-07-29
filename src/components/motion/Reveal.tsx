import { cn } from "@/lib/cn";

/**
 * Scroll reveal.
 *
 * This is a SERVER component. It emits a class name and nothing else — the
 * animation is native CSS (`animation-timeline: view()`, see motion.css), runs
 * on the compositor, and costs zero JavaScript. There is no
 * IntersectionObserver anywhere in this codebase.
 *
 * Because the content is always in the DOM and only its appearance is animated,
 * no information is ever animation-only, which is what makes the accessibility
 * and no-JavaScript stories good by construction rather than by effort.
 */

type RevealVariant = "rise" | "fade" | "plate";

const VARIANT_CLASS: Record<RevealVariant, string> = {
  rise: "reveal",
  fade: "reveal-fade",
  plate: "reveal-plate",
};

export function Reveal({
  children,
  variant = "rise",
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  variant?: RevealVariant;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "p" | "span" | "figure";
}) {
  return (
    <Tag className={cn(VARIANT_CLASS[variant], className)}>{children}</Tag>
  );
}

/**
 * Staggered group. Children stagger via progressively later `animation-range`
 * slices on a shared view timeline — no per-child delay, no JavaScript.
 */
export function RevealGroup({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "section" | "dl";
}) {
  return <Tag className={cn("reveal-group", className)}>{children}</Tag>;
}

/**
 * Per-line text reveal for headings.
 *
 * Lines are pre-split in the content layer and wrapped server-side. Splitting is
 * word- and line-level only, never per-character: Hebrew letters don't connect
 * so char-splitting isn't a shaping problem, but bidi reordering means a
 * char-split line containing mixed Hebrew and Latin renders in scrambled visual
 * order.
 *
 * The full text stays readable to screen readers because each line is a real
 * text node inside the heading, not a decorative fragment.
 */
export function MaskedLines({
  lines,
  className,
  lineClassName,
  as: Tag = "span",
}: {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  as?: "span" | "div";
}) {
  return (
    <Tag className={cn("mask-lines block", className)}>
      {lines.map((line) => (
        <span key={line} className={cn("block", lineClassName)}>
          {line}
        </span>
      ))}
    </Tag>
  );
}
