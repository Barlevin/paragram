import { Button } from "@/components/ui/Button";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Ltr } from "@/components/ui/Ltr";
import { whatsappHref } from "@/content/site";

export const metadata = {
  title: "הדף לא נמצא",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="container-content grid min-h-[80svh] content-center py-32"
    >
      <MonoLabel>
        שגיאה <Ltr>404</Ltr>
      </MonoLabel>

      <h1 className="text-display-lg mt-4">הדף הזה לא קיים</h1>

      <p className="measure text-body-lg text-text-secondary mt-5">
        כנראה שהקישור שהגעתם ממנו שבור, או שהדף הוסר. אפשר לחזור לעמוד הבית, או
        לכתוב לי ואמצא לכם את מה שחיפשתם.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">חזרה לעמוד הבית</Button>
        <Button href={whatsappHref} external variant="secondary">
          כתבו לי ב-WhatsApp
        </Button>
      </div>
    </main>
  );
}
