import { cn } from "@/lib/cn";

/**
 * Live availability indicator. The outer ring pulses only when motion is
 * allowed; the solid centre dot always renders, so the state is never
 * communicated by animation alone.
 */
export function AvailabilityDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative grid size-2.5 shrink-0 place-content-center",
        className,
      )}
    >
      <span className="bg-success-600/30 absolute inset-0 rounded-full motion-safe:animate-ping" />
      <span className="bg-success-600 size-2 rounded-full" />
    </span>
  );
}
