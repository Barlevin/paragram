import type { Metadata } from "next";
import { site, mailtoHref } from "@/content/site";
import { Ltr } from "@/components/ui/Ltr";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Prose, LegalSection } from "@/components/layout/Prose";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description:
    "מה נאסף באתר הזה, למה, כמה זמן זה נשמר ואיך אפשר לבקש מחיקה. בקצרה: רק מה שאתם שולחים לי בטופס, ובלי מעקב אישי.",
};

export default function PrivacyPage() {
  return (
    <main id="main" className="container-content py-32 md:py-40">
      <MonoLabel>מידע</MonoLabel>
      <h1 className="text-display-lg mt-4">מדיניות פרטיות</h1>
      <p className="text-body-sm text-text-tertiary mt-4">
        עודכן לאחרונה: <Ltr>{site.legal.privacyUpdatedAt}</Ltr>
      </p>

      <Prose>
        <p className="text-body-lg">
          הדף הזה כתוב בעברית פשוטה בכוונה. אני לא אוסף עליכם מידע שאני לא צריך,
          ואני לא מוכר מידע לאף אחד.
        </p>

        <LegalSection id="what" title="איזה מידע נאסף">
          <p>
            מידע נאסף רק כשאתם בוחרים לשלוח אותו — כלומר כשאתם ממלאים את טופס
            הבריף או פונים אליי ישירות. במקרה כזה אני מקבל את הפרטים שמילאתם:
            שם, טלפון, כתובת אימייל, סוג העסק, סוג האתר שאתם צריכים, המטרות
            והיכולות שסימנתם, לוח הזמנים, טווח התקציב אם בחרתם לציין אותו, וכל
            טקסט חופשי שהוספתם.
          </p>
          <p>
            בנוסף, כתובת ה-IP שלכם משמשת להגנה מפני שליחה אוטומטית של פניות
            (spam). היא נשמרת בצורה מוצפנת בלבד, לתקופה של עשר דקות, ואינה נשמרת
            יחד עם הפנייה עצמה.
          </p>
        </LegalSection>

        <LegalSection id="why" title="למה המידע נדרש">
          <p>
            כדי שאוכל לחזור אליכם ולהבין מה אתם צריכים לפני השיחה הראשונה. זה
            הכול. אני לא משתמש בפרטים האלה לשיווק, לא מוסיף אתכם לרשימת תפוצה
            ולא שולח לכם ניוזלטר.
          </p>
        </LegalSection>

        <LegalSection id="storage" title="איפה המידע נשמר וכמה זמן">
          <p>
            הפנייה נשלחת לתיבת הדואר שלי באמצעות שירות דיוור (<Ltr>Resend</Ltr>)
            ואינה נשמרת במסד נתונים באתר. הפנייה נשמרת בתיבת הדואר שלי כל עוד
            היא רלוונטית לקשר העסקי בינינו.
          </p>
        </LegalSection>

        <LegalSection id="analytics" title="מדידה ואנליטיקס">
          <p>
            באתר פועלת מדידה אנונימית שאינה משתמשת בקוקיז ואינה מזהה אותכם
            אישית. אני רואה נתונים מצטברים בלבד — למשל כמה אנשים ביקרו בעמוד
            מסוים או לחצו על כפתור — ולא מידע שניתן לקשר אליכם.
          </p>
          <p>
            <strong>מה שאינו נאסף לעולם:</strong> תוכן השדות שאתם מקלידים בטופס
            לפני שליחה, שמות, מספרי טלפון, כתובות אימייל, הקלטות מסך, או מזהים
            שמאפשרים לעקוב אחריכם בין אתרים.
          </p>
          <p>
            מכיוון שלא נעשה שימוש בקוקיז למעקב, אין באתר באנר אישור קוקיז. זו
            בחירה מכוונת.
          </p>
        </LegalSection>

        <LegalSection id="third-parties" title="ספקים חיצוניים">
          <p>
            כדי להפעיל את האתר אני נעזר בשירותים הבאים: <Ltr>Vercel</Ltr> (אחסון
            האתר), <Ltr>Resend</Ltr> (שליחת פניות למייל שלי),{" "}
            <Ltr>Cloudflare Turnstile</Ltr> (הגנה מפני בוטים) ו-
            <Ltr>Upstash</Ltr> (הגבלת קצב שליחה). כל אחד מהם מקבל רק את המידע
            המינימלי הדרוש לתפקידו.
          </p>
        </LegalSection>

        <LegalSection id="rights" title="הזכויות שלכם">
          <p>
            אתם רשאים לבקש לראות את המידע ששמור עליכם, לתקן אותו, או לבקש למחוק
            אותו לחלוטין. שלחו לי הודעה לכתובת{" "}
            <a
              href={mailtoHref}
              className="text-copper-600 underline underline-offset-4"
            >
              <Ltr>{site.email}</Ltr>
            </a>{" "}
            ואטפל בבקשה תוך זמן סביר.
          </p>
        </LegalSection>

        <LegalSection id="changes" title="שינויים במדיניות">
          <p>
            אם המדיניות תתעדכן, התאריך בראש הדף ישתנה בהתאם. שינוי מהותי יצוין
            כאן במפורש.
          </p>
        </LegalSection>
      </Prose>
    </main>
  );
}
