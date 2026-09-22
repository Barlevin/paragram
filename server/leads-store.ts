import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));

export type StoredLead = {
  name: string;
  phone: string;
  email: string;
  business: string;
  message: string;
};

/** Resolved per call so tests and deployments can redirect the file. */
export function leadsFilePath() {
  return process.env.LEADS_FILE || path.resolve(serverDirectory, "../data/leads.jsonl");
}

/**
 * Appends the lead to disk before any delivery is attempted, so a mail
 * outage can never turn into a lost enquiry.
 */
export async function appendLead(lead: StoredLead) {
  const file = leadsFilePath();
  await mkdir(path.dirname(file), { recursive: true });
  const record = { receivedAt: new Date().toISOString(), ...lead };
  await appendFile(file, `${JSON.stringify(record)}\n`, "utf8");
  return file;
}
