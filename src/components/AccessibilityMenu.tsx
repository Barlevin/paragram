import { Accessibility, ALargeSmall, Contrast, Link2, Minus, Pause, Plus, RotateCcw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AppLink } from "./AppLink";

export const A11Y_STORAGE_KEY = "paragram:a11y";
const fontSteps = [1, 1.1, 1.2, 1.35];

type Settings = {
  fontStep: number;
  contrast: boolean;
  underlineLinks: boolean;
  stopMotion: boolean;
};

type ToggleKey = keyof Omit<Settings, "fontStep">;

const defaults: Settings = { fontStep: 0, contrast: false, underlineLinks: false, stopMotion: false };

function readStored(): Settings {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = window.localStorage.getItem(A11Y_STORAGE_KEY);
    return raw ? { ...defaults, ...(JSON.parse(raw) as Partial<Settings>) } : defaults;
  } catch {
    // Private browsing can throw on access; defaults are a fine fallback.
    return defaults;
  }
}

/** Mirrors the inline bootstrap in index.html, which applies this before paint. */
function applyToDocument(settings: Settings) {
  const root = document.documentElement;
  root.style.setProperty("--a11y-font-scale", String(fontSteps[settings.fontStep] ?? 1));
  const flags: [string, boolean][] = [
    ["a11yContrast", settings.contrast],
    ["a11yLinks", settings.underlineLinks],
    ["a11yStill", settings.stopMotion],
  ];
  for (const [key, on] of flags) {
    if (on) root.dataset[key] = "on";
    else delete root.dataset[key];
  }
}

export function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  // Safe to read storage during the first render: the panel body only exists
  // while it is open, so nothing preference-dependent is in the prerendered
  // HTML for hydration to disagree with.
  const [settings, setSettings] = useState(readStored);
  const wrapRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    applyToDocument(settings);
    try {
      window.localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Preferences just won't persist; the session still works.
    }
  }, [settings]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const update = (next: Partial<Settings>) => setSettings({ ...settings, ...next });
  const stepFont = (delta: number) =>
    update({ fontStep: Math.min(fontSteps.length - 1, Math.max(0, settings.fontStep + delta)) });

  const options: { key: ToggleKey; label: string; icon: typeof Contrast }[] = [
    { key: "contrast", label: "ניגודיות גבוהה", icon: Contrast },
    { key: "underlineLinks", label: "הדגשת קישורים", icon: Link2 },
    { key: "stopMotion", label: "עצירת אנימציות", icon: Pause },
  ];

  return (
    <div className="a11y" ref={wrapRef}>
      {open && (
        <div className="a11y__panel" id="a11y-panel" role="group" aria-labelledby="a11y-title">
          <div className="a11y__head">
            <p className="a11y__title" id="a11y-title">הגדרות נגישות</p>
            <button
              className="a11y__close"
              type="button"
              aria-label="סגירת תפריט הנגישות"
              onClick={() => {
                setOpen(false);
                toggleRef.current?.focus();
              }}
            >
              <X aria-hidden="true" />
            </button>
          </div>

          <div className="a11y__row">
            <span className="a11y__label"><ALargeSmall aria-hidden="true" />גודל טקסט</span>
            <div className="a11y__stepper">
              <button
                type="button"
                aria-label="הקטנת הטקסט"
                disabled={settings.fontStep === 0}
                onClick={() => stepFont(-1)}
              >
                <Minus aria-hidden="true" />
              </button>
              <output aria-live="polite">{Math.round((fontSteps[settings.fontStep] ?? 1) * 100)}%</output>
              <button
                type="button"
                aria-label="הגדלת הטקסט"
                disabled={settings.fontStep === fontSteps.length - 1}
                onClick={() => stepFont(1)}
              >
                <Plus aria-hidden="true" />
              </button>
            </div>
          </div>

          {options.map(({ key, label, icon: Icon }) => (
            <button
              className="a11y__option"
              type="button"
              key={key}
              aria-pressed={settings[key]}
              onClick={() => update({ [key]: !settings[key] })}
            >
              <Icon aria-hidden="true" />
              {label}
            </button>
          ))}

          <button className="a11y__reset" type="button" onClick={() => setSettings(defaults)}>
            <RotateCcw aria-hidden="true" />
            איפוס הגדרות
          </button>
          <AppLink className="a11y__statement" href="/accessibility" onClick={() => setOpen(false)}>
            הצהרת הנגישות שלנו
          </AppLink>
        </div>
      )}

      <button
        className="a11y__toggle"
        type="button"
        ref={toggleRef}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label="תפריט נגישות"
        onClick={() => setOpen((value) => !value)}
      >
        <Accessibility aria-hidden="true" />
      </button>
    </div>
  );
}
