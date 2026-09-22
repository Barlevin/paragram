export const navItems = [
  { label: "מה אנחנו עושים", href: "#services" },
  { label: "פרויקטים", href: "#projects" },
  { label: "מחירים", href: "#pricing" },
  { label: "לקוחות מספרים", href: "#testimonials" },
];

export const services = [
  {
    number: "01",
    title: "עולים לאוויר. מהר.",
    text: "תהליך חד, שקוף ומדויק שמביא את האתר שלכם לאוויר תוך שבועות — לא חודשים.",
  },
  {
    number: "02",
    title: "אנחנו איתכם",
    text: "ליווי אישי, תקשורת בגובה העיניים וזמינות אמיתית. אתם תמיד יודעים איפה הדברים עומדים.",
  },
  {
    number: "03",
    title: "אפיון לפני פיקסלים",
    text: "מזקקים יחד את העסק, הקהל והמטרות. כל מסך וכל משפט נבנים כדי לקדם פעולה.",
  },
  {
    number: "04",
    title: "נראה מעולה. בכל מקום.",
    text: "חוויה מהירה ומדויקת במובייל, בטאבלט ובמחשב — בלי פשרות ובלי הפתעות.",
  },
  {
    number: "05",
    title: "השליטה נשארת אצלכם",
    text: "דשבורד פשוט ונוח לעדכון תוכן, תמונות ומוצרים בלי לחכות למפתח.",
  },
  {
    number: "06",
    title: "גם אחרי ההשקה.",
    text: "עדכונים, שיפורים ותמיכה שוטפת — כדי שהאתר ימשיך לעבוד בשבילכם.",
  },
];

export type Project = {
  title: string;
  category: string;
  image: string;
  url: string;
  /** object-position for the 1.42:1 card crop. Omit to crop from the centre. */
  focus?: string;
};

export const projects: Project[] = [
  { title: "PlayCS", category: "גיימינג", image: "/images/playcs.webp", url: "https://playcs.gg" },
  { title: "Dganit Leon", category: "ספורטותרפיה", image: "/images/dganit.webp", url: "https://dganitleon.co.il", focus: "left center" },
  { title: "DMZ", category: "בדיקות חדירה", image: "/images/dmz.webp", url: "https://dmz.co.il" },
  { title: "Yagel Shukrun", category: "שחקן · יוצר", image: "/images/yagelshukrun.webp", url: "https://yagelshukrun.co.il", focus: "62% center" },
  { title: "Luma", category: "אדריכלות", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85", url: "https://example.com" },
  { title: "Aster", category: "קולינריה", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=85", url: "https://example.com" },
  { title: "Noma", category: "טיפוח", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=85", url: "https://example.com" },
  { title: "North", category: "נדל״ן", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85", url: "https://example.com" },
  { title: "Mika", category: "אופנה", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=85", url: "https://example.com" },
  { title: "Forma", category: "סטודיו לעיצוב", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=85", url: "https://example.com" },
  { title: "Brava", category: "מסעדה", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85", url: "https://example.com" },
  { title: "Pulse", category: "פיטנס", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85", url: "https://example.com" },
  { title: "Alba", category: "מלונאות", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", url: "https://example.com" },
  { title: "Terra", category: "קיימות", image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=85", url: "https://example.com" },
  { title: "Atelier", category: "קרמיקה", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=85", url: "https://example.com" },
  { title: "Sora", category: "טכנולוגיה", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85", url: "https://example.com" },
];

export const plans = [
  {
    name: "אתר One Pager / דף נחיתה",
    description: "מתאים לעסקים שרוצים דף נחיתה או אתר תדמית בעל דף אחד נגלל. כולל עיצוב לוגו מקצועי וכתיבת תוכן.",
    price: "1,800 ₪",
    featured: false,
    features: [
      "דמי הקמה חד פעמיים: 900 ₪",
      "דומיין ואחסון שנתי: 900 ₪",
      "דף אחד נגלל או דף נחיתה",
      "עיצוב לוגו מקצועי וכתיבת תוכן",
    ],
    note: "המחירים לא כוללים מע״מ.",
  },
  {
    name: "אתר מושלם לעסק",
    description: "מתאים לרוב העסקים. אתר עד 20 עמודים ללא סליקת אשראי. כולל עיצוב לוגו וכתיבת תוכן — פשוט אתר מושלם.",
    price: "2,450 ₪",
    featured: true,
    features: [
      "דמי הקמה חד פעמיים: 1,550 ₪",
      "דומיין ואחסון שנתי: 900 ₪",
      "עד 20 עמודים",
      "עיצוב לוגו וכתיבת תוכן",
      "ללא סליקת אשראי",
    ],
    note: "המחירים לא כוללים מע״מ.",
  },
  {
    name: "חנות אינטרנטית / אתר עם סליקה",
    description: "אתר עם סליקת אשראי למכירת מוצרים, מנויים, ניהול תורים ועוד. מתאים לשמש גם כקטלוג עם מערכת קבלת הזמנות.",
    price: "3,750 ₪",
    featured: false,
    features: [
      "דמי הקמה חד פעמיים: 1,950 ₪",
      "דומיין ואחסון שנתי: 1,800 ₪",
      "סליקת אשראי ומכירת מוצרים",
      "מנויים, ניהול תורים וקטלוג הזמנות",
    ],
    note: "המחירים לא כוללים מע״מ.",
  },
];

export const testimonials = [
  {
    quote: "הקהל שלנו חי באינטרנט ומזהה מיד אתר שנראה חצי עבודה. קיבלנו אתר מהיר, נקי ומדויק — שעובד חלק גם כשנכנסים הרבה שחקנים יחד.",
    name: "בר לוין",
    role: "מייסד, PlayCS",
  },
  {
    quote: "מוצר טכני ומורכב היה צריך להיראות פשוט, בעברית ובאנגלית. הם הבינו את התחום לעומק ובנו אתר דו־לשוני שמרגיש טבעי בשני הכיוונים.",
    name: "שלומי אברהם",
    role: "מייסד, DMZ",
  },
  {
    quote: "רציתי אתר שיעביר מקצועיות ויחס אישי, וזה בדיוק מה שיצא. מטופלים מספרים שפנו אליי אחרי שקראו אותו, ואני מעדכנת תכנים בעצמי.",
    name: "דגנית לאון",
    role: "ספורטותרפיסטית",
  },
  {
    quote: "בתחום שלי האתר הוא כרטיס הביקור — הוא נשלח לליהוקים וצריך לעבוד בשנייה הראשונה. יצא קולנועי, מדויק, ונפתח מושלם מכל מכשיר.",
    name: "יגל שוקרון",
    role: "שחקן ויוצר",
  },
];
