import { SHOPEE_STORE } from "@/lib/products";
import type { BrandBot } from "./bot";

export const BOTS: Record<string, BrandBot> = {
  phanter: {
    slug: "phanter",
    name: "Phanter",
    emoji: "🐆",
    tokenEnv: "TELEGRAM_BOT_TOKEN_PHANTER",
    adminChatId: 8654100792, // @PhanterSociety
    links: {
      srp: "https://t.me/+sxM3yQ5wq9dhZjBl",
      wholesale: "https://t.me/+7l8h2vyJ6cMxOTll",
      retail: "https://t.me/+SMe-JQ-Qk5M4ZWI1",
      shopee: SHOPEE_STORE,
      website: "https://evap-onestop.vercel.app",
      team: "https://t.me/PhanterSociety",
    },
  },
};

export function botToken(b: BrandBot) {
  return process.env[b.tokenEnv];
}
