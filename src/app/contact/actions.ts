"use server";

import { INTERESTS, type ContactState } from "@/lib/contact";
import { isValidPhone, submitLead, type LeadInterest } from "@/lib/leads";

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
  if (!isValidPhone(values.phone)) fieldErrors.phone = "Enter a valid PH mobile number, like 0917 123 4567.";
  const interest = INTERESTS.find((i) => i.value === values.interest);
  if (!interest) fieldErrors.interest = "Choose what you're interested in.";
  if (Object.keys(fieldErrors).length) return { fieldErrors, values };

  const ok = await submitLead({ ...values, interest: interest!.value as LeadInterest });
  if (!ok) {
    return {
      error: "We couldn't send your details right now. Please try again, or message us on Telegram.",
      values,
    };
  }

  return { success: { interest: interest!.slug } };
}
