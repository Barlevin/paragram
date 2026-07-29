# אתר סטודיו — Hebrew Boutique Web Studio

A Hebrew-first, RTL-native marketing site for a boutique web development studio.
Built on the «שרטוט» / *Blueprint* concept: every surface exists in a **draft**
and a **built** state, and the site finishes building itself as you scroll.

> All user-facing copy is Hebrew. Code, comments and identifiers are English.
> Strings marked `[להשלמה]` are placeholders awaiting real content.

---

## Quick start

```bash
pnpm install
cp .env.example .env.local   # fill in as needed; the site runs without secrets
pnpm dev                     # http://localhost:3000
```

The design-system specimen page lives at **`/system`** (development only). It
renders every primitive in every state plus the full Hebrew text matrix, and is
the fastest way to check a token change.

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint, including the physical-direction-utility ban |
| `pnpm typecheck` | `tsc --noEmit`, strict |
| `pnpm test` | Vitest unit tests |
| `pnpm test:e2e` | Playwright end-to-end tests |
| `pnpm analyze` | Bundle analyzer |
| `pnpm verify` | typecheck + lint + unit tests |

---

## Architecture

### RTL is native, not a translation

The root is `<html lang="he" dir="rtl">` and the codebase uses **only** CSS
logical properties (`ms-*`, `pe-*`, `inset-s-*`, `border-s-*`, `text-start`).

An ESLint rule (`no-restricted-syntax` in `eslint.config.mjs`) fails the build on
any physical direction utility — `ml-`, `pr-`, `text-left`, `left-`, `border-l`,
`rounded-tl`, `float-left` and friends — including inside template literals.
That rule is what mechanically guarantees the site can never be built LTR-first
and flipped afterwards.

Anything that is an LTR run inside Hebrew text (phone numbers, emails, URLs,
bare numerals) must be wrapped in `<Ltr>`. Skipping it is the single most common
Hebrew web bug: the run silently renders in the wrong visual position.

### Typography

Three faces, split by script with explicit `unicode-range`, so each script
resolves to the typeface designed for it with no per-word markup:

- **Display** — Frank Ruhl Libre (Hebrew). The canonical Hebrew book face.
  Latin inside a heading falls through to JetBrains Mono by design.
- **Body** — Assistant (Hebrew + Latin).
- **Mono** — JetBrains Mono (Latin only). Hebrew inside a mono label falls
  through to Assistant, which is why the mono stack lists it as a fallback.

Loaded via `next/font/local` specifically for `adjustFontFallback`, which reads
each WOFF2's real metrics and emits a metric-matched fallback face so the swap
causes **zero layout shift**. Total: ~86 KB across four files.

Hebrew is never tracked negatively, never set in all-caps, and never italicised
— emphasis is weight or the copper accent.

### Scroll animation is CSS, not JavaScript

Scroll reveals use native `animation-timeline: view()` (see
`src/styles/motion.css`). They run on the compositor and cost **zero
JavaScript** — there is no `IntersectionObserver` anywhere in this codebase.

Motion is **opt-in**: every animation lives inside
`@media (prefers-reduced-motion: no-preference)`, so the safe state is the
default and a missed override cannot cause harm. The `reduce` block resets both
`animation` **and** `animation-timeline` — clearing only the former leaves an
orphaned timeline that can still flash.

Browsers without scroll-driven animation support (Firefox, as of mid-2026)
render the final state. Content is always in the DOM and always readable.

GSAP is used for exactly one thing — the pinned portfolio morph sequence — and
is dynamically imported, desktop-only, and never loaded under reduced motion.

**No smooth-scroll library.** Lenis and ScrollSmoother hijack the scroll thread,
break find-in-page scroll-into-view, degrade mobile scrolling and add INP risk.
`scroll-behavior: smooth` handles anchors natively for free.

### Content layer

All content lives in `src/content/` as typed TypeScript, parsed through Zod at
import time (`src/content/schema.ts`). A malformed or missing field fails the
build rather than shipping.

Two schemas make dishonest content **structurally impossible** rather than
merely discouraged:

- `Project.results[].verified` is `z.literal(true)` — an unverified metric
  cannot be expressed.
- `Testimonial.consentOnFile` is `z.literal(true)` — a testimonial without
  recorded written permission to publish someone's name, photo and business
  cannot be expressed.

`FaqItem.answerStatus` gates structured data: only `final` answers are ever
emitted as `FAQPage` JSON-LD, so placeholder text can never reach Google.

Each model mirrors a flat document shape with a stable id, an `order` and a
`published` flag, so migrating to a headless CMS means replacing the module
export while the Zod schema stays as the runtime contract.

### Server / client boundaries

Almost everything is a server component. `"use client"` sits on the smallest
possible leaf, and server-rendered content is passed through `children` rather
than imported inside a client component — `DraftSeam` is the model: the
interaction is client, the content is server.

---

## Environment variables

See `.env.example`. Everything without `NEXT_PUBLIC_` is server-only and
validated at startup by `src/lib/env.server.ts`.

The site builds and runs with no secrets configured; the contact endpoint
degrades with a clear Hebrew error instead of crashing.

---

## Conventions

- Logical properties only. The linter enforces it.
- Wrap LTR runs in `<Ltr>`.
- No new dependency without a stated reason.
- No invented statistics, testimonials or customer results. The only number on
  the site is `8` (years of experience), typed as `z.literal(8)`.
- Hebrew copy: address the reader as `אתם`, speak as `אני`. Short sentences.
  No exclamation marks outside the form success state.
