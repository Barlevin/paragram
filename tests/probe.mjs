// Interactive probe for the mobile menu contract.
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("http://localhost:3000/privacy", { waitUntil: "networkidle" });

const results = [];
const check = (name, pass, detail = "") =>
  results.push(
    `${pass ? "ok  " : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`,
  );

const toggle = page.locator('button[aria-controls="mobile-menu"]');
const panel = page.locator("#mobile-menu");

check("panel hidden initially", !(await panel.isVisible()));
check(
  "toggle reports collapsed",
  (await toggle.getAttribute("aria-expanded")) === "false",
);

await toggle.click();
await page.waitForTimeout(150);

check("panel visible after click", await panel.isVisible());
check(
  "toggle reports expanded",
  (await toggle.getAttribute("aria-expanded")) === "true",
);

const bodyOverflow = await page.evaluate(
  () => getComputedStyle(document.body).overflow,
);
check("scroll locked", bodyOverflow === "hidden", `overflow=${bodyOverflow}`);

const focusInPanel = await page.evaluate(() =>
  document.querySelector("#mobile-menu")?.contains(document.activeElement),
);
check("focus moved into panel", focusInPanel === true);

// Tab all the way round and confirm focus never escapes the panel.
let escaped = false;
for (let i = 0; i < 24; i += 1) {
  await page.keyboard.press("Tab");
  const inside = await page.evaluate(
    () =>
      document
        .querySelector("#mobile-menu")
        ?.contains(document.activeElement) ?? false,
  );
  if (!inside) {
    escaped = true;
    break;
  }
}
check("focus trapped across 24 tabs", !escaped);

await page.keyboard.press("Escape");
await page.waitForTimeout(150);
check("Escape closes panel", !(await panel.isVisible()));

const restored = await page.evaluate(
  () => getComputedStyle(document.body).overflow,
);
check("scroll restored", restored !== "hidden", `overflow=${restored}`);

const focusReturned = await page.evaluate(
  () =>
    document.activeElement ===
    document.querySelector('button[aria-controls="mobile-menu"]'),
);
check("focus returned to toggle", focusReturned === true);

// Sticky action bar should stay out of the tab order while off-screen.
const stickyTabbable = await page.evaluate(() => {
  const bar = document.querySelector('[data-analytics-whatsapp="sticky_bar"]');
  return bar ? bar.getAttribute("tabindex") : "missing";
});
check(
  "sticky bar not tabbable when hidden",
  stickyTabbable === "-1",
  `tabindex=${stickyTabbable}`,
);

await browser.close();
console.log(results.join("\n"));
process.exit(results.some((r) => r.startsWith("FAIL")) ? 1 : 0);
