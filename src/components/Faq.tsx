"use client";

import { useState, type ReactNode } from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import { PHONE, TELEGRAM_GROUPS } from "@/lib/site";

const [RETAIL_TG, WHOLESALE_TG, RESELLER_TG] = TELEGRAM_GROUPS;

function Tg({ group, children }: { group: { href: string }; children: ReactNode }) {
  return (
    <a href={group.href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "Who can order?",
    a: (
      <>
        Anyone 21 or older. Buy a few pieces through our Shopee store, or buy in bulk at wholesale prices through our{" "}
        <Tg group={WHOLESALE_TG}>Wholesale Telegram group</Tg>.
      </>
    ),
  },
  {
    q: "How do I order?",
    a: "Tap a product here and pick your flavor, then tap Order on Shopee. On Shopee, choose the variation with the same code as your flavor (for example PINK5), add it to your cart and check out.",
  },
  {
    q: "Why does Shopee show a different product?",
    a: "Shopee doesn't allow vape listings, so our Shopee page shows a different item. You'll still get the product you picked on this site. Just make sure the variation code matches your flavor.",
  },
  {
    q: "How do I get wholesale prices?",
    a: (
      <>
        Join our <Tg group={WHOLESALE_TG}>Wholesale Telegram group</Tg>. Wholesale prices, available stock and minimum
        orders are posted there, and you can order directly with us.
      </>
    ),
  },
  {
    q: "Can I become a reseller or affiliate?",
    a: (
      <>
        Yes. Join our <Tg group={RESELLER_TG}>Reseller &amp; Affiliate Telegram group</Tg> to see how it works and
        start selling with us.
      </>
    ),
  },
  {
    q: "How do I hear about new stock and promos?",
    a: (
      <>
        Join our <Tg group={RETAIL_TG}>Retail Updates Telegram group</Tg>. New flavors, restocks and promos are posted
        there first.
      </>
    ),
  },
  {
    q: "How long does delivery take?",
    a: "We ship nationwide. Shopee orders can be tracked in your Shopee app, and delivery time depends on your location. Wholesale delivery is arranged with you in the Telegram group.",
  },
  {
    q: "What payment methods can I use?",
    a: "For Shopee orders, any payment method Shopee offers. For wholesale orders, payment options are confirmed with you in the Wholesale Telegram group.",
  },
  {
    q: "What if my order arrives damaged?",
    a: (
      <>
        For Shopee orders, Shopee&apos;s return and refund policy applies. For wholesale orders, message us in the
        group or call/text <a href={`tel:${PHONE}`}>{PHONE}</a> and we&apos;ll sort it out.
      </>
    ),
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ flex: "2 1 440px", minWidth: 0, display: "flex", flexDirection: "column" }}>
      {faqs.map((f, i) => {
        const isOpen = open === i;
        const Icon = isOpen ? Minus : Plus;
        return (
          <div key={f.q} data-reveal="stagger" style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background:
                  "linear-gradient(to right, transparent, var(--color-neutral-800) 48px calc(100% - 48px), transparent)",
              }}
            />
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                all: "unset",
                boxSizing: "border-box",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                padding: "20px 4px",
                cursor: "pointer",
                fontSize: 17,
                lineHeight: 1.4,
                fontWeight: 500,
                color: "var(--color-text)",
                borderRadius: 6,
              }}
            >
              <span>{f.q}</span>
              <Icon size={18} style={{ flex: "none", color: "var(--color-accent)" }} />
            </button>
            {isOpen && (
              <p
                style={{
                  margin: 0,
                  padding: "0 48px 22px 4px",
                  fontSize: 15,
                  lineHeight: 1.65,
                  maxWidth: "62ch",
                  color: "color-mix(in srgb, var(--color-text) 76%, transparent)",
                }}
              >
                {f.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
