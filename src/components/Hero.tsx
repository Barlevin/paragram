import { ArrowDownLeft, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { revealIfAlreadyLoaded } from "../lib/images";

export function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setReady(true));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className={`hero ${ready ? "hero--ready" : ""}`} id="top">
      <div className="hero__media">
        <img
          src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=90"
          alt="חלל פנים מודרני ומעוצב"
          width="2200"
          height="1400"
          fetchPriority="high"
          ref={revealIfAlreadyLoaded}
          onLoad={(event) => { event.currentTarget.dataset.loaded = "true"; }}
        />
        <div className="hero__overlay" aria-hidden="true" />
      </div>

      <div className="shell hero__content">
        <div className="hero__copy">
          <div className="hero__intro">
            {/* <div className="hero__eyebrow">
              <span className="status-dot" />
              מקבלים פרויקטים חדשים לאוגוסט
            </div> */}
            <span className="section-rule" aria-hidden="true"><span /></span>
          </div>
          <h1>
            <span className="hero__line"><span>אתרים שאי אפשר</span></span>
            <span className="hero__line hero__line--accent"><span>להתעלם מהם.</span></span>
          </h1>
          <p className="hero__lead">
            אנחנו הופכים עסקים טובים למותגים דיגיטליים שאנשים זוכרים, אוהבים — ובוחרים בהם.
          </p>
          <div className="hero__actions">
            <span className="hero__action">
              <a className="button" href="#contact">בואו נבנה משהו מעולה <ArrowLeft /></a>
            </span>
            <span className="hero__action hero__action--late">
              <a className="text-link" href="#projects">לפרויקטים שלנו <ArrowDownLeft /></a>
            </span>
          </div>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div>אסטרטגיה · עיצוב · פיתוח · תוכן · חווית משתמש</div>
      </div>
    </section>
  );
}
