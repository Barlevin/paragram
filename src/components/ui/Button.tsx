import Link from "next/link";
import { cn } from "@/lib/cn";

/* ==========================================================================
   Button

   Renders as <a> when given `href`, otherwise <button> — links navigate,
   buttons act, and the semantics are never faked.

   Hover affordances are scoped to `@media (hover: hover)` via the `hover:`
   variant plus Tailwind's default behaviour, so touch devices never latch into
   a hover state. The loading variant keeps its width fixed so nothing shifts.
   ========================================================================== */

type Variant = "primary" | "secondary" | "tertiary" | "ghost-ink";
type Size = "md" | "lg";

const BASE = [
  "relative inline-flex items-center justify-center gap-2",
  "font-semibold whitespace-nowrap",
  "rounded-md",
  "transition-[background-color,border-color,color,box-shadow,transform]",
  "duration-200 ease-out",
  "active:scale-[0.98]",
  "disabled:pointer-events-none",
  "aria-disabled:pointer-events-none aria-disabled:opacity-50",
  // Every interactive element is at least 44px tall on touch.
  "min-h-11",
].join(" ");

const VARIANT: Record<Variant, string> = {
  // Copper fill; the hover tint wipes in from the right via the ::after layer.
  primary: cn(
    "bg-copper-500 text-paper-50 shadow-sm",
    "hover:bg-copper-400 hover:shadow-md",
    "active:bg-copper-600",
  ),
  secondary: cn(
    "border border-paper-300 bg-transparent text-text-primary",
    "hover:border-copper-500 hover:text-copper-600",
  ),
  tertiary: cn(
    "bg-transparent px-0 text-copper-600 underline decoration-1 underline-offset-4",
    "hover:decoration-2",
    "font-semibold",
  ),
  // For use on ink bands.
  "ghost-ink": cn(
    "border border-ink-700 bg-transparent text-text-inverse",
    "hover:border-copper-400 hover:text-copper-400",
  ),
};

const SIZE: Record<Size, string> = {
  md: "h-11 px-5 text-body-sm",
  lg: "h-12 px-6 text-body",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /** Leading icon. Directional icons must carry `rtl:-scale-x-100` themselves. */
  icon?: React.ReactNode;
};

type AsLink = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "children"
  >;

type AsButton = CommonProps & {
  href?: undefined;
  loading?: boolean;
  loadingLabel?: string;
} & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "lg", className, children, icon } = props;

  // A loading button is disabled so it can't be double-submitted, but it must
  // NOT be dimmed — the spinner already communicates the state, and fading it
  // to 50% reads as broken rather than busy.
  const isLoading = props.href === undefined && props.loading === true;

  const classes = cn(
    BASE,
    VARIANT[variant],
    // Tertiary has no fill, but it is still a standalone control, so it keeps
    // the 44px minimum height rather than collapsing to its text box.
    variant === "tertiary" ? "h-auto py-2.5 text-body-sm" : SIZE[size],
    !isLoading && "disabled:opacity-50",
    className,
  );

  if (props.href !== undefined) {
    const { href, external, variant: _v, size: _s, icon: _i, ...rest } = props;

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...rest}
        >
          {icon}
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {icon}
        {children}
      </Link>
    );
  }

  const {
    loading = false,
    loadingLabel,
    variant: _v,
    size: _s,
    icon: _i,
    disabled,
    ...rest
  } = props;

  return (
    <button
      className={classes}
      disabled={disabled ?? loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {/* The label stays in the DOM at zero opacity so the button keeps its
          intrinsic width while loading — swapping the text would shift layout. */}
      <span
        className={cn("inline-flex items-center gap-2", loading && "invisible")}
      >
        {icon}
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 inline-flex items-center justify-center gap-2">
          <Spinner />
          {loadingLabel ? <span>{loadingLabel}</span> : null}
        </span>
      )}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      className="size-4 animate-spin motion-reduce:animate-none"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2.5"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
