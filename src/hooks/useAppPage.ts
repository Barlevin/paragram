import { useEffect, useState } from "react";
import { pageFromPath, type AppPage } from "../lib/navigation";
import { applyPageMeta } from "../lib/seo";

export function useAppPage(initialPage?: AppPage) {
  const [page, setPage] = useState<AppPage>(
    () => initialPage ?? (typeof window === "undefined" ? "home" : pageFromPath()),
  );

  useEffect(() => {
    const sync = () => setPage(pageFromPath());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  useEffect(() => {
    applyPageMeta(page);
    if (page !== "home") window.scrollTo(0, 0);
  }, [page]);

  return page;
}
