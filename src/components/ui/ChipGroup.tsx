import { cn } from "@/lib/cn";

/* ==========================================================================
   ChipGroup

   Built on real radio / checkbox inputs inside a <fieldset> with a <legend>.
   The chip appearance is drawn on the label via `peer-*`, so grouping,
   keyboard arrow-key navigation (radios), form association and screen-reader
   announcement are all native rather than reimplemented with ARIA.
   ========================================================================== */

export type ChipOption = { value: string; label: string };

const CHIP = [
  "inline-flex min-h-11 cursor-pointer items-center rounded-sm border",
  "border-paper-300 bg-paper-50 px-4 text-body-sm",
  "transition-[background-color,border-color,color] duration-200 ease-out",
  "hover:border-copper-400",
  // Selected state.
  "peer-checked:border-copper-500 peer-checked:bg-copper-500",
  "peer-checked:text-paper-50 peer-checked:font-semibold",
  // Focus ring is drawn on the label because the input itself is invisible.
  "peer-focus-visible:outline peer-focus-visible:outline-2",
  "peer-focus-visible:outline-offset-2 peer-focus-visible:outline-copper-500",
].join(" ");

export function ChipGroup({
  name,
  legend,
  hint,
  error,
  options,
  multiple = false,
  value,
  onChange,
  className,
}: {
  name: string;
  legend: string;
  hint?: string;
  error?: string;
  options: readonly ChipOption[];
  multiple?: boolean;
  /** Single value, or the list of selected values when `multiple`. */
  value: string | readonly string[];
  onChange: (next: string | string[]) => void;
  className?: string;
}) {
  const selected = new Set(Array.isArray(value) ? value : value ? [value] : []);
  const hintId = hint ? `${name}-hint` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  function toggle(optionValue: string) {
    if (!multiple) {
      onChange(optionValue);
      return;
    }
    const next = new Set(selected);
    if (next.has(optionValue)) next.delete(optionValue);
    else next.add(optionValue);
    onChange([...next]);
  }

  return (
    <fieldset
      className={cn("grid gap-3", className)}
      aria-describedby={describedBy}
    >
      <legend className="text-body-sm font-semibold">{legend}</legend>

      {hint ? (
        <p id={hintId} className="text-body-sm text-text-tertiary">
          {hint}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          return (
            <div key={option.value} className="relative">
              <input
                id={id}
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={option.value}
                checked={selected.has(option.value)}
                onChange={() => toggle(option.value)}
                className="peer absolute size-0 opacity-0"
              />
              <label htmlFor={id} className={CHIP}>
                {option.label}
              </label>
            </div>
          );
        })}
      </div>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-body-sm text-error-600 font-semibold"
        >
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
