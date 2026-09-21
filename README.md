# Paragram

אתר תדמית עברי ו־RTL לסטודיו דיגיטל, בנוי עם React, Vite, Tailwind CSS ו־Node/Express.

## הרצה מקומית

דרישות: Node.js 20 ומעלה.

```bash
npm install
cp .env.example .env
npm run dev
```

האתר נפתח ב־`http://localhost:5173` וה־API ב־`http://localhost:8787`.

## הגדרת קבלת לידים

לידים נשלחים באימייל דרך [Resend](https://resend.com). כל ליד תקין נשמר קודם כל לקובץ ורק אחר כך נשלח באימייל, כך שגם תקלה בשליחה לא מאבדת פנייה.

יש להעתיק את `.env.example` ל־`.env` ולעדכן:

- `RESEND_API_KEY` — מפתח מסוג "sending access" מלוח הבקרה של Resend. לעולם לא להוסיף ל־Git.
- `LEADS_TO` — הכתובת שתקבל את הפניות.
- `MAIL_FROM` — כתובת השולח. עד לאימות דומיין ב־Resend יש להשתמש ב־`onboarding@resend.dev`, שממנו Resend שולח **רק** לכתובת שאיתה נרשם החשבון. לאחר אימות `paragram.co.il` אפשר לעבור ל־`Paragram <support@paragram.co.il>`.
- `LEADS_FILE` — מיקום קובץ הלידים (ברירת מחדל `./data/leads.jsonl`). התיקייה `data` מוחרגת מ־Git כי הקובץ מכיל פרטים אישיים.
- `TRUST_PROXY` — להגדיר רק כשהשרת רץ מאחורי פרוקסי או CDN. בלי זה מגביל הבקשות רואה את כל המבקרים כאותה כתובת IP וחוסם לקוחות אמיתיים.

## החלפת תוכן

כל תוכן הדוגמה מרוכז ב־`src/data/site-content.ts`: ניווט, שירותים, 12 פרויקטים, מסלולים והמלצות. לפני פרסום:

1. החליפו תמונות וקישורי `example.com` בפרויקטים אמיתיים.
2. החליפו מחירים, שמות והמלצות בתוכן מאומת.
3. עדכנו קישורי רשתות חברתיות.

כתובת האתר מוגדרת פעם אחת ב־`SITE_URL` שב־`src/lib/seo.ts`, ובנוסף ב־`index.html`, `public/robots.txt` ו־`public/sitemap.xml`.

## פקודות איכות

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## פריסה

`npm run build` מריץ בדיקת טיפוסים, בונה את הקליינט, בונה חבילת SSR ומייצר HTML סטטי לכל עמוד (`index.html`, `privacy.html`, `accessibility.html`, `404.html`) — כך שגוגל רואה תוכן אמיתי בלי להריץ JavaScript.

בהרצה עם `NODE_ENV=production npm start`, שרת Express מגיש את העמודים המוכנים ואת `/api/leads` מאותו דומיין, ומחזיר 404 אמיתי לכתובות שלא קיימות. יש להגדיר את משתני הסביבה בפלטפורמת האירוח ולוודא שפורט השרת מתקבל דרך `PORT`.
