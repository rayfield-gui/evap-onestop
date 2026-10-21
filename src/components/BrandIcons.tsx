import { useId } from "react";

type Props = { size?: number };

export function InstagramIcon({ size = 22 }: Props) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="30%" cy="107%" r="150%">
          <stop offset="0" stopColor="#fdf497" />
          <stop offset="0.05" stopColor="#fdf497" />
          <stop offset="0.45" stopColor="#fd5949" />
          <stop offset="0.6" stopColor="#d6249f" />
          <stop offset="0.9" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill={`url(#${id})`} />
      <rect x="7" y="7" width="18" height="18" rx="5.5" fill="none" stroke="#fff" strokeWidth="2.2" />
      <circle cx="16" cy="16" r="4.4" fill="none" stroke="#fff" strokeWidth="2.2" />
      <circle cx="21.6" cy="10.4" r="1.4" fill="#fff" />
    </svg>
  );
}

export function TikTokIcon({ size = 22 }: Props) {
  const note =
    "M18.6 6h3.1c.3 2.3 1.8 4 4 4.3v3.1c-1.5 0-2.9-.4-4-1.2v6.6c0 3.6-2.9 6.2-6.3 6.2S9.1 22.4 9.1 19c0-3.6 3.1-6.4 6.8-6v3.2c-1.9-.4-3.6.9-3.6 2.8 0 1.6 1.3 2.9 3 2.9 1.8 0 3.3-1.3 3.3-3.5V6z";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#000" />
      <path d={note} fill="#25F4EE" transform="translate(-0.9 -0.6)" />
      <path d={note} fill="#FE2C55" transform="translate(0.9 0.6)" />
      <path d={note} fill="#fff" />
    </svg>
  );
}

export function MessengerIcon({ size = 22 }: Props) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="20%" cy="100%" r="120%">
          <stop offset="0" stopColor="#0099FF" />
          <stop offset="0.6" stopColor="#A033FF" />
          <stop offset="0.9" stopColor="#FF5280" />
          <stop offset="1" stopColor="#FF7061" />
        </radialGradient>
      </defs>
      <path
        d="M16 2C8.3 2 2.3 7.6 2.3 15.2c0 4 1.6 7.4 4.3 9.8.2.2.4.5.4.8l.1 2.4c0 .8.8 1.3 1.6 1l2.7-1.2c.2-.1.5-.1.8 0 1.2.3 2.5.5 3.8.5 7.7 0 13.7-5.6 13.7-13.2S23.7 2 16 2z"
        fill={`url(#${id})`}
      />
      <path d="M7.8 19.2l4-6.4c.6-1 2-1.3 3-.6l3.2 2.4c.3.2.7.2 1 0l4.3-3.3c.6-.4 1.3.3.9.9l-4 6.4c-.6 1-2 1.3-3 .6l-3.2-2.4c-.3-.2-.7-.2-1 0l-4.3 3.3c-.6.4-1.3-.3-.9-.9z" fill="#fff" />
    </svg>
  );
}

export function FacebookIcon({ size = 22 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#1877F2" />
      <path
        d="M22.2 20.6l.7-4.6h-4.4v-3c0-1.3.6-2.5 2.6-2.5h2V6.6s-1.8-.3-3.6-.3c-3.6 0-6 2.2-6 6.2V16h-4v4.6h4V32a16 16 0 0 0 5 0V20.6h3.7z"
        fill="#fff"
      />
    </svg>
  );
}
