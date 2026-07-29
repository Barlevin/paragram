import { cn } from "@/lib/cn";

/* ==========================================================================
   Form primitives

   Labels sit above the control and are ALWAYS visible. Floating labels are both
   an RTL liability (the transform origin and the placeholder collision differ
   per direction) and an accessibility one (they double as placeholder text and
   disappear on input).

   Phone and email inputs get `dir="ltr"` with `text-align: end` so digits and
   Latin never reorder, while the field still visually aligns with the Hebrew
   form around it.
   ========================================================================== */

const CONTROL_BASE = [
  "block w-full rounded-sm border bg-paper-50",
  "px-3 text-body text-text-primary",
  "transition-[border-color,box-shadow] duration-200 ease-out",
  "placeholder:text-text-tertiary",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

const CONTROL_STATE = {
  rest: "border-paper-300 hover:border-ink-600/40",
  error: "border-error-600",
} as const;

const FOCUS = [
  "focus:border-copper-500 focus:outline-none",
  "focus:ring-[3px] focus:ring-copper-500/10",
].join(" ");

export function Field({
  id,
  label,
  hint,
  error,
  optionalLabel,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optionalLabel?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn("grid gap-2", className)}>
      <label htmlFor={id} className="text-body-sm font-semibold">
        {label}
        {optionalLabel ? (
          <span className="text-text-tertiary ms-2 font-normal">
            {optionalLabel}
          </span>
        ) : null}
      </label>

      {hint ? (
        <p id={hintId} className="text-body-sm text-text-tertiary">
          {hint}
        </p>
      ) : null}

      {children}

      {/* role="alert" carries the information, so motion is never the sole
          channel for communicating a validation failure. */}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-body-sm text-error-600 font-semibold"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Builds the aria wiring a control needs from its field's ids. */
export function describedBy(id: string, hint?: string, error?: string) {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(
    Boolean,
  );
  return {
    "aria-describedby": ids.length ? ids.join(" ") : undefined,
    "aria-invalid": error ? (true as const) : undefined,
  };
}

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className"
> & {
  invalid?: boolean;
  className?: string;
  /** LTR content: phone, email, url. Keeps digits and Latin in visual order. */
  ltr?: boolean;
};

export function Input({ invalid, className, ltr, ...rest }: InputProps) {
  return (
    <input
      dir={ltr ? "ltr" : undefined}
      className={cn(
        CONTROL_BASE,
        "h-12",
        invalid ? CONTROL_STATE.error : CONTROL_STATE.rest,
        FOCUS,
        ltr && "text-end",
        className,
      )}
      {...rest}
    />
  );
}

type TextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className"
> & {
  invalid?: boolean;
  className?: string;
};

export function Textarea({ invalid, className, ...rest }: TextareaProps) {
  return (
    <textarea
      className={cn(
        CONTROL_BASE,
        "min-h-28 py-3 leading-relaxed",
        invalid ? CONTROL_STATE.error : CONTROL_STATE.rest,
        FOCUS,
        className,
      )}
      {...rest}
    />
  );
}

/**
 * Checkbox.
 *
 * The control is drawn on a real `<input type="checkbox">` via
 * `appearance-none`, so keyboard behaviour, form association and screen-reader
 * semantics are all native.
 *
 * The whole row is the `<label>`, which makes the activatable target the full
 * width of the text rather than a 20px box — better on touch, and it clears
 * WCAG 2.2 target size without a hidden hit-area hack.
 */
export function Checkbox({
  id,
  invalid,
  className,
  children,
  ...rest
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "type"> & {
  id: string;
  invalid?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex min-h-11 cursor-pointer items-start gap-3 py-2",
        "text-body-sm text-text-secondary",
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        className={cn(
          "bg-paper-50 mt-0.5 size-5 shrink-0 appearance-none rounded-sm border",
          "grid place-content-center",
          "transition-colors duration-150",
          "checked:border-copper-500 checked:bg-copper-500",
          "focus-visible:outline focus-visible:outline-2",
          "focus-visible:outline-copper-500 focus-visible:outline-offset-2",
          "before:bg-paper-50 before:size-2.5 before:scale-0",
          "before:transition-transform before:duration-150",
          "before:[clip-path:polygon(14%_44%,0_65%,50%_100%,100%_16%,80%_0,43%_62%)]",
          "checked:before:scale-100",
          "motion-reduce:before:transition-none",
          invalid ? "border-error-600" : "border-paper-300",
        )}
        {...rest}
      />
      <span>{children}</span>
    </label>
  );
}
