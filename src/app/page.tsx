import { Ltr } from "@/components/ui/Ltr";

/**
 * Phase 1 verification page. Replaced by the composed homepage in Phase 6.
 * Its only job is to prove that RTL, the three font faces and bidi isolation
 * all work end to end.
 */
export default function Home() {
  return (
    <main id="main" className="container-content py-24">
      <p className="mono-label text-copper-600">שרטוט · 01</p>

      <h1 className="text-display-lg text-text-primary mt-4">בנוי, לא מורכב</h1>

      <p className="measure text-body-lg text-text-secondary mt-6">
        כשעסק מחפש אתר, הוא בדרך כלל מקבל תבנית שנראית כמו עוד אלף אתרים. אני
        עובד אחרת: מתכנן, מעצב ובונה את האתר בעצמי — מהשורה הראשונה ועד היום
        שהוא עולה לאוויר.
      </p>

      <p className="text-body text-text-secondary mt-6">
        נבנה ב-Next.js עם TypeScript ו-Node.js.
      </p>

      <dl className="text-body-sm mt-10 grid gap-3">
        <div className="flex gap-2">
          <dt className="text-text-tertiary">טלפון:</dt>
          <dd>
            <Ltr>054-1234567</Ltr>
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-text-tertiary">אימייל:</dt>
          <dd>
            <Ltr>name@business.co.il</Ltr>
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-text-tertiary">שנות ניסיון:</dt>
          <dd>
            <Ltr>8</Ltr>
          </dd>
        </div>
      </dl>
    </main>
  );
}
