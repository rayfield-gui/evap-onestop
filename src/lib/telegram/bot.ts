import { createHash } from "node:crypto";
import { isValidPhone, submitLead, type LeadInterest } from "@/lib/leads";

export type BrandBot = {
  slug: string;
  name: string;
  emoji: string;
  heart: string;
  // First line of the 21+ check, e.g. "Welcome to The Luxora Court."
  welcome: string;
  tokenEnv: string;
  // Telegram chat ID that receives new-application alerts (get it by sending /myid to the bot).
  adminChatId?: number;
  links: {
    srp: string;
    wholesale: string;
    retail: string;
    // Optional until the brand has its own Shopee store or website; the buttons are hidden without them.
    shopee?: string;
    website?: string;
    team: string;
  };
};

type Kind = "wholesale" | "retail";

const KINDS: Record<Kind, { title: string; interest: LeadInterest; channelLabel: string; blurb: string }> = {
  wholesale: {
    title: "📦 Wholesale application",
    interest: "Wholesale",
    channelLabel: "📦 Join Wholesale channel",
    blurb: "For shops, distributors and bulk buyers: wholesale prices, current stock, minimum orders and restock alerts.",
  },
  retail: {
    title: "🛍️ Retail & Affiliate application",
    interest: "Reseller/Affliates",
    channelLabel: "🛍️ Join Retail & Affiliate channel",
    blurb: "For resellers and affiliates: new drops, promos, and how to earn with us.",
  },
};

type Button = { text: string; callback_data?: string; url?: string };
type Keyboard = Button[][];

type TgUser = { first_name?: string; username?: string };

const TG_USERNAME = /^@?[A-Za-z][A-Za-z0-9_]{4,31}$/;

// Accepts a PH mobile number or a Telegram username; returns the cleaned value or null.
function parseContact(input: string): string | null {
  if (isValidPhone(input)) return input;
  if (TG_USERNAME.test(input)) return input.startsWith("@") ? input : `@${input}`;
  return null;
}
type TgMessage = {
  message_id: number;
  chat: { id: number; type: string };
  from?: TgUser;
  text?: string;
  reply_to_message?: { text?: string };
};
type TgCallback = { id: string; data?: string; message?: TgMessage };
export type TgUpdate = { message?: TgMessage; callback_query?: TgCallback };

export function webhookSecret(token: string) {
  return createHash("sha256").update(`webhook:${token}`).digest("hex").slice(0, 48);
}

export async function tg(token: string, method: string, payload: Record<string, unknown>) {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  return res.json() as Promise<{ ok: boolean; description?: string; result?: unknown }>;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function menuKeyboard(b: BrandBot): Keyboard {
  const shop: Button[] = [];
  if (b.links.shopee) shop.push({ text: "🛒 Shop on Shopee", url: b.links.shopee });
  if (b.links.website) shop.push({ text: "🌐 Website", url: b.links.website });
  return [
    [{ text: "🏷️ SRP – price list", callback_data: "srp" }],
    [{ text: "📦 Wholesale", callback_data: "apply:wholesale" }],
    [{ text: "🛍️ Retail & Affiliate", callback_data: "apply:retail" }],
    ...(shop.length ? [shop] : []),
    [{ text: "💬 Talk to our team", url: b.links.team }],
  ];
}

const back: Button = { text: "⬅️ Back to menu", callback_data: "menu" };

function menuText(b: BrandBot) {
  return [
    `You're in. ${b.heart}`,
    ``,
    `Tell me what you're here for and I'll point you to the right room:`,
    ``,
    `🏷️ <b>SRP</b> – our price list${b.links.shopee ? ", then shop on Shopee" : ""}`,
    `📦 <b>Wholesale</b> – bulk prices and stock lists <i>(quick application)</i>`,
    `🛍️ <b>Retail &amp; Affiliate</b> – resell or earn with ${esc(b.name)} <i>(quick application)</i>`,
  ].join("\n");
}

function ageText(b: BrandBot) {
  return [
    `${b.emoji} <b>${esc(b.welcome)}</b>`,
    ``,
    `Before we let you in, one quick question:`,
    `are you <b>21 years old or above</b>?`,
  ].join("\n");
}

function ageKeyboard(next: string): Keyboard {
  return [
    [
      { text: "✅ Yes, I'm 21+", callback_data: `age:yes:${next}` },
      { text: "❌ No", callback_data: "age:no" },
    ],
  ];
}

const sendText = (token: string, chatId: number, text: string, keyboard?: Keyboard) =>
  tg(token, "sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    ...(keyboard ? { reply_markup: { inline_keyboard: keyboard } } : {}),
  });

