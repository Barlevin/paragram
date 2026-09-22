import { ArrowLeft, BriefcaseBusiness, Camera } from "lucide-react";
import { FormEvent, useState } from "react";
import { navItems } from "../data/site-content";
import { submitLead } from "../lib/api";
import { useReveal } from "../hooks/useReveal";
import { AppLink } from "./AppLink";

type Status = "idle" | "submitting" | "success" | "error";

const whatsappNumber = "972503600010";
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "היי, הגעתי מהאתר של Paragram ואשמח לשמוע עוד על בניית אתר.",
)}`;

/** lucide-react no longer ships brand marks, so the glyph lives here. */
function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.85 9.85 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.55-3.7 8.24-8.24 8.24-1.45 0-2.88-.39-4.13-1.13l-.3-.18-3.11.82.83-3.04-.19-.31a8.19 8.19 0 0 1-1.26-4.4c0-4.54 3.7-8.24 8.16-8.24Zm-3.7 4.02c-.17 0-.45.06-.69.32-.23.26-.89.87-.89 2.12 0 1.25.91 2.46 1.04 2.63.13.17 1.79 2.74 4.34 3.84.61.26 1.08.42 1.45.53.61.2 1.16.17 1.6.1.49-.07 1.5-.61 1.72-1.21.21-.59.21-1.1.15-1.21-.06-.1-.23-.17-.49-.3-.25-.13-1.5-.74-1.74-.83-.23-.08-.4-.13-.57.13-.17.25-.66.82-.8 1-.15.16-.3.19-.55.06-.26-.13-1.08-.4-2.05-1.26-.76-.68-1.27-1.51-1.42-1.76-.15-.26-.02-.4.11-.52.11-.12.3-.3.44-.45.15-.15.2-.25.3-.42.1-.17.05-.32-.04-.45-.09-.13-.58-1.38-.79-1.89-.2-.5-.41-.42-.57-.43h-.22Z" />
    </svg>
  );
}

export function ContactFooter() {
  const ref = useReveal<HTMLElement>();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const invalid = status === "error";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();

    if (name.length < 2 || phone.length < 7 || !email.includes("@")) {
      setStatus("error");
      setError("נא למלא שם, טלפון ואימייל תקינים.");
      return;
    }

    if (data.get("consent") !== "on") {
      setStatus("error");
      setError("יש לאשר את מדיניות הפרטיות כדי שנחזור אליכם.");
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      await submitLead({
        name,
        phone,
        email,
        business: String(data.get("business") || ""),
        message: String(data.get("message") || ""),
        website: String(data.get("website") || ""),
      });
      setStatus("success");
      form.reset();
    } catch (caught) {
      setStatus("error");
      setError(caught instanceof Error ? caught.message : "אירעה שגיאה.");
    }
  }

  return (
    <>
      <section className="contact reveal" id="contact" ref={ref}>
        <div className="shell contact__grid">
          <div className="contact__copy" data-reveal-item>
            <div className="section-intro">
              <span className="kicker">הפרויקט הבא שלכם מתחיל כאן</span>
              <span className="section-rule" aria-hidden="true"><span /></span>
            </div>
            <h2>יש לכם רעיון?<br /><em>בואו נעשה ממנו וואו.</em></h2>
            <p>ספרו לנו קצת על העסק ועל מה שאתם רוצים לבנות. נחזור אליכם תוך יום עסקים אחד.</p>
            <div className="contact__direct">
              <a href="mailto:support@paragram.co.il">support@paragram.co.il</a>
              <a href="tel:+972503600010"><bdi>050-3600010</bdi></a>
            </div>
            <a
              className="button button--whatsapp contact__whatsapp"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppGlyph />
              שלחו לנו וואטסאפ
              <span className="visually-hidden">(נפתח בחלון חדש)</span>
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate data-reveal-item>
            <div className="form-row">
              <label>איך קוראים לך? *
                <input name="name" autoComplete="name" required aria-required="true" aria-invalid={invalid} aria-describedby="form-message" placeholder="שם מלא" />
              </label>
              <label>טלפון *
                <input name="phone" type="tel" autoComplete="tel" required aria-required="true" aria-invalid={invalid} aria-describedby="form-message" placeholder="050-000-0000" dir="ltr" />
              </label>
            </div>
            <div className="form-row">
              <label>אימייל *
                <input name="email" type="email" autoComplete="email" required aria-required="true" aria-invalid={invalid} aria-describedby="form-message" placeholder="you@business.co.il" dir="ltr" />
              </label>
              <label>שם העסק
                <input name="business" autoComplete="organization" placeholder="העסק שלי" />
              </label>
            </div>
            <label>מה תרצו לבנות?
              <textarea name="message" rows={3} placeholder="ספרו לנו בכמה מילים..." />
            </label>
            <label className="honeypot" aria-hidden="true">אתר
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
            <label className="consent">
              <input name="consent" type="checkbox" value="on" required aria-required="true" aria-describedby="form-message" />
              <span>
                אני מסכימ/ה שתיצרו איתי קשר ומאשר/ת את{" "}
                <AppLink href="/privacy">מדיניות הפרטיות</AppLink>.
              </span>
            </label>
            <button className="button button--dark form-submit" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "שולחים..." : "שליחת פרטים"} <ArrowLeft />
            </button>
            <div
              className={`form-message form-message--${status}`}
              id="form-message"
              role={status === "error" ? "alert" : "status"}
              aria-live={status === "error" ? "assertive" : "polite"}
            >
              {status === "success" && "קיבלנו! נחזור אליכם ממש בקרוב."}
              {status === "error" && error}
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}

export function Footer() {
  const footerRef = useReveal<HTMLElement>();

  return (
    <footer className="footer reveal" ref={footerRef}>
      <div className="shell footer__inner">
        <div className="footer__brand" data-reveal-item>
          <AppLink className="logo" href="/">
            <img src="/images/logo.webp" alt="Paragram" width="387" height="140" />
          </AppLink>
          <p>עיצוב ופיתוח דיגיטלי לעסקים שרוצים לבלוט.</p>
          <div className="footer__social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Camera /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness /></a>
          </div>
        </div>

        <nav className="footer__col" aria-label="ניווט באתר" data-reveal-item>
          <h3>ניווט</h3>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}><AppLink href={item.href}>{item.label}</AppLink></li>
            ))}
            <li><AppLink href="#contact">צור קשר</AppLink></li>
          </ul>
        </nav>

        <div className="footer__col" data-reveal-item>
          <h3>יצירת קשר</h3>
          <ul>
            <li><a href="mailto:support@paragram.co.il">support@paragram.co.il</a></li>
            <li><a href="tel:+972503600010" dir="ltr">050-3600010</a></li>
          </ul>
        </div>
      </div>

      <div className="shell footer__bottom">
        <span>© 2026 Paragram</span>
        <div className="footer__legal">
          <AppLink href="/privacy">מדיניות פרטיות</AppLink>
          <AppLink href="/accessibility">הצהרת נגישות</AppLink>
          <AppLink href="#top">חזרה למעלה ↑</AppLink>
        </div>
      </div>
    </footer>
  );
}
