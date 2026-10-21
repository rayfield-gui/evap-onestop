import { MESSENGER_URL } from "@/lib/site";
import { MessengerIcon } from "./BrandIcons";

export function ChatWidget() {
  return (
    <a
      href={MESSENGER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="chat-widget"
      aria-label="Chat with us on Messenger"
      title="Chat with us on Messenger"
    >
      <span className="chat-widget-label">Chat with us</span>
      <span className="chat-widget-btn">
        <span className="chat-widget-ring" aria-hidden />
        <MessengerIcon size={30} />
      </span>
    </a>
  );
}