const editText = (token: string, msg: TgMessage, text: string, keyboard?: Keyboard) =>
  tg(token, "editMessageText", {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    ...(keyboard ? { reply_markup: { inline_keyboard: keyboard } } : {}),
  });

// The application is stateless: each question carries the earlier answers in its
// own text, and the user's reply quotes it, so no database is needed.
function askStep(token: string, chatId: number, kind: Kind, step: 1 | 2 | 3, known: { name?: string; phone?: string }, warning?: string) {
  const k = KINDS[kind];
  const lines = [k.title];
  if (warning) lines.push(`⚠️ ${warning}`);
  if (known.name) lines.push(`Name: ${known.name}`);
  if (known.phone) lines.push(`Contact: ${known.phone}`);
  const prompts = {
    1: ["Step 1 of 3 — What's your full name?", "Full name"],
    2: ["Step 2 of 3 — Your mobile number or Telegram username (e.g. 0917 123 4567 or @yourname)", "Mobile or @username"],
    3: ['Step 3 of 3 — Your business page (Facebook or Shopee link). Type "skip" if you don\'t have one.', "Link or skip"],
  } as const;
  lines.push(prompts[step][0]);
  return tg(token, "sendMessage", {
    chat_id: chatId,
    text: lines.join("\n"),
    reply_markup: { force_reply: true, input_field_placeholder: prompts[step][1] },
  });
}

function parseStep(text: string): { kind: Kind; step: number; name?: string; phone?: string } | null {
  const kind = (Object.keys(KINDS) as Kind[]).find((k) => text.startsWith(KINDS[k].title));
  const step = text.match(/Step (\d) of 3/);
  if (!kind || !step) return null;
  const field = (label: string) => text.match(new RegExp(`^${label}: (.+)$`, "m"))?.[1]?.trim();
  return { kind, step: Number(step[1]), name: field("Name"), phone: field("Contact") };
}

async function showSection(token: string, b: BrandBot, msg: TgMessage, section: string) {
  if (section === "srp") {
    const keyboard: Keyboard = [[{ text: "🏷️ Join SRP channel", url: b.links.srp }]];
    if (b.links.shopee) keyboard.push([{ text: "🛒 Shop on Shopee", url: b.links.shopee }]);
    keyboard.push([back]);
    return editText(
      token,
      msg,
      [
        `🏷️ <b>${esc(b.name)} SRP</b>`,
        ``,
        `Our official suggested retail prices for every product and flavor.`,
        b.links.shopee
          ? `Join the channel for the latest price list, then order on our Shopee store.`
          : `Join the channel for the latest price list and how to order.`,
      ].join("\n"),
      keyboard,
    );
  }
  if (section === "apply:wholesale" || section === "apply:retail") {
    const kind = section.split(":")[1] as Kind;
    await editText(
      token,
      msg,
      [`<b>${KINDS[kind].title}</b>`, ``, KINDS[kind].blurb, ``, `Answer 3 quick questions and I'll send you the channel link.`].join("\n"),
      [[back]],
    );
    return askStep(token, msg.chat.id, kind, 1, {});
  }
  return editText(token, msg, menuText(b), menuKeyboard(b));
}

export type LeadAlert = {
  interest: string;
  name: string;
  contact: string;
  page: string;
  telegram?: string;
  source: "Telegram bot" | "Website form";
};

