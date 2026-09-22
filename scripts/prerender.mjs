import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const entry = pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href;
const { render, prerenderRoutes, pageMeta, SITE_URL } = await import(entry);

const template = await readFile(path.join(dist, "index.html"), "utf8");

function escapeAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function patch(html, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error(`Prerender could not find ${pattern} in dist/index.html`);
  }
  return html.replace(pattern, replacement);
}

function withHead(html, meta) {
  const url = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;
  const robots = meta.indexable ? "index, follow, max-image-preview:large" : "noindex, follow";

  let output = patch(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeAttribute(meta.title)}</title>`);
  for (const [attribute, key, value] of [
    ["name", "description", meta.description],
    ["name", "robots", robots],
    ["property", "og:title", meta.title],
    ["property", "og:description", meta.description],
    ["property", "og:url", url],
  ]) {
    output = patch(
      output,
      new RegExp(`(<meta\\s+${attribute}="${key}"\\s+content=")[\\s\\S]*?(")`),
      `$1${escapeAttribute(value)}$2`,
    );
  }
  return patch(output, /(<link\s+rel="canonical"\s+href=")[\s\S]*?(")/, `$1${url}$2`);
}

for (const route of prerenderRoutes) {
  const meta = pageMeta[route.page];
  const body = render(route.page);
  const html = patch(
    withHead(template, meta),
    /<div id="?root"?>\s*<\/div>/,
    `<div id="root">${body}</div>`,
  );
  await writeFile(path.join(dist, route.file), html, "utf8");
  console.info(`prerendered ${meta.path} -> dist/${route.file}`);
}
