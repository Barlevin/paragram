"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Ltr } from "@/components/ui/Ltr";

/**
 * Route error boundary. Client component by requirement — Next.js error
 * boundaries must be client components.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the digest only. The error may reference user-entered data, which
    // must never reach a log or a third party.
    console.error("Route error", error.digest ?? "(no digest)");
  }, [error]);

  return (
    <main
      id="main"
      className="container-content grid min-h-[80svh] content-center py-32"
    >
      <MonoLabel>שגיאה</MonoLabel>

      <h1 className="text-display-lg mt-4">משהו נשבר כאן</h1>

      <p className="measure text-body-lg text-text-secondary mt-5">
        זו תקלה אצלי, לא אצלכם. אפשר לנסות לטעון את הדף מחדש. אם זה חוזר, אשמח
        שתספרו לי — זה יעזור לי לתקן את זה מהר.
      </p>

      {error.digest ? (
        <p className="text-body-sm text-text-tertiary mt-3">
          מזהה התקלה: <Ltr>{error.digest}</Ltr>
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={reset}>ניסיון נוסף</Button>
        <Button href="/" variant="secondary">
          חזרה לעמוד הבית
        </Button>
      </div>
    </main>
  );
}
