import compression from "compression";
import "dotenv/config";
import express, { type NextFunction, type Request, type Response } from "express";
import { rateLimit } from "express-rate-limit";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resend } from "resend";
import { appendLead, type StoredLead } from "./leads-store";

export const app = express();
const isTest = process.env.NODE_ENV === "test";

app.disable("x-powered-by");
// Behind a proxy or CDN every visitor arrives with the same remote address,
// which would make the rate limiter lock out real customers.
if (process.env.TRUST_PROXY) {
  const hops = Number(process.env.TRUST_PROXY);
  app.set("trust proxy", Number.isNaN(hops) ? process.env.TRUST_PROXY : hops);
}
app.use(compression());
app.use(express.json({ limit: "20kb", strict: true }));

const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: isTest ? 1000 : 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "נשלחו יותר מדי פניות. נסו שוב בעוד מספר דקות." },
});

type LeadBody = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  business?: unknown;
  message?: unknown;
  website?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Returns true only when Resend confirmed the handoff. Never throws: the lead
 * is already on disk by this point, so a mail failure must not fail the request.
 */
async function notifyStudio(lead: StoredLead) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.LEADS_TO;
  if (!apiKey || !recipient) return false;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.MAIL_FROM || "Paragram Website <onboarding@resend.dev>",
      to: recipient,
      replyTo: lead.email,
      subject: `פנייה חדשה מהאתר — ${lead.name}`,
      text: [
        `שם: ${lead.name}`,
        `טלפון: ${lead.phone}`,
        `אימייל: ${lead.email}`,
        `עסק: ${lead.business || "לא צוין"}`,
        "",
        lead.message || "לא צורפה הודעה",
      ].join("\n"),
    });

    if (error) {
      console.error("Resend rejected the lead email", error.message);
      return false;
    }
    return true;
  } catch (caught) {
    console.error("Lead email failed", caught instanceof Error ? caught.message : "Unknown error");
    return false;
  }
}

app.post("/api/leads", leadLimiter, async (request: Request<object, object, LeadBody>, response) => {
  if (clean(request.body.website, 200)) {
    response.status(200).json({ message: "הפנייה התקבלה." });
    return;
  }

  const lead: StoredLead = {
    name: clean(request.body.name, 80),
    phone: clean(request.body.phone, 30),
    email: clean(request.body.email, 120).toLowerCase(),
    business: clean(request.body.business, 120),
    message: clean(request.body.message, 1500),
  };

  if (lead.name.length < 2 || lead.phone.replace(/\D/g, "").length < 7 || !isValidEmail(lead.email)) {
    response.status(400).json({ message: "נא למלא שם, טלפון ואימייל תקינים." });
    return;
  }

  // Persist before promising anything. If this throws the visitor gets a real
  // error instead of a success message for an enquiry nobody will ever see.
  const file = await appendLead(lead);

  const emailed = await notifyStudio(lead);
  if (!emailed && !isTest) {
    console.warn(`Lead saved to ${file} but no email was sent. Check RESEND_API_KEY and LEADS_TO.`);
  }

  response.status(201).json({ message: "הפנייה התקבלה. נחזור אליכם בקרוב." });
});

app.use("/api", (_request, response) => {
  response.status(404).json({ message: "הכתובת לא נמצאה." });
});

const prerenderedPages = new Map([
  ["/", "index.html"],
  ["/privacy", "privacy.html"],
  ["/accessibility", "accessibility.html"],
]);

if (process.env.NODE_ENV === "production") {
  const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
  const dist = path.resolve(currentDirectory, "../dist");
  app.use(express.static(dist, { maxAge: "1d", index: false }));
  app.get("/{*splat}", (request, response) => {
    const pathname = request.path.length > 1 ? request.path.replace(/\/$/, "") : request.path;
    const page = prerenderedPages.get(pathname);
    // Unknown paths must answer 404 so search engines don't index soft error pages.
    response.status(page ? 200 : 404).sendFile(path.join(dist, page ?? "404.html"));
  });
}

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  void _next;
  console.error("Request failed", error instanceof Error ? error.message : "Unknown error");
  response.status(500).json({ message: "לא הצלחנו לשלוח את הפנייה. נסו שוב מאוחר יותר." });
});

if (!isTest) {
  const port = Number(process.env.PORT || 8787);
  app.listen(port, () => console.info(`Paragram server listening on http://localhost:${port}`));
}
