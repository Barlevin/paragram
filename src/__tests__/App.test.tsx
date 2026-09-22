import { cleanup, createEvent, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { projects } from "../data/site-content";
import { SITE_URL } from "../lib/seo";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  window.history.pushState({}, "", "/");
  // The accessibility panel writes to <html> and localStorage, so reset both or
  // preferences leak into the next test.
  window.localStorage.clear();
  document.documentElement.removeAttribute("style");
  for (const name of ["contrast", "links", "still"]) {
    document.documentElement.removeAttribute(`data-a11y-${name}`);
  }
});

describe("agency site", () => {
  it("renders the main content and all project links", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /אתרים שאי אפשר/ })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /פתיחה באתר חיצוני/ })).toHaveLength(projects.length);
    expect(screen.getByRole("heading", { name: "אתר מושלם לעסק" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "מדיניות פרטיות" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "הצהרת נגישות" }).length).toBeGreaterThan(0);
  });

  it("opens the accessible mobile menu", async () => {
    render(<App />);
    const button = screen.getByRole("button", { name: "פתיחת תפריט" });
    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "סגירת תפריט" })).toBeInTheDocument();
  });

  it("validates and submits the lead form", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: "ok" }),
    }));
    render(<App />);
    const submit = screen.getByRole("button", { name: /שליחת פרטים/ });

    await userEvent.click(submit);
    expect(screen.getByText("נא למלא שם, טלפון ואימייל תקינים.")).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText("שם מלא"), "נועה כהן");
    await userEvent.type(screen.getByPlaceholderText("050-000-0000"), "0501234567");
    await userEvent.type(screen.getByPlaceholderText("you@business.co.il"), "noa@example.com");
    await userEvent.click(screen.getByRole("checkbox"));
    await userEvent.click(submit);

    expect(await screen.findByText("קיבלנו! נחזור אליכם ממש בקרוב.")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("opens the privacy and accessibility pages", async () => {
    render(<App />);
    await userEvent.click(screen.getAllByRole("link", { name: "הצהרת נגישות" })[0]);
    expect(screen.getByRole("heading", { name: "הצהרת נגישות" })).toBeInTheDocument();
    await userEvent.click(screen.getAllByRole("link", { name: "מדיניות פרטיות" })[0]);
    expect(screen.getByRole("heading", { name: "מדיניות פרטיות" })).toBeInTheDocument();
  });

  it("shows the PlayCS project with a working link and image", () => {
    render(<App />);
    const card = screen.getByRole("link", { name: /^PlayCS/ });
    expect(card).toHaveAttribute("href", "https://playcs.gg");
    expect(within(card).getByRole("img")).toHaveAttribute("src", "/images/playcs.webp");
  });

  it("keeps every project entry complete and linkable", () => {
    for (const project of projects) {
      expect(project.title.trim()).not.toBe("");
      expect(project.category.trim()).not.toBe("");
      expect(project.url).toMatch(/^https:\/\//);
      expect(project.image).toMatch(/^(\/|https:\/\/)/);
      // A real portfolio link, not a placeholder.
      expect(project.url).not.toMatch(/example\.com/);
    }
  });

  // Prerendered HTML starts fetching before hydration, so eager images can finish
  // before onLoad is attached. Without the ref fallback they stay at opacity 0.
  it("reveals images that already finished loading before hydration", () => {
    vi.spyOn(HTMLImageElement.prototype, "complete", "get").mockReturnValue(true);
    vi.spyOn(HTMLImageElement.prototype, "naturalWidth", "get").mockReturnValue(1200);

    render(<App />);

    for (const project of projects) {
      const card = screen.getByRole("link", { name: new RegExp(`^${project.title}`) });
      expect(within(card).getByRole("img")).toHaveAttribute("data-loaded", "true");
    }
  });

  it("opens a project card on a plain click but not after a drag", () => {
    render(<App />);
    const card = screen.getByRole("link", { name: /^PlayCS/ });

    fireEvent.pointerDown(card, { clientX: 200, button: 0, pointerId: 1 });
    fireEvent.pointerUp(card, { clientX: 200, pointerId: 1 });
    const plainClick = createEvent.click(card);
    fireEvent(card, plainClick);
    expect(plainClick.defaultPrevented).toBe(false);

    fireEvent.pointerDown(card, { clientX: 200, button: 0, pointerId: 2 });
    fireEvent.pointerMove(card, { clientX: 90, pointerId: 2 });
    fireEvent.pointerUp(card, { clientX: 90, pointerId: 2 });
    const dragClick = createEvent.click(card);
    fireEvent(card, dragClick);
    expect(dragClick.defaultPrevented).toBe(true);
  });

  it("links the WhatsApp button to a chat with the studio number", () => {
    render(<App />);
    const link = screen.getByRole("link", { name: /וואטסאפ/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("href")).toMatch(/^https:\/\/wa\.me\/972503600010\?text=/);
  });

  it("keeps unknown routes out of the index", () => {
    window.history.pushState({}, "", "/no-such-page");
    render(<App />);
    expect(screen.getByRole("heading", { name: "הדף הזה לא נמצא" })).toBeInTheDocument();
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
  });

  it("updates title and canonical url per route", async () => {
    render(<App />);
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", `${SITE_URL}/`);

    await userEvent.click(screen.getAllByRole("link", { name: "הצהרת נגישות" })[0]);
    expect(document.title).toBe("הצהרת נגישות | Paragram");
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", `${SITE_URL}/accessibility`);
  });
});

describe("accessibility panel", () => {
  const root = () => document.documentElement;
  const openPanel = async () => {
    await userEvent.click(screen.getByRole("button", { name: "תפריט נגישות" }));
  };

  it("stays hidden from assistive tech until the toggle is pressed", async () => {
    render(<App />);
    const toggle = screen.getByRole("button", { name: "תפריט נגישות" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("button", { name: "ניגודיות גבוהה" })).not.toBeInTheDocument();

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "ניגודיות גבוהה" })).toBeInTheDocument();
  });

  it("applies each toggle to the document and remembers it", async () => {
    render(<App />);
    await openPanel();

    for (const [label, attribute] of [
      ["ניגודיות גבוהה", "data-a11y-contrast"],
      ["הדגשת קישורים", "data-a11y-links"],
      ["עצירת אנימציות", "data-a11y-still"],
    ]) {
      const option = screen.getByRole("button", { name: label });
      await userEvent.click(option);
      expect(option).toHaveAttribute("aria-pressed", "true");
      expect(root()).toHaveAttribute(attribute, "on");
    }

    const stored = JSON.parse(window.localStorage.getItem("paragram:a11y") ?? "{}");
    expect(stored).toMatchObject({ contrast: true, underlineLinks: true, stopMotion: true });

    const contrast = screen.getByRole("button", { name: "ניגודיות גבוהה" });
    await userEvent.click(contrast);
    expect(contrast).toHaveAttribute("aria-pressed", "false");
    expect(root()).not.toHaveAttribute("data-a11y-contrast");
  });

  it("scales text within bounds and resets everything", async () => {
    render(<App />);
    await openPanel();
    const grow = screen.getByRole("button", { name: "הגדלת הטקסט" });
    const shrink = screen.getByRole("button", { name: "הקטנת הטקסט" });

    expect(shrink).toBeDisabled();
    await userEvent.click(grow);
    expect(root().style.getPropertyValue("--a11y-font-scale")).toBe("1.1");

    await userEvent.click(grow);
    await userEvent.click(grow);
    expect(root().style.getPropertyValue("--a11y-font-scale")).toBe("1.35");
    expect(grow).toBeDisabled();

    await userEvent.click(screen.getByRole("button", { name: "ניגודיות גבוהה" }));
    await userEvent.click(screen.getByRole("button", { name: /איפוס הגדרות/ }));
    expect(root().style.getPropertyValue("--a11y-font-scale")).toBe("1");
    expect(root()).not.toHaveAttribute("data-a11y-contrast");
  });

  it("restores saved preferences on load", () => {
    window.localStorage.setItem(
      "paragram:a11y",
      JSON.stringify({ fontStep: 2, contrast: true, underlineLinks: false, stopMotion: false }),
    );
    render(<App />);
    expect(root().style.getPropertyValue("--a11y-font-scale")).toBe("1.2");
    expect(root()).toHaveAttribute("data-a11y-contrast", "on");
  });

  it("closes on Escape and returns focus to the toggle", async () => {
    render(<App />);
    const toggle = screen.getByRole("button", { name: "תפריט נגישות" });
    await userEvent.click(toggle);

    await userEvent.keyboard("{Escape}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });
});
