import type { Metadata } from "next";
import { site, mailtoHref, telHref } from "@/content/site";
import { Ltr } from "@/components/ui/Ltr";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Prose, LegalSection } from "@/components/layout/Prose";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description:
    "הצהרת הנגישות של האתר: רמת התקן שאליה הוא מכוון, מה נבדק בפועל, מה עדיין מוגבל, ואיך לדווח על בעיית נגישות ולקבל מענה.",
};

export default function AccessibilityPage() {
  return (
    <main id="main" className="container-content py-32 md:py-40">
      <MonoLabel>מידע</MonoLabel>
      <h1 className="text-display-lg mt-4">הצהרת נגישות</h1>
      <p className="text-body-sm text-text-tertiary mt-4">
        עודכן לאחרונה: <Ltr>{site.legal.accessibilityUpdatedAt}</Ltr>
      </p>

      <Prose>
        <p className="text-body-lg">
          אני מתייחס לנגישות כחלק מהמקצוע, לא כסעיף שמתווסף בסוף. האתר הזה נבנה
          מהיסוד כך שיהיה שמיש גם במקלדת בלבד, גם עם קורא מסך, וגם למי שהעדיף
          להפחית תנועה על המסך.
        </p>

        <LegalSection id="standard" title="רמת הנגישות">
          <p>
            האתר מכוון לעמידה בתקן <Ltr>WCAG 2.2</Ltr> ברמה <Ltr>AA</Ltr>, בהתאם
            לתקן הישראלי <Ltr>ת&quot;י 5568</Ltr>. טקסט הגוף באתר עומד בפועל
            ברמת <Ltr>AAA</Ltr> ביחסי ניגודיות — בחירה מכוונת, כי לעברית אין
            אותיות עולות ויורדות שמסייעות בזיהוי המילה, ולכן היא מרוויחה
            מניגודיות גבוהה יותר מלטינית באותו גודל.
          </p>
        </LegalSection>

        <LegalSection id="what-was-done" title="מה נעשה בפועל">
          <ul className="grid list-disc gap-2 ps-5">
            <li>מבנה סמנטי מלא, עם כותרת אחת בכל דף והיררכיית כותרות תקינה.</li>
            <li>
              קישור «דילוג לתוכן המרכזי» כאלמנט הראשון שמקבל פוקוס בכל דף.
            </li>
            <li>
              תפעול מלא במקלדת: כל פעולה באתר נגישה ב-<Ltr>Tab</Ltr>, סדר הפוקוס
              הגיוני, ו-<Ltr>Escape</Ltr> סוגר כל חלון צף.
            </li>
            <li>
              סימון פוקוס נראה וברור בכל אלמנט אינטראקטיבי, שלא הוסר בשום מקום.
            </li>
            <li>
              כיבוד העדפת «הפחתת תנועה» של מערכת ההפעלה. במצב הזה כל האנימציות
              נעצרות והתוכן מוצג במלואו.
            </li>
            <li>
              אף מידע באתר אינו מועבר באמצעות אנימציה בלבד או באמצעות מעבר עם
              העכבר (hover) בלבד.
            </li>
            <li>טקסט חלופי בעברית לכל תמונה שנושאת מידע.</li>
            <li>
              טפסים עם תוויות קבועות ונראות, הודעות שגיאה שמוכרזות לקוראי מסך,
              וקישור בין השדה לשגיאה שלו.
            </li>
            <li>
              תמיכה בהגדלת התצוגה עד <Ltr>200%</Ltr> בלי אובדן תוכן או תפקוד.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="tested" title="מה נבדק">
          <p>
            האתר נבדק בדפדפנים <Ltr>Chrome</Ltr>, <Ltr>Firefox</Ltr>,{" "}
            <Ltr>Safari</Ltr> ו-<Ltr>Edge</Ltr>, במחשב ובמובייל, בבדיקה אוטומטית
            (<Ltr>axe-core</Ltr>) ובבדיקה ידנית עם קוראי המסך <Ltr>NVDA</Ltr> ו-
            <Ltr>VoiceOver</Ltr> בעברית. בדיקה אוטומטית לבדה מזהה רק חלק
            מהבעיות, ולכן הבדיקה הידנית אינה אופציונלית.
          </p>
        </LegalSection>

        <LegalSection id="limitations" title="מגבלות ידועות">
          <p>אני מעדיף לכתוב את זה בכתב מלהתחזות לאתר מושלם:</p>
          <ul className="grid list-disc gap-2 ps-5">
            <li>
              בדפדפנים שאינם תומכים באנימציות מבוססות גלילה, אלמנטים מסוימים
              מוצגים ישירות במצבם הסופי. אין בכך אובדן תוכן.
            </li>
            <li>
              בתצוגת העבודות במחשב יש רצף מונפש. הוא מוחלף באופן אוטומטי בגלריה
              פשוטה במובייל וכשמופעלת העדפת הפחתת תנועה, וכל התוכן זמין בשתי
              הצורות.
            </li>
            <li>
              [להשלמה] תמונות ותכנים שיתווספו בהמשך ייבדקו בנפרד לפני פרסום.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="feedback" title="נתקלתם בבעיה? ספרו לי">
          <p>
            אם משהו באתר לא נגיש לכם — אני רוצה לדעת, ואתקן. זה לא נטל, זה חלק
            מהעבודה.
          </p>
          <p>
            אימייל:{" "}
            <a
              href={mailtoHref}
              className="text-copper-600 underline underline-offset-4"
            >
              <Ltr>{site.email}</Ltr>
            </a>
            <br />
            טלפון:{" "}
            <a
              href={telHref}
              className="text-copper-600 underline underline-offset-4"
            >
              <Ltr>{site.phoneDisplay}</Ltr>
            </a>
          </p>
          <p>אני משתדל לחזור על פנייה בנושא נגישות תוך יום עסקים אחד.</p>
        </LegalSection>
      </Prose>
    </main>
  );
}