// Sends a new-lead alert to the brand admin's Telegram. Silently skipped when not configured.
export async function notifyAdmin(b: BrandBot, token: string, lead: LeadAlert) {
  if (!b.adminChatId) return;
  const lines = [
    `🆕 <b>New ${esc(lead.interest)} application — ${esc(b.name.toUpperCase())}</b>`,
    ``,
    `👤 ${esc(lead.name)}`,
    `📞 ${esc(lead.contact)}`,
  ];
  if (lead.telegram) lines.push(`💬 ${esc(lead.telegram)}`);
  if (lead.page) lines.push(`🔗 ${esc(lead.page)}`);
  lines.push(``, `<i>Source: ${lead.source}</i>`);
  await tg(token, "sendMessage", {
    chat_id: b.adminChatId,
    text: lines.join("\n"),
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

export async function handleUpdate(b: BrandBot, token: string, update: TgUpdate) {
  const cb = update.callback_query;
  if (cb?.message) {
    await tg(token, "answerCallbackQuery", { callback_query_id: cb.id });
    const data = cb.data ?? "";
    if (data === "age:no") {
      return editText(token, cb.message, `Sorry, our channels are for adults 21 and above only. Come back when you're of age. ${b.emoji}`);
    }
    if (data.startsWith("age:yes")) {
      const next = data.split(":").slice(2).join(":") || "menu";
      return showSection(token, b, cb.message, next);
    }
    return showSection(token, b, cb.message, data);
  }

  const msg = update.message;
  if (!msg?.text || msg.chat.type !== "private") return;
  const text = msg.text.trim();

  if (text === "/myid") {
    return sendText(token, msg.chat.id, `Your chat ID is <code>${msg.chat.id}</code>`);
  }

  const replyTo = msg.reply_to_message?.text;
  const state = replyTo ? parseStep(replyTo) : null;
  if (state) {
    const { kind } = state;
    if (state.step === 1) {
      if (text.length < 2 || text.length > 80) return askStep(token, msg.chat.id, kind, 1, {}, "Please enter your full name.");
      return askStep(token, msg.chat.id, kind, 2, { name: text });
    }
    if (state.step === 2) {
      const contact = parseContact(text);
      if (!contact)
        return askStep(token, msg.chat.id, kind, 2, { name: state.name }, "Enter a PH mobile number or a Telegram username.");
      return askStep(token, msg.chat.id, kind, 3, { name: state.name, phone: contact });
    }
    if (state.step === 3) {
      const page = /^skip$/i.test(text) ? "" : text.slice(0, 500);
      // Always keep the applicant's Telegram handle so staff can reach them there too.
      const handle = msg.from?.username ? `@${msg.from.username}` : "";
      const contact = state.phone ?? "";
      const phone = handle && contact.toLowerCase() !== handle.toLowerCase() ? `${contact} (TG ${handle})` : contact;
      const ok = await submitLead({ brand: b.name, name: state.name ?? "", phone, page, interest: KINDS[kind].interest });
      if (!ok) {
        return sendText(
          token,
          msg.chat.id,
          "Sorry, we couldn't save your application right now. Please try again in a few minutes, or message our team.",
          [[{ text: "💬 Message our team", url: b.links.team }], [back]],
        );
      }
      await notifyAdmin(b, token, {
        interest: kind === "wholesale" ? "Wholesale" : "Retail & Affiliate",
        name: state.name ?? "",
        contact: contact,
        page,
        telegram: handle,
        source: "Telegram bot",
      }).catch(() => {});
      const link = kind === "wholesale" ? b.links.wholesale : b.links.retail;
      return sendText(
        token,
        msg.chat.id,
        [`✅ <b>Thanks, ${esc(state.name ?? "")}!</b>`, ``, `You're all set. Tap below to join the channel. Our team may also reach out to your number.`].join("\n"),
        [[{ text: KINDS[kind].channelLabel, url: link }], [back]],
      );
    }
  }

  // /start (optionally with a deep-link section like "wholesale") or any other text.
  const param = text.startsWith("/start") ? text.split(/\s+/)[1] ?? "" : "";
  const next = param === "srp" ? "srp" : param === "wholesale" ? "apply:wholesale" : param === "retail" ? "apply:retail" : "menu";
  return sendText(token, msg.chat.id, ageText(b), ageKeyboard(next));
}
