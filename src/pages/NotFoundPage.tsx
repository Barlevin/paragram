import { AppLink } from "../components/AppLink";

export function NotFoundPage() {
  return (
    <article className="legal">
      <div className="shell legal__inner">
        <div className="section-intro">
          <span className="kicker">שגיאה 404</span>
          <span className="section-rule" aria-hidden="true"><span /></span>
        </div>
        <h1>הדף הזה לא נמצא</h1>
        <p className="legal__updated">ייתכן שהכתובת השתנתה או שהוקלדה בטעות.</p>
        <div className="legal__prose">
          <p>
            אפשר לחזור לעמוד הבית ולהמשיך משם, או לכתוב לנו ישירות אל{" "}
            <a href="mailto:support@paragram.co.il">support@paragram.co.il</a> ונעזור למצוא
            את מה שחיפשתם.
          </p>
        </div>
        <p className="legal__back">
          <AppLink href="/">חזרה לאתר</AppLink>
        </p>
      </div>
    </article>
  );
}
