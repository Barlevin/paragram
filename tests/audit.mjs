/**
 * RTL / layout audit. Usage: node tests/audit.mjs <path> [width ...]
 *
 * Programmatic rather than visual, because the failures that matter here —
 * horizontal overflow, an LTR run landing in the wrong visual position, a tap
 * target under 44px — are all measurable and all easy to miss by eye.
 */
import { chromium } from "@playwright/test";

const [, , routePath = "/", ...widthArgs] = process.argv;
const widths = widthArgs.length
  ? widthArgs.map(Number)
  : [320, 375, 768, 1280, 1536];

const browser = await chromium.launch();
let failures = 0;

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(`http://localhost:3000${routePath}`, {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);

  const report = await page.evaluate(() => {
    const out = {
      dir: document.documentElement.dir,
      lang: document.documentElement.lang,
      docOverflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
      overflowing: [],
      smallTargets: [],
      physicalProps: [],
      loadedFonts: [],
    };

    // The Next.js dev overlay is injected into the page and is not ours.
    const isDevOverlay = (el) =>
      el.closest(
        "nextjs-portal, [data-nextjs-toast], #__next-build-watcher",
      ) !== null;

    const describe = (el) => {
      const id = el.id ? `#${el.id}` : "";
      const cls =
        typeof el.className === "string" && el.className
          ? `.${el.className.trim().split(/\s+/).slice(0, 3).join(".")}`
          : "";
      return `${el.tagName.toLowerCase()}${id}${cls}`;
    };

    // Elements wider than the viewport are the usual cause of a horizontal
    // scrollbar on a Hebrew page (long unbroken tokens, or a fixed width).
    for (const el of document.querySelectorAll("body *")) {
      if (isDevOverlay(el)) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      if (rect.right > window.innerWidth + 1 || rect.left < -1) {
        const style = getComputedStyle(el);
        if (style.position === "fixed" || style.overflow === "hidden") continue;
        out.overflowing.push({
          el: describe(el),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        });
      }
    }

    // Tap targets. 44x44 is the floor on touch.
    const interactive = document.querySelectorAll(
      'a[href], button, input:not([type="hidden"]), select, textarea, summary, [role="button"]',
    );
    for (const el of interactive) {
      if (isDevOverlay(el)) continue;
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      // Visually-hidden inputs are driven by an associated label.
      if (style.opacity === "0" || style.position === "absolute") continue;

      // For a control, the activatable region is the control PLUS any label
      // bound to it, since clicking the label activates the control. Measuring
      // the bare input would report a 20px checkbox that is really a full-width
      // row.
      let rect = el.getBoundingClientRect();
      if (/^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) {
        const label =
          el.closest("label") ??
          (el.id ? document.querySelector(`label[for="${el.id}"]`) : null);
        if (label) {
          const lr = label.getBoundingClientRect();
          rect = {
            width:
              Math.max(rect.right, lr.right) - Math.min(rect.left, lr.left),
            height:
              Math.max(rect.bottom, lr.bottom) - Math.min(rect.top, lr.top),
          };
        }
      }

      if (rect.width === 0 && rect.height === 0) continue;
      if (rect.height < 44 || rect.width < 24) {
        out.smallTargets.push({
          el: describe(el),
          w: Math.round(rect.width),
          h: Math.round(rect.height),
          text: (el.textContent || "").trim().slice(0, 24),
        });
      }
    }

    // Any physical inline-direction property that survived the linter, e.g.
    // via an inline style or a third-party stylesheet.
    for (const el of document.querySelectorAll("body *")) {
      if (isDevOverlay(el)) continue;
      const s = getComputedStyle(el);
      if (s.textAlign === "left" || s.textAlign === "right") {
        out.physicalProps.push({ el: describe(el), textAlign: s.textAlign });
      }
    }

    for (const entry of performance.getEntriesByType("resource")) {
      if (entry.name.includes(".woff2")) {
        out.loadedFonts.push(entry.name.split("/").pop());
      }
    }

    return out;
  });

  const problems = [];
  if (report.dir !== "rtl")
    problems.push(`dir is "${report.dir}", expected rtl`);
  if (report.lang !== "he")
    problems.push(`lang is "${report.lang}", expected he`);
  if (report.docOverflow > 1)
    problems.push(`horizontal overflow of ${report.docOverflow}px`);
  for (const o of report.overflowing.slice(0, 6))
    problems.push(`overflows viewport: ${o.el} (${o.left}→${o.right})`);
  for (const t of report.smallTargets.slice(0, 8))
    problems.push(`tap target ${t.w}x${t.h}: ${t.el} "${t.text}"`);
  for (const p of report.physicalProps.slice(0, 6))
    problems.push(`physical text-align:${p.textAlign} on ${p.el}`);

  const status = problems.length ? "FAIL" : "ok";
  console.log(`\n── ${routePath} @ ${width}px — ${status}`);
  console.log(`   fonts loaded: ${report.loadedFonts.join(", ") || "(none)"}`);
  for (const p of problems) console.log(`   ✗ ${p}`);
  failures += problems.length;

  await page.close();
}

await browser.close();
console.log(
  failures ? `\n${failures} problem(s) found.` : "\nAll checks passed.",
);
process.exit(failures ? 1 : 0);
