import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../index";

let directory: string;

beforeAll(async () => {
  directory = await mkdtemp(path.join(tmpdir(), "paragram-leads-"));
  process.env.LEADS_FILE = path.join(directory, "leads.jsonl");
});

afterAll(async () => {
  delete process.env.LEADS_FILE;
  await rm(directory, { recursive: true, force: true });
});

async function storedLeads() {
  const contents = await readFile(process.env.LEADS_FILE!, "utf8");
  return contents.trim().split("\n").filter(Boolean).map((line) => JSON.parse(line));
}

describe("POST /api/leads", () => {
  it("rejects invalid lead details", async () => {
    const response = await request(app).post("/api/leads").send({
      name: "א",
      phone: "12",
      email: "not-an-email",
    });
    expect(response.status).toBe(400);
  });

  it("persists a valid lead even when email is not configured", async () => {
    const response = await request(app).post("/api/leads").send({
      name: "נועה כהן",
      phone: "0501234567",
      email: "noa@example.com",
      business: "Luma",
      message: "נשמח לאתר חדש",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toMatch(/התקבלה/);

    const leads = await storedLeads();
    expect(leads).toHaveLength(1);
    expect(leads[0]).toMatchObject({
      name: "נועה כהן",
      phone: "0501234567",
      email: "noa@example.com",
      business: "Luma",
    });
    expect(leads[0].receivedAt).toBeTruthy();
  });

  it("silently accepts honeypot submissions without storing them", async () => {
    const response = await request(app).post("/api/leads").send({
      website: "https://spam.example",
    });
    expect(response.status).toBe(200);
    expect(await storedLeads()).toHaveLength(1);
  });
});
