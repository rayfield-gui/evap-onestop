"use server";

import { INTERESTS, type ContactState } from "@/lib/contact";

// Submissions are forwarded server-side, so the browser never talks to Google.
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdnbbu87Bn50K1MkwYWgl8DkUznzx8z9tsoiWj8ToggorcW1g/formResponse";

const FIELDS = {
  name: "entry.1267113412",
  phone: "entry.119336941",
  page: "entry.1501824211",
  interest: "entry.667517771",
};

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    page: String(formData.get("page") ?? "").trim(),
    interest: String(formData.get("interest") ?? ""),
  };

  // Honeypot: real visitors never see or fill this field. Bots get a fake success.
  if (String(formData.get("website") ?? "")) return { success: { interest: "retail" } };

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (values.name.length < 2) fieldErrors.name = "Enter your full name.";
  if (!/^(\+?63|0)9\d{9}$/.test(values.phone.replace(/[\s-]/g, "")))
    fieldErrors.phone = "Enter a valid PH mobile number, like 0917 123 4567.";
  const interest = INTERESTS.find((i) => i.value === values.interest);
  if (!interest) fieldErrors.interest = "Choose what you're interested in.";
  if (Object.keys(fieldErrors).length) return { fieldErrors, values };

  const body = new URLSearchParams({
    [FIELDS.name]: values.name.slice(0, 200),
    [FIELDS.phone]: values.phone.slice(0, 40),
    [FIELDS.page]: values.page.slice(0, 500),
    [FIELDS.interest]: values.interest,
  });

  let ok = false;
  try {
    const res = await fetch(FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
      redirect: "follow",
    });
    ok = res.ok;
  } catch {
    ok = false;
  }

  if (!ok) {
    return {
      error: "We couldn't send your details right now. Please try again, or message us on Telegram.",
      values,
    };
  }

  return { success: { interest: interest!.slug } };
}
