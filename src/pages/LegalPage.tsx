import { type ReactNode } from "react";
import { AppLink } from "../components/AppLink";

type LegalPageProps = {
  kicker: string;
  title: string;
  updated: string;
  children: ReactNode;
};

export function LegalPage({ kicker, title, updated, children }: LegalPageProps) {
  return (
    <article className="legal">
      <div className="shell legal__inner">
        <div className="section-intro">
          <span className="kicker">{kicker}</span>
          <span className="section-rule" aria-hidden="true"><span /></span>
        </div>
        <h1>{title}</h1>
        <p className="legal__updated">עודכן ב־{updated}</p>
        <div className="legal__prose">{children}</div>
        <p className="legal__back">
          <AppLink href="/">חזרה לאתר</AppLink>
        </p>
      </div>
    </article>
  );
}
