import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea, Checkbox } from "@/components/ui/Field";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { MonoLabel, Hairline } from "@/components/ui/MonoLabel";
import { Ltr } from "@/components/ui/Ltr";
import { Reveal, RevealGroup, MaskedLines } from "@/components/motion/Reveal";
import {
  ArrowIcon,
  ChevronIcon,
  WhatsAppIcon,
  PhoneIcon,
  MailIcon,
  CheckIcon,
  ExternalIcon,
  serviceIcons,
} from "@/components/ui/icons";
import { allTextSamples, ltrSamples } from "@tests/fixtures/hebrew-text";

export const metadata = { robots: { index: false, follow: false } };

/**
 * Design-system specimen page. Development only — returns 404 in production.
 *
 * Renders every primitive in every state plus the full Hebrew text matrix, so a
 * token change can be reviewed in one place. This is the fastest way to catch a
 * contrast, bidi or long-Hebrew regression.
 */
export default function SystemPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main id="main" className="pb-40">
      <header className="band-ink on-ink py-16">
        <div className="container-content">
          <MonoLabel tone="inverse">Design system · שרטוט</MonoLabel>
          <h1 className="text-display-lg mt-3">מפרט מערכת העיצוב</h1>
          <p className="measure text-body-lg text-text-inverse-secondary mt-4">
            כל הפרימיטיבים, בכל המצבים, יחד עם מטריצת הטקסט בעברית. הדף הזה קיים
            רק בסביבת פיתוח.
          </p>
        </div>
      </header>

      <Group title="צבע" id="color">
        <div className="grid gap-6">
          <Swatches
            label="Ink"
            items={[
              ["ink-950", "bg-ink-950"],
              ["ink-900", "bg-ink-900"],
              ["ink-800", "bg-ink-800"],
              ["ink-700", "bg-ink-700"],
              ["ink-600", "bg-ink-600"],
            ]}
          />
          <Swatches
            label="Paper"
            items={[
              ["paper-50", "bg-paper-50"],
              ["paper-100", "bg-paper-100"],
              ["paper-200", "bg-paper-200"],
              ["paper-300", "bg-paper-300"],
            ]}
          />
          <Swatches
            label="Copper"
            items={[
              ["copper-400", "bg-copper-400"],
              ["copper-500", "bg-copper-500"],
              ["copper-600", "bg-copper-600"],
            ]}
          />
          <Swatches
            label="Draft (decorative only, never contrast-bound)"
            items={[
              ["draft-300", "bg-draft-300"],
              ["draft-400", "bg-draft-400"],
            ]}
          />
          <Swatches
            label="Semantic"
            items={[
              ["success-600", "bg-success-600"],
              ["error-600", "bg-error-600"],
              ["warning-600", "bg-warning-600"],
            ]}
          />
        </div>
      </Group>

      <Group title="טיפוגרפיה" id="type">
        <div className="grid gap-8">
          <Specimen name="display-xl">
            <p className="text-display-xl">בנוי, לא מורכב</p>
          </Specimen>
          <Specimen name="display-lg">
            <p className="text-display-lg">בנוי, לא מורכב</p>
          </Specimen>
          <Specimen name="display-md">
            <p className="text-display-md">בנוי, לא מורכב</p>
          </Specimen>
          <Specimen name="heading">
            <p className="text-heading font-display font-semibold">
              כמה זמן לוקח לבנות אתר?
            </p>
          </Specimen>
          <Specimen name="body-lg">
            <p className="text-body-lg measure">
              אני מתכנן, מעצב ובונה את האתר בעצמי, מהשורה הראשונה ועד היום שהוא
              עולה לאוויר.
            </p>
          </Specimen>
          <Specimen name="body">
            <p className="text-body measure">
              אני מתכנן, מעצב ובונה את האתר בעצמי, מהשורה הראשונה ועד היום שהוא
              עולה לאוויר.
            </p>
          </Specimen>
          <Specimen name="body-sm">
            <p className="text-body-sm measure text-text-secondary">
              תשובה תוך יום עסקים אחד. שיחה ראשונה בלי התחייבות.
            </p>
          </Specimen>
          <Specimen name="mono-label">
            <MonoLabel index={1}>שרטוט</MonoLabel>
          </Specimen>
          <Specimen name="Hebrew serif + Latin mono in one heading">
            <p className="text-display-md">נבנה ב-Next.js ועם TypeScript</p>
          </Specimen>
        </div>
      </Group>

      <Group title="מטריצת טקסט בעברית" id="hebrew-matrix">
        <div className="grid gap-6">
          {allTextSamples.map((sample) => (
            <Specimen key={sample.key} name={sample.label}>
              <p className="measure text-body">{sample.value}</p>
            </Specimen>
          ))}
        </div>

        <h3 className="text-heading font-display mt-12 font-semibold">
          בידוד דו-כיווני
        </h3>
        <p className="measure text-body-sm text-text-secondary mt-2">
          כל אחד מאלה חייב להופיע בסדר חזותי נכון בתוך משפט בעברית.
        </p>
        <dl className="mt-4 grid gap-3">
          {ltrSamples.map((sample) => (
            <div
              key={sample.key}
              className="flex flex-wrap items-baseline gap-2"
            >
              <dt className="mono-label text-text-tertiary w-32 shrink-0">
                {sample.label}
              </dt>
              <dd className="text-body">
                הפרט הוא <Ltr>{sample.value}</Ltr> וזה סוף המשפט.
              </dd>
            </div>
          ))}
        </dl>
      </Group>

      <Group title="כפתורים" id="buttons">
        <div className="grid gap-8">
          <Specimen name="primary — rest / hover / focus / active">
            <div className="flex flex-wrap gap-3">
              <Button>בואו נתכנן את האתר שלכם</Button>
              <Button icon={<ArrowIcon className="size-5" />}>עם אייקון</Button>
              <Button size="md">גודל md</Button>
            </div>
          </Specimen>
          <Specimen name="primary — disabled / loading (width is preserved)">
            <div className="flex flex-wrap gap-3">
              <Button disabled>לא זמין</Button>
              <Button loading>שליחת הבריף</Button>
              <Button loading loadingLabel="שולח…">
                שליחת הבריף
              </Button>
            </div>
          </Specimen>
          <Specimen name="secondary / tertiary">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="secondary">לצפייה בעבודות</Button>
              <Button variant="secondary" disabled>
                לצפייה בעבודות
              </Button>
              <Button variant="tertiary">קראו עוד על התהליך</Button>
            </div>
          </Specimen>
          <Specimen name="ghost-ink (on the ink band)">
            <div className="band-ink on-ink flex flex-wrap gap-3 rounded-md p-6">
              <Button
                variant="ghost-ink"
                icon={<WhatsAppIcon className="size-5" />}
              >
                WhatsApp
              </Button>
              <Button
                variant="ghost-ink"
                icon={<PhoneIcon className="size-5" />}
              >
                שיחה
              </Button>
              <Button icon={<MailIcon className="size-5" />}>מייל</Button>
            </div>
          </Specimen>
        </div>
      </Group>

      <Group title="שדות טופס" id="fields">
        <div className="grid max-w-xl gap-6">
          <Field id="spec-name" label="שם מלא">
            <Input
              id="spec-name"
              placeholder="איך לפנות אליכם?"
              autoComplete="name"
            />
          </Field>

          <Field
            id="spec-phone"
            label="טלפון"
            hint="לנייד או לקווי, שני הפורמטים תקינים"
          >
            <Input
              id="spec-phone"
              ltr
              inputMode="tel"
              autoComplete="tel"
              placeholder="054-1234567"
            />
          </Field>

          <Field
            id="spec-email"
            label="אימייל"
            error="כתובת האימייל לא נראית תקינה"
          >
            <Input
              id="spec-email"
              ltr
              invalid
              inputMode="email"
              autoComplete="email"
              placeholder="name@business.co.il"
              aria-invalid
              aria-describedby="spec-email-error"
            />
          </Field>

          <Field
            id="spec-notes"
            label="משהו נוסף שכדאי שאדע?"
            optionalLabel="לא חובה"
          >
            <Textarea id="spec-notes" placeholder="ספרו לי בקצרה על העסק" />
          </Field>

          <Field id="spec-disabled" label="שדה מושבת">
            <Input id="spec-disabled" disabled placeholder="לא זמין" />
          </Field>

          <Checkbox id="spec-consent">
            אני מאשר שתחזרו אליי בטלפון, ב-WhatsApp או במייל בנוגע לפנייה הזו.
          </Checkbox>
        </div>
      </Group>

      <Group title="מצבי הודעה" id="messages">
        <div className="grid max-w-xl gap-4">
          <div className="border-success-600/30 bg-success-50 rounded-md border p-4">
            <p className="text-body-sm text-success-600 flex items-center gap-2 font-semibold">
              <CheckIcon className="size-5" />
              הבריף התקבל.
            </p>
          </div>
          <div
            role="alert"
            className="border-error-600/30 bg-error-50 rounded-md border p-4"
          >
            <p className="text-body-sm text-error-600 font-semibold">
              משהו נתקע אצלי בצד השרת. הפרטים שמילאתם נשמרו בדף.
            </p>
          </div>
          <div className="border-warning-600/30 bg-warning-50 rounded-md border p-4">
            <p className="text-body-sm text-warning-600 font-semibold">
              נשלחו כמה פניות מהכתובת הזו. נסו שוב בעוד כמה דקות.
            </p>
          </div>
          <Specimen name="loading skeleton">
            <div className="grid gap-2">
              <div className="shimmer h-4 w-2/3 rounded-sm" />
              <div className="shimmer h-4 w-1/2 rounded-sm" />
            </div>
          </Specimen>
        </div>
      </Group>

      <Group title="אקורדיון" id="accordion">
        <Accordion className="max-w-2xl">
          <AccordionItem
            id="spec-faq-1"
            group="spec-faq"
            question="כמה זמן לוקח לבנות אתר?"
          >
            <p>
              תלוי בהיקף. אתר תדמית ממוקד לוקח בדרך כלל שלושה עד חמישה שבועות
              מהרגע שהתוכן בידיי.
            </p>
          </AccordionItem>
          <AccordionItem
            id="spec-faq-2"
            group="spec-faq"
            question="אפשר לעדכן את התוכן לבד?"
          >
            <p>
              כן. אפשר לחבר את האתר למערכת ניהול תוכן כך שתוכלו לערוך טקסטים
              ותמונות בעצמכם.
            </p>
          </AccordionItem>
          <AccordionItem
            id="spec-faq-3"
            group="spec-faq"
            question="האתר יעבוד טוב במובייל?"
          >
            <p>
              כן, וזה לא סעיף שמתווסף בסוף. אני בונה קודם למובייל ואחר כך מרחיב
              לדסקטופ.
            </p>
          </AccordionItem>
        </Accordion>
      </Group>

      <Group title="אייקונים" id="icons">
        <p className="text-body-sm text-text-secondary mb-6">
          אייקונים כיווניים מסומנים בנקודה — הם מתהפכים אוטומטית ב-RTL.
        </p>
        <div className="flex flex-wrap gap-6">
          <IconCell name="arrow" directional>
            <ArrowIcon />
          </IconCell>
          <IconCell name="chevron" directional>
            <ChevronIcon />
          </IconCell>
          <IconCell name="external" directional>
            <ExternalIcon />
          </IconCell>
          <IconCell name="whatsapp">
            <WhatsAppIcon />
          </IconCell>
          <IconCell name="phone">
            <PhoneIcon />
          </IconCell>
          <IconCell name="mail">
            <MailIcon />
          </IconCell>
          <IconCell name="check">
            <CheckIcon />
          </IconCell>
        </div>

        <h3 className="text-heading font-display mt-10 font-semibold">
          אייקוני שירותים
        </h3>
        <div className="mt-4 flex flex-wrap gap-6">
          {Object.entries(serviceIcons).map(([name, Icon]) => (
            <IconCell key={name} name={name}>
              <Icon />
            </IconCell>
          ))}
        </div>
      </Group>

      <Group title="עומק, פינות וקווים" id="surfaces">
        <div className="grid gap-8">
          <Specimen name="shadows (warm-tinted, never neutral grey)">
            <div className="flex flex-wrap gap-4">
              {(["sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
                <div
                  key={s}
                  className="bg-paper-50 grid size-24 place-content-center rounded-md"
                  style={{ boxShadow: `var(--shadow-${s})` }}
                >
                  <span className="mono-label text-text-tertiary">{s}</span>
                </div>
              ))}
            </div>
          </Specimen>
          <Specimen name="radius">
            <div className="flex flex-wrap gap-4">
              {(["sm", "md", "lg"] as const).map((r) => (
                <div
                  key={r}
                  className="border-paper-300 bg-paper-50 grid size-24 place-content-center border"
                  style={{ borderRadius: `var(--radius-${r})` }}
                >
                  <span className="mono-label text-text-tertiary">{r}</span>
                </div>
              ))}
            </div>
          </Specimen>
          <Specimen name="hairline + draft grid">
            <div className="grid gap-4">
              <Hairline />
              <div className="draft-grid border-draft-300 h-24 rounded-md border" />
            </div>
          </Specimen>
        </div>
      </Group>

      <Group title="תנועה" id="motion">
        <p className="measure text-body-sm text-text-secondary mb-8">
          כל האנימציות כאן מבוססות CSS בלבד, ללא JavaScript. הפעילו העדפת «תנועה
          מופחתת» במערכת ההפעלה כדי לראות שהכול נעצר והתוכן נשאר קריא.
        </p>

        <Reveal className="border-paper-300 bg-paper-50 rounded-md border p-6">
          <MonoLabel>reveal · rise</MonoLabel>
          <p className="text-body mt-2">נחשף בעלייה עם גלילה.</p>
        </Reveal>

        <Reveal
          variant="fade"
          className="border-paper-300 bg-paper-50 mt-4 rounded-md border p-6"
        >
          <MonoLabel>reveal · fade</MonoLabel>
          <p className="text-body mt-2">נחשף בדהייה בלבד.</p>
        </Reveal>

        <Reveal
          variant="plate"
          className="border-paper-300 bg-paper-50 mt-4 rounded-md border p-6"
        >
          <MonoLabel>reveal · plate</MonoLabel>
          <p className="text-body mt-2">נחשף בניגוב מימין לשמאל.</p>
        </Reveal>

        <RevealGroup className="mt-8 grid gap-3 sm:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="border-paper-300 bg-paper-50 rounded-md border p-5"
            >
              <MonoLabel index={n}>קלף</MonoLabel>
            </div>
          ))}
        </RevealGroup>

        <div className="mt-10">
          <MonoLabel>masked lines</MonoLabel>
          <p className="text-display-md mt-2">
            <MaskedLines
              lines={["העסק שלכם לא נראה כמו כולם.", "אין סיבה שהאתר שלו כן."]}
            />
          </p>
        </div>
      </Group>
    </main>
  );
}

