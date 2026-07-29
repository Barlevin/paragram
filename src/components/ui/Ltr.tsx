import { cn } from "@/lib/cn";

/**
 * Bidi isolation for LTR runs inside Hebrew text.
 *
 * Without this, a Hebrew sentence ending in a phone number, email address, URL
 * or bare numeral renders that run in the wrong visual position. It is the most
 * common bug on Hebrew websites, and it is invisible until someone reads the
 * page carefully.
 *
 * Server component — this is pure markup.
 */
export function Ltr({
  children,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "bdi" | "div";
}) {
  return (
    <Tag dir="ltr" className={cn("ltr-isolate", className)}>
      {children}
    </Tag>
  );
}
