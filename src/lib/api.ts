export type Lead = {
  name: string;
  phone: string;
  email: string;
  business: string;
  message: string;
  website?: string;
};

export async function submitLead(lead: Lead) {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  const data = (await response.json()) as { message?: string };
  if (!response.ok) {
    throw new Error(data.message || "לא הצלחנו לשלוח את הפרטים. נסו שוב בעוד רגע.");
  }
  return data;
}
