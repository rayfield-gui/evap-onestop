import { tg, webhookSecret } from "@/lib/telegram/bot";
import { BOTS, botToken } from "@/lib/telegram/brands";

// Open once after deploying to connect the bot to this site:
// https://<site>/api/telegram/<brand>/setup
// Safe to run again; it only points the bot at this same site.
export async function GET(request: Request, { params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const bot = BOTS[brand];
  if (!bot) return Response.json({ ok: false, error: "Unknown brand" }, { status: 404 });
  const token = botToken(bot);
  if (!token) {
    return Response.json({ ok: false, error: `Missing ${bot.tokenEnv} in environment variables` }, { status: 500 });
  }

  const origin = new URL(request.url).origin;
  const url = `${origin}/api/telegram/${brand}`;
  const webhook = await tg(token, "setWebhook", {
    url,
    secret_token: webhookSecret(token),
    allowed_updates: ["message", "callback_query"],
    drop_pending_updates: true,
  });
  const commands = await tg(token, "setMyCommands", {
    commands: [{ command: "start", description: `Open the ${bot.name} menu` }],
  });

  return Response.json({ ok: webhook.ok && commands.ok, webhook: url, details: { webhook, commands } });
}
