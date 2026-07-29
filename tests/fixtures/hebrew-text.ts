/**
 * The Hebrew text matrix.
 *
 * Every one of these strings gets rendered into real components at 320px, 768px
 * and 1280px. They exist because Hebrew breaks layouts in ways Latin lorem
 * ipsum never reveals: no ascenders or descenders, uniform x-height, different
 * line-height needs, and bidi reordering the moment a Latin word or a digit
 * appears mid-sentence.
 */

export const hebrewHeadlineLong =
  "האתר שלכם הוא הדבר הראשון שלקוחות רואים, וגם הדבר הראשון שהם שופטים";

export const hebrewHeadlineShort = "בנוי, לא מורכב";

export const hebrewParagraph =
  "כשעסק מחפש אתר, הוא בדרך כלל מקבל אחת משתי אפשרויות: תבנית זולה שנראית כמו עוד אלף אתרים, או סוכנות שמעבירה אותו בין ארבעה אנשי קשר. אני עובד אחרת. אני מתכנן, מעצב ובונה את האתר בעצמי, מהשורה הראשונה ועד היום שהוא עולה לאוויר. זה אומר שאתם מדברים עם האדם שכותב את הקוד, שהאתר נבנה סביב העסק שלכם ולא סביב תבנית קיימת, ושכשמשהו צריך תיקון — יש למי לפנות.";

/** Mixed script. The classic bidi trap. */
export const mixedScript = "בנוי ב-Next.js עם TypeScript ו-Node.js";

export const mixedScriptSentence =
  "האתר נבנה ב-React, רץ על Node.js, ומקבל ציון 100 ב-SEO וב-UX.";

export const israeliPhoneMobile = "054-1234567";
export const israeliPhoneE164 = "+972-54-123-4567";
export const israeliPhoneLandline = "03-1234567";
export const emailAddress = "name@business.co.il";
export const urlString = "https://playcs.gg";
export const priceString = "₪1,900";
export const singleNumeral = "8";

/** Hebrew gershayim, not the Latin double quote. */
export const hebrewQuoted = "העסק נקרא ״מרכז הבריאות״ והוא פועל 12 שנה";

/** Long unbroken Hebrew word plus a long Latin token — overflow stress test. */
export const overflowStress =
  "אינטרנציונליזציה והתאמה לשוק הישראלי — supercalifragilisticexpialidocious";

export const allTextSamples = [
  { key: "headline-long", label: "כותרת ארוכה", value: hebrewHeadlineLong },
  { key: "headline-short", label: "כותרת קצרה", value: hebrewHeadlineShort },
  { key: "paragraph", label: "פסקה", value: hebrewParagraph },
  { key: "mixed", label: "עברית ואנגלית", value: mixedScript },
  { key: "mixed-sentence", label: "משפט מעורב", value: mixedScriptSentence },
  { key: "quoted", label: "גרשיים", value: hebrewQuoted },
  { key: "overflow", label: "מילים ארוכות", value: overflowStress },
] as const;

/** Strings that must be bidi-isolated wherever they appear. */
export const ltrSamples = [
  { key: "phone-mobile", label: "טלפון נייד", value: israeliPhoneMobile },
  { key: "phone-e164", label: "טלפון בינלאומי", value: israeliPhoneE164 },
  { key: "phone-landline", label: "טלפון קווי", value: israeliPhoneLandline },
  { key: "email", label: "אימייל", value: emailAddress },
  { key: "url", label: "כתובת אתר", value: urlString },
  { key: "price", label: "מחיר", value: priceString },
  { key: "numeral", label: "מספר", value: singleNumeral },
] as const;

/** Viewport widths every layout is checked against. */
export const testViewports = [320, 375, 414, 768, 1024, 1280, 1536] as const;
