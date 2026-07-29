import { cn } from "@/lib/cn";
import { Hairline } from "@/components/ui/MonoLabel";

/**
 * Long-form Hebrew text container. Constrains the measure and sets the vertical
 * rhythm for legal pages. Server component.
 */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "measure text-body text-text-secondary mt-10 grid gap-10",
        "[&_strong]:text-text-primary [&_p]:leading-[1.8] [&_strong]:font-semibold",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** A titled block inside `Prose`, with an anchorable heading. */
export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="grid gap-3">
      <h2
        id={id}
        className="text-heading font-display text-text-primary font-semibold"
      >
        {title}
      </h2>
      <Hairline className="mb-1" />
      {children}
    </section>
  );
}
