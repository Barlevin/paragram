export type AppPage = "home" | "privacy" | "accessibility" | "notFound";

const routes: Record<string, AppPage> = {
  "/": "home",
  "/privacy": "privacy",
  "/accessibility": "accessibility",
};

export function pageFromPath(pathname = window.location.pathname): AppPage {
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return routes[normalized] ?? "notFound";
}

export function navigate(path: string) {
  if (`${window.location.pathname}${window.location.hash}` === path) return;
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function goHome(hash = "") {
  navigate(hash ? `/${hash}` : "/");
  if (hash) {
    window.requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    });
    return;
  }
  window.scrollTo(0, 0);
}
