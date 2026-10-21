import { FACEBOOK_URL, INSTAGRAM_URL, TELEGRAM_URL, TIKTOK_URL } from "@/lib/site";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./BrandIcons";

function TelegramIcon({ size }: { size: number }) {
  return <img src="/media/design/telegram.png" alt="" width={size} height={size} style={{ borderRadius: "50%" }} />;
}

const links = [
  { label: "Telegram", href: TELEGRAM_URL, Icon: TelegramIcon },
  { label: "Instagram", href: INSTAGRAM_URL, Icon: InstagramIcon },
  { label: "TikTok", href: TIKTOK_URL, Icon: TikTokIcon },
  { label: "Facebook", href: FACEBOOK_URL, Icon: FacebookIcon },
].filter((l) => l.href);

export function SocialLinks({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`social-row ${className}`}>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-icon social-btn"
          aria-label={label}
          data-tip={label}
          style={{ width: size + 20, height: size + 20 }}
        >
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
}
