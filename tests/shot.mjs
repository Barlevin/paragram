// Dev-time visual check helper. Usage: node tests/shot.mjs <path> <name> [width]
import { chromium } from "@playwright/test";

const [, , routePath = "/", name = "shot", widthArg = "1440"] = process.argv;
const width = Number(widthArg);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height: 900 },
  deviceScaleFactor: 2,
});

await page.goto(`http://localhost:3000${routePath}`, {
  waitUntil: "networkidle",
});
// Let fonts settle so the screenshot shows the real typography.
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);

await page.screenshot({
  path: `tests/screenshots/${name}.png`,
  fullPage: true,
});

await browser.close();
console.log(`wrote tests/screenshots/${name}.png @ ${width}px`);
