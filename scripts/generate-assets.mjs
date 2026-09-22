import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

/**
 * Turns the full-resolution artwork in assets-src/ into the derivatives that
 * actually ship in public/. Re-run with `npm run assets` after replacing a source.
 */
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = (file) => path.join(root, "assets-src", file);
const out = (file) => path.join(root, "public", file);

const mark = src("favicon.png");
const wordmark = src("paragram-logo.png");

await mkdir(out("images"), { recursive: true });

/** Trims transparent padding, then re-pads to a square so small sizes stay legible. */
async function squareIcon(size, { background }) {
  const trimmed = await sharp(mark).trim({ threshold: 10 }).toBuffer();
  const inner = Math.round(size * 0.84);
  return sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: await sharp(trimmed).resize({ height: inner, fit: "inside" }).toBuffer(), gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const transparent = { r: 0, g: 0, b: 0, alpha: 0 };
const white = { r: 255, g: 255, b: 255, alpha: 1 };

const icons = [
  ["favicon-16.png", 16, transparent],
  ["favicon-32.png", 32, transparent],
  ["icon-192.png", 192, transparent],
  ["icon-512.png", 512, transparent],
  // iOS ignores transparency and composites on black, so this one needs a solid backdrop.
  ["apple-touch-icon.png", 180, white],
];

for (const [file, size, background] of icons) {
  await sharp(await squareIcon(size, { background })).toFile(out(file));
  console.info(`icon   ${file} (${size}x${size})`);
}

// Browsers and crawlers still request /favicon.ico by name. The ICO container
// can wrap a PNG payload directly, so no separate encoder is needed.
const icoPng = await squareIcon(32, { background: transparent });
const directory = Buffer.alloc(22);
directory.writeUInt16LE(0, 0); // reserved
directory.writeUInt16LE(1, 2); // type: icon
directory.writeUInt16LE(1, 4); // image count
directory.writeUInt8(32, 6); // width
directory.writeUInt8(32, 7); // height
directory.writeUInt8(0, 8); // palette size
directory.writeUInt8(0, 9); // reserved
directory.writeUInt16LE(1, 10); // colour planes
directory.writeUInt16LE(32, 12); // bits per pixel
directory.writeUInt32LE(icoPng.length, 14);
directory.writeUInt32LE(22, 18); // payload offset
await writeFile(out("favicon.ico"), Buffer.concat([directory, icoPng]));
console.info("icon   favicon.ico (32x32)");

// Header and footer wordmark, plus a white variant for the transparent header
// that sits over the dark hero image.
const trimmedWordmark = await sharp(wordmark).trim({ threshold: 10 }).toBuffer();
const logoHeight = 140;

await sharp(trimmedWordmark)
  .resize({ height: logoHeight })
  .webp({ quality: 92, alphaQuality: 100 })
  .toFile(out("images/logo.webp"));
console.info("logo   images/logo.webp");

const resized = await sharp(trimmedWordmark).resize({ height: logoHeight }).ensureAlpha().toBuffer();
const { width: lw, height: lh } = await sharp(resized).metadata();
const alpha = await sharp(resized).extractChannel("alpha").toBuffer();
await sharp({ create: { width: lw, height: lh, channels: 3, background: white } })
  .joinChannel(alpha)
  .webp({ quality: 92, alphaQuality: 100 })
  .toFile(out("images/logo-light.webp"));
console.info("logo   images/logo-light.webp (white)");

// Branded Open Graph card, replacing the stock photo used for link previews.
await sharp({ create: { width: 1200, height: 630, channels: 4, background: white } })
  .composite([{ input: await sharp(trimmedWordmark).resize({ width: 760, fit: "inside" }).toBuffer(), gravity: "centre" }])
  .png({ compressionLevel: 9 })
  .toFile(out("images/og-paragram.png"));
console.info("og     images/og-paragram.png (1200x630)");

// Project screenshots: the card only ever renders a 1.42:1 crop, so a 1400px
// WebP is plenty and saves roughly 95% over the source PNGs.
for (const name of ["dmz", "yagelshukrun"]) {
  await sharp(src(`${name}.png`))
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out(`images/${name}.webp`));
  console.info(`image  images/${name}.webp`);
}
