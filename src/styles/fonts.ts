import localFont from "next/font/local";

/**
 * Hebrew and Latin are loaded as separate faces with explicit `unicode-range`
 * so each script resolves to the typeface it was designed for, with no
 * per-word markup anywhere in the app. The browser also never downloads a
 * Hebrew file to render a Latin string, or the reverse.
 *
 * `adjustFontFallback` reads the real metrics out of each WOFF2 and emits a
 * metric-matched fallback face (size-adjust / ascent-override /
 * descent-override), so the swap from fallback to webfont causes no layout
 * shift. That is the whole reason these are `next/font/local` calls rather
 * than hand-written @font-face blocks.
 *
 * The unicode ranges are written out in full on every call because the font
 * loader is statically analysed at build time and rejects variable references.
 */

/** Display, Hebrew. Frank Rühl — the canonical Hebrew book face. */
const displayHebrew = localFont({
  src: "../assets/fonts/frank-ruhl-libre-hebrew.woff2",
  weight: "300 900",
  style: "normal",
  display: "swap",
  variable: "--font-display-he",
  preload: true,
  adjustFontFallback: "Times New Roman",
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0307-0308, U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F",
    },
  ],
});

/** Body, Hebrew. Assistant — warmer and better spaced at small sizes than Heebo. */
const bodyHebrew = localFont({
  src: "../assets/fonts/assistant-hebrew.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--font-body-he",
  preload: true,
  adjustFontFallback: "Arial",
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0307-0308, U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F",
    },
  ],
});

/** Body, Latin. Same family, so mixed-script body copy stays visually coherent. */
const bodyLatin = localFont({
  src: "../assets/fonts/assistant-latin.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--font-body-latin",
  preload: false,
  adjustFontFallback: "Arial",
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
});

/**
 * Technical / annotation face, Latin only. Carries drafting annotations, index
 * numerals, technology lists and the שרטוט / בנוי labels. Because it holds no
 * Hebrew glyphs, Hebrew inside a mono label falls through to Assistant — which
 * is why the mono stack in tokens.css lists the Hebrew body face after it.
 */
const monoLatin = localFont({
  src: "../assets/fonts/jetbrains-mono-latin.woff2",
  weight: "100 800",
  style: "normal",
  display: "swap",
  variable: "--font-mono-latin",
  preload: false,
  adjustFontFallback: false,
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
});

/** Applied once, on <html>. */
export const fontVariables = [
  displayHebrew.variable,
  bodyHebrew.variable,
  bodyLatin.variable,
  monoLatin.variable,
].join(" ");
