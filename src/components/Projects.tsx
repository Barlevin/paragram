import { ArrowLeft, ArrowRight, ArrowUpLeft } from "lucide-react";
import { type CSSProperties, type PointerEvent, useEffect, useRef, useState } from "react";
import { projects } from "../data/site-content";
import { useReveal } from "../hooks/useReveal";
import { revealIfAlreadyLoaded } from "../lib/images";

/** Pointer travel before a press counts as a drag rather than a click. */
const dragThreshold = 10;

function perViewForWidth(width: number) {
  if (width < 700) return 1;
  if (width < 1100) return 2;
  return 3;
}

export function Projects() {
  const ref = useReveal<HTMLElement>();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);
  const [paused, setPaused] = useState(false);
  const drag = useRef({ active: false, startX: 0, delta: 0, moved: false, captured: false });
  const [dragView, setDragView] = useState({ active: false, delta: 0 });

  const maxIndex = Math.max(0, projects.length - perView);
  const safeIndex = Math.min(index, maxIndex);
  const dragOffset = dragView.active ? dragView.delta : 0;

  const syncDragView = () => setDragView({ active: drag.current.active, delta: drag.current.delta });

  useEffect(() => {
    const update = () => setPerView(perViewForWidth(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (paused || typeof window.matchMedia !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 4800);
    return () => window.clearInterval(timer);
  }, [maxIndex, paused]);

  function goTo(next: number) {
    setIndex(Math.min(maxIndex, Math.max(0, next)));
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;
    // Capturing here would retarget the click away from the card link, so the
    // pointer is only captured once the press turns into an actual drag.
    drag.current = { active: true, startX: event.clientX, delta: 0, moved: false, captured: false };
    setPaused(true);
    syncDragView();
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    const raw = event.clientX - drag.current.startX;

    if (!drag.current.captured) {
      if (Math.abs(raw) <= dragThreshold) return;
      viewportRef.current?.setPointerCapture?.(event.pointerId);
      drag.current.captured = true;
      drag.current.moved = true;
    }

    const atStart = safeIndex <= 0 && raw > 0;
    const atEnd = safeIndex >= maxIndex && raw < 0;
    drag.current.delta = atStart || atEnd ? raw * 0.28 : raw;
    syncDragView();
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    const { delta, moved, captured } = drag.current;
    drag.current = { active: false, startX: 0, delta: 0, moved, captured: false };
    if (captured) viewportRef.current?.releasePointerCapture?.(event.pointerId);
    const slideSize = (viewportRef.current?.offsetWidth || 320) / perView;
    const slides = Math.round(-delta / slideSize);
    if (slides !== 0) goTo(safeIndex + slides);
    window.setTimeout(() => {
      drag.current.moved = false;
      setPaused(false);
    }, 80);
    syncDragView();
  }

  return (
    <section className="section projects reveal" id="projects" ref={ref}>
      <div className="shell">
        <div className="section-heading section-heading--light" data-reveal-item>
          <span className="kicker">עבודות נבחרות / 2024—2026</span>
          <span className="section-rule" aria-hidden="true"><span /></span>
          <h2>עבודה טובה<br />מדברת בעד עצמה.</h2>
          <p>כל פרויקט מתחיל בהקשבה ונגמר בתוצאה שזזה, מרגישה נכון ומייצרת ערך אמיתי.</p>
        </div>

        <div
          className="projects-carousel"
          data-reveal-item
          style={{ "--per-view": perView, "--index": safeIndex, "--drag": `${dragOffset}px` } as CSSProperties}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { if (!dragView.active) setPaused(false); }}
          onFocus={() => setPaused(true)}
          onBlur={() => { if (!dragView.active) setPaused(false); }}
        >
          <button
            type="button"
            className="projects-carousel__btn projects-carousel__btn--prev"
            aria-label="פרויקט קודם"
            onClick={() => goTo(safeIndex - 1)}
            onPointerDown={(event) => event.stopPropagation()}
            disabled={safeIndex <= 0}
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            className="projects-carousel__btn projects-carousel__btn--next"
            aria-label="פרויקט הבא"
            onClick={() => goTo(safeIndex + 1)}
            onPointerDown={(event) => event.stopPropagation()}
            disabled={safeIndex >= maxIndex}
          >
            <ArrowRight />
          </button>

          <div
            ref={viewportRef}
            className={`projects-carousel__viewport ${dragView.active ? "is-dragging" : ""}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div className={`projects-carousel__track ${dragView.active ? "is-dragging" : ""}`}>
              {projects.map((project, projectIndex) => (
                <a
                  className="project-card"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  key={`${project.title}-${projectIndex}`}
                  aria-label={`${project.title} — ${project.category}, פתיחה באתר חיצוני`}
                  draggable={false}
                  onDragStart={(event) => event.preventDefault()}
                  onClick={(event) => {
                    if (drag.current.moved) event.preventDefault();
                  }}
                >
                  <div className="project-card__image">
                    <img
                      src={project.image}
                      alt={`אתר של ${project.title} — ${project.category}, בעיצוב ופיתוח של Paragram`}
                      width="1200"
                      height="800"
                      loading={projectIndex < 4 ? "eager" : "lazy"}
                      style={project.focus ? { objectPosition: project.focus } : undefined}
                      draggable={false}
                      ref={revealIfAlreadyLoaded}
                      onLoad={(event) => { event.currentTarget.dataset.loaded = "true"; }}
                    />
                    <span><ArrowUpLeft /></span>
                  </div>
                  <div className="project-card__info">
                    <h3>{project.title}</h3>
                    <p>{project.category}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
