import { cn } from "@/lib/cn";

/* ==========================================================================
   Accordion

   Native <details name="..."> gives exclusive-open behaviour, full keyboard
   support and correct screen-reader semantics for FREE, with zero JavaScript.

   The height transition uses `interpolate-size: allow-keywords` plus
   `transition-behavior: allow-discrete` (set up in globals.css), so there is no
   JavaScript height measurement and no layout thrash. Where those are
   unsupported, the panel simply opens instantly — which is fine.

   Because the content lives in the DOM whether open or closed, Google indexes
   every answer. That is what makes the FAQ structured data legitimate.

   Server component.
   ========================================================================== */

export function Accordion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "divide-paper-300 border-paper-300 divide-y border-y",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AccordionItem({
  id,
  group,
  question,
  children,
  className,
}: {
  id: string;
  /** Shared name makes the group exclusive-open, natively. */
  group: string;
  question: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <details
      id={id}
      name={group}
      className={cn(
        "group [&_summary::-webkit-details-marker]:hidden",
        className,
      )}
    >
      <summary
        className={cn(
          "flex cursor-pointer items-start justify-between gap-4",
          "py-5 text-start",
          "list-none",
          "transition-colors duration-200",
          "hover:text-copper-600",
          "focus-visible:outline focus-visible:outline-2",
          "focus-visible:outline-copper-500 focus-visible:-outline-offset-2",
        )}
      >
        <span className="text-heading font-display font-semibold">
          {question}
        </span>
        <PlusMinus />
      </summary>

      <div className="measure text-body text-text-secondary pb-6">
        {children}
      </div>
    </details>
  );
}

/**
 * The vertical stroke collapses when the parent <details> is open, turning the
 * plus into a minus. Pure CSS, driven by the native `open` attribute.
 */
function PlusMinus() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="text-copper-500 mt-1 size-5 shrink-0"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 12h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 4v16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={cn(
          "origin-center transition-transform duration-200 ease-out",
          "group-open:scale-y-0",
          "motion-reduce:transition-none",
        )}
      />
    </svg>
  );
}
