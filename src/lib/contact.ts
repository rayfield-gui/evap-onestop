// Values must match the Google Form options exactly, including its spelling.
export const INTERESTS = [
  { value: "Retail", label: "Retail", slug: "retail" },
  { value: "Wholesale", label: "Wholesale", slug: "wholesale" },
  { value: "Reseller/Affliates", label: "Reseller / Affiliate", slug: "reseller" },
] as const;

export type ContactState = {
  success?: { interest: (typeof INTERESTS)[number]["slug"] };
  error?: string;
  fieldErrors?: Partial<Record<"name" | "phone" | "interest", string>>;
  values?: { name: string; phone: string; page: string; interest: string };
};
