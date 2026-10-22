import { createHash } from "node:crypto";
import { isValidPhone, submitLead, type LeadInterest } from "@/lib/leads";

export type BrandBot = {
  slug: string;
  name: string;
  emoji: string;
  heart: string;
  // The community name used in the greeting, e.g. "Court" for "Welcome sa The Luxora Court, Boss!"
  circle: string;
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

// The titles and the "Step N of 3" / "Name:" / "Contact:" markers are parsed back from
// the user's reply (see parseStep), so keep them stable when editing the copy.
const KINDS: Record<Kind, { title: string; interest: LeadInterest; channelLabel: string; blurb: (brand: string) => string[] }> = {
  wholesale: {
    title: "📦 Wholesale application",
    interest: "Wholesale",
    channelLabel: "📦 Sumali sa Wholesale channel",
    blurb: () => [
      `Para sa shops, distributors at bulk buyers.`,
      ``,
      `Pagkapasok mo, makukuha mo ang:`,
      `• Wholesale price list`,
      `• Current stock at minimum order quantity`,
      `• Restock alerts — ikaw ang unang makakaalam`,
    ],
  },
  retail: {
    title: "🛍️ Retail & Affiliate application",
    interest: "Reseller/Affliates",
    channelLabel: "🛍️ Sumali sa Retail & Affiliate channel",
    blurb: (brand) => [
      `Para sa resellers at affiliates na gustong kumita kasama ang ${brand}.`,
      ``,
      `Pagkapasok mo, makukuha mo ang:`,
      `• Bagong drops bago pa sa iba`,
      `• Promos na puwede mong i-share sa buyers mo`,
      `• Product photos at info para sa selling`,
      `• Updates sa affiliate program`,
    ],
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
  if (b.links.shopee) shop.push({ text: "🛒 Shopee", url: b.links.shopee });
  if (b.links.website) shop.push({ text: "🌐 Website", url: b.links.website });
  return [
    [{ text: "🏷️ SRP – Price List", callback_data: "srp" }],
    [{ text: "📦 Wholesale", callback_data: "apply:wholesale" }],
    [{ text: "🛍️ Retail & Affiliate", callback_data: "apply:retail" }],
    ...(shop.length ? [shop] : []),
    [{ text: "💬 Kausapin ang Team", url: b.links.team }],
  ];
}

const back: Button = { text: "⬅️ Balik sa menu", callback_data: "menu" };

function menuText(b: BrandBot) {
  return [
    `<b>Pasok ka na, Boss!</b> ${b.heart}`,
    ``,
    `Ano ang hanap mo ngayon? Piliin lang sa baba at ituturo kita sa tamang channel:`,
    ``,
    `🏷️ <b>SRP – Price List</b>`,
    `Official na presyo ng bawat product at flavor.${b.links.shopee ? " Diretso ka nang mag-order sa Shopee store namin." : ""}`,
    ``,
    `📦 <b>Wholesale</b>`,
    `Para sa shops, distributors at bulk buyers: wholesale prices, stock list, minimum order at restock alerts. <i>May maikling application (3 tanong lang).</i>`,
    ``,
    `🛍️ <b>Retail &amp; Affiliate</b>`,
    `Para sa gustong mag-resell o kumita bilang affiliate ng ${esc(b.name)}: bagong drops, promos at selling materials. <i>May maikling application (3 tanong lang).</i>`,
    ``,
    `💬 May tanong o special order? Pindutin ang <b>Kausapin ang Team</b>.`,
  ].join("\n");
}

function ageText(b: BrandBot) {
  return [
    `${b.emoji} <b>Welcome sa The ${esc(b.name)} ${esc(b.circle)}, Boss!</b>`,
    ``,
    `Ako ang official concierge ng ${esc(b.name)}. Ako ang gagabay sa'yo papunta sa tamang channel, price list man, wholesale, o pagiging reseller.`,
    ``,
    `Bago tayo tumuloy, isang mabilis na tanong lang:`,
    `<b>21 years old ka na ba o pataas?</b>`,
    ``,
    `<i>Para sa adults 21+ lang ang lahat ng channels namin.</i>`,
  ].join("\n");
}

function ageKeyboard(next: string): Keyboard {
  return [
    [
      { text: "✅ Oo, 21+ na ako", callback_data: `age:yes:${next}` },
      { text: "❌ Hindi pa", callback_data: "age:no" },
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
    1: ["Step 1 of 3 — Ano ang buong pangalan mo, Boss?", "Buong pangalan"],
    2: ["Step 2 of 3 — Mobile number o Telegram username mo? (hal. 0917 123 4567 o @username)", "Mobile o @username"],
    3: ['Step 3 of 3 — Link ng business page mo (Facebook o Shopee). Kung wala pa, i-type lang ang "skip".', "Link o skip"],
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
    const keyboard: Keyboard = [[{ text: "🏷️ Sumali sa SRP channel", url: b.links.srp }]];
    if (b.links.shopee) keyboard.push([{ text: "🛒 Mag-order sa Shopee", url: b.links.shopee }]);
    keyboard.push([back]);
    const howTo = b.links.shopee
      ? [
          `1. Sumali sa SRP channel at silipin ang presyo at flavor`,
          `2. Mag-checkout sa official Shopee store namin`,
          `3. Piliin ang variation na tugma sa flavor mo`,
          ``,
          `Walang kaba, Boss: Shopee ang bahala sa bayad at delivery mo.`,
        ]
      : [`Sumali sa SRP channel para sa presyo, tapos i-message ang team namin para sa order mo.`];
    return editText(
      token,
      msg,
      [
        `🏷️ <b>${esc(b.name)} SRP – Official Price List</b>`,
        ``,
        `Dito mo makikita ang suggested retail price (SRP) ng bawat product at flavor namin, pati bagong flavors, restock at promos.`,
        ``,
        `🛒 <b>Paano umorder?</b>`,
        ...howTo,
      ].join("\n"),
      keyboard,
    );
  }
  if (section === "apply:wholesale" || section === "apply:retail") {
    const kind = section.split(":")[1] as Kind;
    await editText(
      token,
      msg,
      [
        `<b>${KINDS[kind].title}</b>`,
        ``,
        ...KINDS[kind].blurb(esc(b.name)),
        ``,
        `Sagutin lang ang <b>3 mabilis na tanong</b>, Boss, at ibibigay ko agad ang link ng channel.`,
        `🔒 Ang team lang namin ang makakakita ng sagot mo.`,
      ].join("\n"),
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
      return editText(
        token,
        cb.message,
        `Pasensya na, Boss. Para sa 21 years old pataas lang ang channels namin. Balik ka na lang kapag nasa tamang edad ka na. ${b.emoji}`,
      );
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
      if (text.length < 2 || text.length > 80) return askStep(token, msg.chat.id, kind, 1, {}, "Pakilagay ang buong pangalan mo, Boss.");
      return askStep(token, msg.chat.id, kind, 2, { name: text });
    }
    if (state.step === 2) {
      const contact = parseContact(text);
      if (!contact)
        return askStep(
          token,
          msg.chat.id,
          kind,
          2,
          { name: state.name },
          "Hindi ko nabasa 'yan, Boss. Maglagay ng PH mobile number (hal. 0917 123 4567) o Telegram username (hal. @username).",
        );
      return askStep(token, msg.chat.id, kind, 3, { name: state.name, phone: contact });
    }
    if (state.step === 3) {
      const page = /^(skip|wala|none)$/i.test(text) ? "" : text.slice(0, 500);
      // Always keep the applicant's Telegram handle so staff can reach them there too.
      const handle = msg.from?.username ? `@${msg.from.username}` : "";
      const contact = state.phone ?? "";
      const phone = handle && contact.toLowerCase() !== handle.toLowerCase() ? `${contact} (TG ${handle})` : contact;
      const ok = await submitLead({ brand: b.name, name: state.name ?? "", phone, page, interest: KINDS[kind].interest });
      if (!ok) {
        return sendText(
          token,
          msg.chat.id,
          "Pasensya na, Boss, hindi na-save ang application mo ngayon. Subukan ulit pagkalipas ng ilang minuto, o i-message diretso ang team namin.",
          [[{ text: "💬 I-message ang Team", url: b.links.team }], [back]],
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
        [
          `✅ <b>Salamat, ${esc(state.name ?? "")}! Pasok ka na, Boss.</b>`,
          ``,
          `Natanggap na ng team namin ang application mo. Pindutin ang button sa baba para sumali sa channel.`,
          ``,
          `📌 Pagkapasok, basahin muna ang <b>"Sistema Natin"</b> sa pinned posts. Nandoon ang buong proseso ng order, bayad at delivery.`,
          ``,
          `Puwede ka ring i-message o tawagan ng team namin para i-verify ang details mo.`,
        ].join("\n"),
        [[{ text: KINDS[kind].channelLabel, url: link }], [back]],
      );
    }
  }

  // /start (optionally with a deep-link section like "wholesale") or any other text.
  const param = text.startsWith("/start") ? text.split(/\s+/)[1] ?? "" : "";
  const next = param === "srp" ? "srp" : param === "wholesale" ? "apply:wholesale" : param === "retail" ? "apply:retail" : "menu";
  return sendText(token, msg.chat.id, ageText(b), ageKeyboard(next));
}
