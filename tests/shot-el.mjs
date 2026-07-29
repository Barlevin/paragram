// Dev-time visual check helper for one element.
// Usage: node tests/shot-el.mjs <path> <selector> <name> [width]
import { chromium } from "@playwright/test";

const [, , routePath, selector, name, widthArg = "1440"] = process.argv;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: Number(widthArg), height: 900 },
  deviceScaleFactor: 2,
});

page.on("console", (m) => {
  if (m.type() === "error") console.log("[console error]", m.text());
});
page.on("pageerror", (e) => console.log("[page error]", e.message));

await page.goto(`http://localhost:3000${routePath}`, {
  waitUntil: "networkidle",
});
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);

await page
  .locator(selector)
  .first()
  .screenshot({
    path: `tests/screenshots/${name}.png`,
  });

await browser.close();
console.log(`wrote tests/screenshots/${name}.png`);
