// Server-only: forwards a lead to the Google Form so it lands in the shared sheet.
// Used by both the website contact form and the Telegram bot.
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdnbbu87Bn50K1MkwYWgl8DkUznzx8z9tsoiWj8ToggorcW1g/formResponse";

const FIELDS = {
  name: "entry.1267113412",
  phone: "entry.119336941",
  page: "entry.1501824211",
  interest: "entry.667517771",
};

// Must match the Google Form options exactly, including its spelling.
export type LeadInterest = "Retail" | "Wholesale" | "Reseller/Affliates";

export type Lead = { name: string; phone: string; page: string; interest: LeadInterest };

export const PH_MOBILE = /^(\+?63|0)9\d{9}$/;

export function isValidPhone(phone: string) {
  return PH_MOBILE.test(phone.replace(/[\s-]/g, ""));
}

export async function submitLead(lead: Lead): Promise<boolean> {
  const body = new URLSearchParams({
    [FIELDS.name]: lead.name.slice(0, 200),
    [FIELDS.phone]: lead.phone.slice(0, 80),
    [FIELDS.page]: lead.page.slice(0, 500),
    [FIELDS.interest]: lead.interest,
  });
  try {
    const res = await fetch(FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
      redirect: "follow",
    });
    return res.ok;
  } catch {
    return false;
  }
}
