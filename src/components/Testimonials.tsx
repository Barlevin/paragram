import { Quote } from "lucide-react";
import { useState } from "react";
import { testimonials } from "../data/site-content";
import { useReveal } from "../hooks/useReveal";

function isFinePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function Testimonials() {
  const ref = useReveal<HTMLElement>();
  const [lifted, setLifted] = useState<string | null>(null);

  return (
    <section className="section testimonials reveal" id="testimonials" ref={ref}>
      <div className="shell">
        <div className="section-intro" data-reveal-item>
          <span className="kicker">לקוחות מספרים</span>
          <span className="section-rule" aria-hidden="true"><span /></span>
        </div>
        <div className="testimonials__title" data-reveal-item>
          <h2>הם כבר עשו<br />את הצעד.</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => {
            const isLifted = lifted === testimonial.name;
            return (
              <figure
                className={`quote-card ${isLifted ? "is-lifted" : ""}`}
                key={testimonial.name}
                data-reveal-item
                onClick={() => {
                  if (isFinePointer()) return;
                  setLifted((current) => (current === testimonial.name ? null : testimonial.name));
                }}
              >
                <span className="quote-card__bar" aria-hidden="true" />
                <Quote aria-hidden="true" />
                <blockquote>״{testimonial.quote}״</blockquote>
                <figcaption>
                  <span>{testimonial.name.charAt(0)}</span>
                  <div><strong>{testimonial.name}</strong><small>{testimonial.role}</small></div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
