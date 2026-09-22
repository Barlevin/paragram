import type { AppPage } from "./navigation";

/** Change this to the real domain before going live. */
export const SITE_URL = "https://paragram.co.il";

type PageMeta = {
  path: string;
  title: string;
  description: string;
  indexable: boolean;
};

export const pageMeta: Record<AppPage, PageMeta> = {
  home: {
    path: "/",
    title: "בניית אתרים לעסקים | Paragram — עיצוב ופיתוח אתרים",
    description:
      "Paragram — סטודיו לבניית אתרים לעסקים קטנים ובינוניים: אתרי תדמית, דפי נחיתה וחנויות אונליין. עיצוב מקצועי, כתיבת תוכן ואתר באוויר תוך שבועות. מ-1,810 ₪.",
    indexable: true,
  },
  privacy: {
    path: "/privacy",
    title: "מדיניות פרטיות | Paragram",
    description:
      "מדיניות הפרטיות של Paragram: איזה מידע נאסף באתר, למה הוא משמש, איך הוא נשמר ומה הזכויות שלכם לפי חוק הגנת הפרטיות.",
    indexable: true,
  },
  accessibility: {
    path: "/accessibility",
    title: "הצהרת נגישות | Paragram",
    description:
      "הצהרת הנגישות של Paragram: התאמות הנגישות שביצענו באתר, מה עוד בתהליך, ואיך לפנות אלינו בנושא נגישות.",
    indexable: true,
  },
  notFound: {
    path: "/404",
    title: "הדף לא נמצא | Paragram",
    description: "הדף שחיפשתם לא קיים או שהכתובת השתנתה.",
    indexable: false,
  },
};

function upsertMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

export function applyPageMeta(page: AppPage) {
  const meta = pageMeta[page];
  const url = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;

  document.title = meta.title;
  upsertMeta('meta[name="description"]', "name", "description", meta.description);
  upsertMeta(
    'meta[name="robots"]',
    "name",
    "robots",
    meta.indexable ? "index, follow, max-image-preview:large" : "noindex, follow",
  );
  upsertCanonical(url);
  upsertMeta('meta[property="og:title"]', "property", "og:title", meta.title);
  upsertMeta('meta[property="og:description"]', "property", "og:description", meta.description);
  upsertMeta('meta[property="og:url"]', "property", "og:url", url);
}
