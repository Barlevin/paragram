import { cn } from "@/lib/cn";

/**
 * Studio mark: a corner registration mark with a drafted diagonal — the
 * drafting vocabulary compressed into 24px. Placeholder until a real logo
 * exists ([להשלמה]), but it is deliberately not a generic geometric blob.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-6 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      {/* Registration corners: top-right and bottom-left (the RTL diagonal). */}
      <path d="M21 3h-6M21 3v6" />
      <path d="M3 21h6M3 21v-6" />
      {/* The drafted line being resolved. */}
      <path d="M20 4L4 20" strokeDasharray="3 2.5" opacity="0.5" />
      <path d="M20 4l-8 8" />
    </svg>
  );
}
