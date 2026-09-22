import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import { plans } from "../data/site-content";
import { useReveal } from "../hooks/useReveal";

function isFinePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function Pricing() {
  const ref = useReveal<HTMLElement>();
  const [lifted, setLifted] = useState<string | null>(null);

  return (
    <section className="section pricing reveal" id="pricing" ref={ref}>
      <div className="shell">
        <div className="section-heading" data-reveal-item>
          <span className="kicker">מסלולים</span>
          <span className="section-rule" aria-hidden="true"><span /></span>
          <h2>בלי אותיות קטנות.<br />עם הרבה ערך.</h2>
          <p>שלושה מסלולים ברורים. המחירים לא כוללים מע״מ.</p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => {
            const isLifted = !plan.featured && lifted === plan.name;
            return (
              <article
                className={`price-card ${plan.featured ? "price-card--featured" : ""} ${isLifted ? "is-lifted" : ""}`}
                key={plan.name}
                data-reveal-item
                onClick={(event) => {
                  if (plan.featured || isFinePointer()) return;
                  if ((event.target as HTMLElement).closest("a")) return;
                  setLifted((current) => (current === plan.name ? null : plan.name));
                }}
              >
                {!plan.featured && <span className="price-card__bar" aria-hidden="true" />}
                {plan.featured && <span className="price-card__badge">הכי פופולרי</span>}
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
                <strong>{plan.price}</strong>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}><Check aria-hidden="true" />{feature}</li>
                  ))}
                </ul>
                <a className={plan.featured ? "button button--dark" : "button button--outline"} href="#contact">
                  המסלול מתאים לי <ArrowLeft />
                </a>
                {plan.note && <small className="price-card__note">{plan.note}</small>}
              </article>
            );
          })}
        </div>
        {/* <p className="pricing-note">המחירים לא כוללים מע״מ.</p> */}
      </div>
    </section>
  );
}
