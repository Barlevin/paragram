import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const revealItems = element.querySelectorAll<HTMLElement>("[data-reveal-item]");
    const targets = revealItems.length ? Array.from(revealItems) : [element];
    const show = (target: HTMLElement) => {
      target.dataset.visible = "true";
    };

    if (!("IntersectionObserver" in window)) {
      targets.forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    targets.forEach((item) => {
      const siblings = item.parentElement ? Array.from(item.parentElement.children) : [];
      const index = Math.max(0, siblings.indexOf(item));
      item.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 100}ms`);
      observer.observe(item);
    });

    let frame = 0;
    const revealVisibleItems = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        targets.forEach((item) => {
          if (item.dataset.visible === "true") return;
          const bounds = item.getBoundingClientRect();
          if (bounds.top < window.innerHeight && bounds.bottom > 0) {
            show(item);
            observer.unobserve(item);
          }
        });
      });
    };

    revealVisibleItems();
    window.addEventListener("resize", revealVisibleItems);
    window.addEventListener("orientationchange", revealVisibleItems);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", revealVisibleItems);
      window.removeEventListener("orientationchange", revealVisibleItems);
      targets.forEach((item) => {
        item.style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  return ref;
}
