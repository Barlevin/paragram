import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/styles/fonts";
import { site } from "@/content/site";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `בניית אתרים בהתאמה אישית | ${site.businessName}`,
    template: `%s | ${site.businessName}`,
  },
  description:
    "מפתח Full Stack עם 8 שנות ניסיון בונה אתרים מותאמים אישית לעסקים בישראל. תכנון, עיצוב ופיתוח — הכול ישירות איתי, בלי תבניות ובלי מתווכים.",
  applicationName: site.businessName,
  formatDetection: {
    // Stops iOS from turning Hebrew-adjacent digit strings into phone links.
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: site.businessName,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F6F3EE",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