/* --- specimen page furniture --------------------------------------------- */

function Group({
  title,
  id,
  children,
}: {
  title: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className="container-content pt-20"
    >
      <h2 id={`${id}-h`} className="text-display-md">
        {title}
      </h2>
      <Hairline className="mt-4 mb-10" />
      {children}
    </section>
  );
}

function Specimen({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3">
      <p className="mono-label text-text-tertiary">{name}</p>
      {children}
    </div>
  );
}

function Swatches({
  label,
  items,
}: {
  label: string;
  items: readonly (readonly [string, string])[];
}) {
  return (
    <div>
      <p className="mono-label text-text-tertiary mb-3">{label}</p>
      <div className="flex flex-wrap gap-3">
        {items.map(([name, bg]) => (
          <div key={name} className="grid gap-2">
            <div
              className={`border-paper-300 size-20 rounded-md border ${bg}`}
            />
            <span className="mono-label text-text-tertiary">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IconCell({
  name,
  directional = false,
  children,
}: {
  name: string;
  directional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid w-24 justify-items-center gap-2">
      <div className="border-paper-300 bg-paper-50 text-copper-600 grid size-14 place-content-center rounded-md border">
        {children}
      </div>
      <span className="mono-label text-text-tertiary text-center">
        {name}
        {directional ? " ·" : ""}
      </span>
    </div>
  );
}
