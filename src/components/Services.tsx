import { Gauge, Headphones, LayoutDashboard, MessagesSquare, ScanSearch, Smartphone } from "lucide-react";
import { useState } from "react";
import { services } from "../data/site-content";
import { useReveal } from "../hooks/useReveal";

const icons = [Gauge, MessagesSquare, ScanSearch, Smartphone, LayoutDashboard, Headphones];

function isFinePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function Services() {
  const ref = useReveal<HTMLElement>();
  const [lifted, setLifted] = useState<string | null>(null);

  return (
    <section className="section services reveal" id="services" ref={ref}>
      <div className="shell">
        <div className="section-heading" data-reveal-item>
          <span className="kicker">מה אנחנו עושים</span>
          <span className="section-rule" aria-hidden="true"><span /></span>
          <h2>לא רק אתר יפה.<br />אתר שעובד בשבילכם.</h2>
          <p>מהרעיון הראשון ועד היום שאחרי ההשקה — תהליך אחד, צוות אחד, ואפס כאב ראש.</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = icons[index];
            const isLifted = lifted === service.number;
            return (
              <article
                className={`service-card ${isLifted ? "is-lifted" : ""}`}
                key={service.number}
                data-reveal-item
                onClick={() => {
                  if (isFinePointer()) return;
                  setLifted((current) => (current === service.number ? null : service.number));
                }}
              >
                <span className="service-card__bar" aria-hidden="true" />
                <span className="service-card__icon"><Icon aria-hidden="true" /></span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
