"use client";

import { useEffect } from "react";
import { ArrowUpRight, CheckCircle, X } from "@phosphor-icons/react";
import { SHOPEE_STORE } from "@/lib/products";
import { TELEGRAM_GROUPS } from "@/lib/site";

const [RETAIL, WHOLESALE, RESELLER] = TELEGRAM_GROUPS;

const BY_INTEREST = {
  retail: { group: RETAIL, note: "New flavors, restocks and promos are posted here first." },
  wholesale: { group: WHOLESALE, note: "Wholesale prices, stock lists and minimum orders are posted here." },
  reseller: { group: RESELLER, note: "Learn how our reseller and affiliate program works." },
};

export function ContactSuccess({
  interest,
  onClose,
}: {
  interest: keyof typeof BY_INTEREST;
  onClose: () => void;
}) {
  const pick = BY_INTEREST[interest] ?? BY_INTEREST.retail;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="dialog-backdrop success-backdrop" onClick={onClose}>
      <div
        className="thanks-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="btn btn-ghost btn-icon success-close"
          aria-label="Close"
          title="Close"
          onClick={onClose}
          autoFocus
        >
          <X size={18} />
        </button>

        <span className="thanks-check">
          <CheckCircle size={46} weight="fill" />
        </span>

        <h2 id="success-title" style={{ margin: "18px 0 0", fontSize: "clamp(26px, 4vw, 32px)", letterSpacing: "-0.02em" }}>
          Thanks, we got your details
        </h2>
        <p
          style={{
            margin: "12px auto 0",
            maxWidth: "40ch",
            fontSize: 15.5,
            lineHeight: 1.6,
            color: "color-mix(in srgb, var(--color-text) 75%, transparent)",
          }}
        >
          Our team will reach out to the number you gave us soon. While you wait, join our group so you don&apos;t miss
          new stocks and promos.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
          <a href={pick.group.href} target="_blank" rel="noopener noreferrer" className="age-btn-yes thanks-cta">
            <img src="/media/design/telegram.png" alt="" width={20} height={20} style={{ borderRadius: "50%" }} />
            Join our {pick.group.label} group
            <ArrowUpRight size={15} />
          </a>
          <span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
            {pick.note}
          </span>
          <a
            href={SHOPEE_STORE}
            target="_blank"
            rel="noopener noreferrer"
            className="age-btn-no thanks-cta"
            style={{ marginTop: 6 }}
          >
            <img src="/media/design/shopee.png" alt="" width={18} height={18} style={{ borderRadius: 3 }} />
            Shop on our Shopee store
          </a>
          <button type="button" className="btn btn-ghost" onClick={onClose} style={{ marginTop: 4, alignSelf: "center" }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
