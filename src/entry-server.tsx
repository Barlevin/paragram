import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import type { AppPage } from "./lib/navigation";
import { pageMeta, SITE_URL } from "./lib/seo";

export { pageMeta, SITE_URL };

/** Every route that gets its own static HTML file in dist/. */
export const prerenderRoutes = (Object.keys(pageMeta) as AppPage[]).map((page) => ({
  page,
  file: page === "home" ? "index.html" : page === "notFound" ? "404.html" : `${page}.html`,
}));

export function render(page: AppPage) {
  return renderToString(
    <StrictMode>
      <App page={page} />
    </StrictMode>,
  );
}
