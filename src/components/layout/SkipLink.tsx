import { skipLinkLabel } from "@/content/nav";

/**
 * First focusable element on every page. Visually hidden until focused, then it
 * appears as a real copper pill at the top-start corner.
 *
 * Server component.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only-focusable bg-copper-500 text-body-sm text-paper-50 fixed inset-s-4 top-4 z-[100] inline-flex min-h-11 items-center rounded-md px-4 font-semibold shadow-lg"
    >
      {skipLinkLabel}
    </a>
  );
}
