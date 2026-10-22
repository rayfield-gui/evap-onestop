import { SHOPEE_STORE } from "@/lib/products";
import type { BrandBot } from "./bot";

export const BOTS: Record<string, BrandBot> = {
  phanter: {
    slug: "phanter",
    name: "Phanter",
    emoji: "🐆",
    heart: "🖤",
    welcome: "Good evening, and welcome to The Phanter Society.",
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
  luxora: {
    slug: "luxora",
    name: "Luxora",
    emoji: "🦀",
    heart: "🤍",
    welcome: "Welcome to The Luxora Court.",
    tokenEnv: "TELEGRAM_BOT_TOKEN_LUXORA",
    adminChatId: 8654100792, // @PhanterSociety
    links: {
      srp: "https://t.me/+uLj3KsGvUtFmYzM1",
      wholesale: "https://t.me/+cXfZlhQ0V78yZDg1",
      retail: "https://t.me/+tegegD2z9d01MTY9",
      shopee: "https://shopee.ph/astrionzodiac#product_list",
      website: "https://evap-luxora.vercel.app",
      team: "https://t.me/PhanterSociety",
    },
  },
  aerovox: {
    slug: "aerovox",
    name: "Aerovox",
    emoji: "🦁",
    heart: "🖤",
    welcome: "Welcome to The Aerovox Pride.",
    tokenEnv: "TELEGRAM_BOT_TOKEN_AEROVOX",
    adminChatId: 8654100792, // @PhanterSociety
    links: {
      srp: "https://t.me/+sw5UTSdaML43NWZl",
      wholesale: "https://t.me/+ycsZr4WXkvkwY2Q1",
      retail: "https://t.me/+rvR521NuSw81MWY1",
      // TODO: Aerovox Shopee store link. The Shopee buttons stay hidden until this is set.
      // shopee: "https://shopee.ph/<aerovox-store>#product_list",
      website: "https://evap-aerovox.vercel.app",
      team: "https://t.me/PhanterSociety",
    },
  },
};

export function botToken(b: BrandBot) {
  return process.env[b.tokenEnv];
}
