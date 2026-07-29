import { cn } from "@/lib/cn";

/* ==========================================================================
   Icons

   A small hand-drawn set: 1.5px strokes on a 24px grid, matching the drafting
   language. Inline SVG components, never an icon font and never a full icon
   library — these are part of the design system and can't be bought off the
   shelf.

   DIRECTIONAL icons carry `rtl:-scale-x-100` so they point the correct way in
   RTL. Non-directional icons must not be flipped.
   ========================================================================== */

type IconProps = { className?: string };

const SVG_BASE = "size-6 shrink-0";
const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({
  className,
  children,
  flip = false,
}: IconProps & { children: React.ReactNode; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn(SVG_BASE, flip && "rtl:-scale-x-100", className)}
      {...STROKE}
    >
      {children}
    </svg>
  );
}

/* --- Directional ---------------------------------------------------------- */

/** Points toward "forward" in reading direction — flipped in RTL. */
export function ArrowIcon({ className }: IconProps) {
  return (
    <Svg className={className} flip>
      <path d="M4 12h16" />
      <path d="M14 6l6 6-6 6" />
    </Svg>
  );
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <Svg className={className} flip>
      <path d="M9 5l7 7-7 7" />
    </Svg>
  );
}

/* --- Non-directional ------------------------------------------------------ */

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn(SVG_BASE, className)}
      fill="currentColor"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.1c-.24.68-1.42 1.3-1.96 1.35-.54.05-1.04.24-3.52-.73s-4.06-3.5-4.19-3.66c-.12-.17-.79-1.06-.79-2.03s.51-1.44.69-1.64c.18-.2.39-.24.53-.24.14 0 .28 0 .4.01.13.01.3-.05.47.36.17.41.59 1.44.64 1.55.05.11.08.24.01.38-.07.15-.11.24-.21.37-.1.13-.22.29-.31.39-.1.11-.21.23-.09.44.12.21.54.89 1.16 1.44.79.7 1.46.92 1.67 1.03.2.1.32.08.44-.05.12-.14.51-.6.65-.8.14-.21.28-.17.47-.1.19.07 1.2.57 1.41.67.2.1.34.15.39.24.05.09.05.5-.19 1.18Z" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 12l5 2v3a2 2 0 0 1-2 2A14 14 0 0 1 3 5a2 2 0 0 1 2-2Z" />
    </Svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
      <path d="M3 6.5l9 6 9-6" />
    </Svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </Svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  );
}

export function ExternalIcon({ className }: IconProps) {
  return (
    <Svg className={className} flip>
      <path d="M14 4h6v6" />
      <path d="M20 4l-8.5 8.5" />
      <path d="M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
    </Svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 12.5l5 5L20 6.5" />
    </Svg>
  );
}

/* --- Service icons -------------------------------------------------------- */

function SiteIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="2.5" y="4" width="19" height="16" rx="1.5" />
      <path d="M2.5 9h19" />
      <path d="M18.5 6.5h.01M16 6.5h.01" />
    </Svg>
  );
}

function LandingIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="5" y="2.5" width="14" height="19" rx="1.5" />
      <path d="M8 7h8M8 11h8M8 15h4" />
    </Svg>
  );
}

function StoreIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3 8h18l-1.5 12H4.5L3 8Z" />
      <path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2" />
    </Svg>
  );
}

function AppIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="2.5" y="4" width="19" height="16" rx="1.5" />
      <path d="M8 9l-2.5 3L8 15" />
      <path d="M16 9l2.5 3L16 15" />
    </Svg>
  );
}

function RedesignIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M14.5 4.5l5 5L9 20H4v-5L14.5 4.5Z" />
      <path d="M12.5 6.5l5 5" />
    </Svg>
  );
}

function PerformanceIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3.5 19a9 9 0 1 1 17 0" />
      <path d="M12 12l4-3" />
    </Svg>
  );
}

function BookingIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="5" width="18" height="16" rx="1.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M8 14.5l1.5 1.5 3-3" />
    </Svg>
  );
}

function IntegrationIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M6 8.5v5a4 4 0 0 0 4 4h5.5" />
    </Svg>
  );
}

function CareIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 21s-7.5-4.5-7.5-10A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7.5 3c0 5.5-7.5 10-7.5 10Z" />
    </Svg>
  );
}

function DashboardIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="2.5" y="4" width="19" height="16" rx="1.5" />
      <path d="M7 16v-4M12 16V9M17 16v-2" />
    </Svg>
  );
}

/** Keyed to `SERVICE_ICONS` in the content schema. */
export const serviceIcons = {
  site: SiteIcon,
  landing: LandingIcon,
  store: StoreIcon,
  app: AppIcon,
  redesign: RedesignIcon,
  performance: PerformanceIcon,
  booking: BookingIcon,
  integration: IntegrationIcon,
  care: CareIcon,
  dashboard: DashboardIcon,
} as const;
