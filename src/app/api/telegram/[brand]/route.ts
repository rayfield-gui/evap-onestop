import { handleUpdate, webhookSecret, type TgUpdate } from "@/lib/telegram/bot";
import { BOTS, botToken } from "@/lib/telegram/brands";

// Telegram calls this for every message or button press sent to the brand's bot.
export async function POST(request: Request, { params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const bot = BOTS[brand];
  const token = bot && botToken(bot);
  if (!bot || !token) return new Response("Not found", { status: 404 });

  if (request.headers.get("x-telegram-bot-api-secret-token") !== webhookSecret(token)) {
    return new Response("Forbidden", { status: 403 });
  }

  const update = (await request.json()) as TgUpdate;
  try {
    await handleUpdate(bot, token, update);
  } catch (err) {
    console.error(`telegram ${brand} update failed`, err);
  }
  // Always 200 so Telegram doesn't retry the same update forever.
  return Response.json({ ok: true });
}
