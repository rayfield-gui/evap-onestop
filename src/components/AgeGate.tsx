"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const KEY = "vosd-age21-ok";

function readOk() {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

const noopSubscribe = () => () => {};

export function AgeGate() {
  const stored = useSyncExternalStore(noopSubscribe, readOk, () => false);
  const [confirmed, setConfirmed] = useState(false);
  const [denied, setDenied] = useState(false);
  const open = !stored && !confirmed;

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  if (!open) return null;

  const confirm = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    document.documentElement.dataset.age = "ok";
    setConfirmed(true);
  };

  return (
    <div id="age-gate" className="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-title">
      <div className="age-gate-bg" aria-hidden />
      <div className="age-gate-shade" aria-hidden />

      <div className="age-gate-card">
        <img
          src="/media/design/logo.png"
          alt="Vape One Stop panther logo"
          width={84}
          height={84}
          style={{
            margin: "-8px auto 4px",
            filter:
              "brightness(1.7) saturate(1.2) drop-shadow(0 0 16px color-mix(in srgb, var(--color-accent) 70%, transparent))",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 3, lineHeight: 1.05, marginBottom: 22 }}>
          <span style={{ fontSize: 18, fontWeight: 500 }}>Vape One Stop</span>
          <span
            style={{ fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-accent-2-300)" }}
          >
            Distribution
          </span>
        </div>
        <span className="age-badge">21+</span>

        <h2 id="age-title" style={{ margin: "20px 0 0", fontSize: 26, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
          {denied ? "Come back when you're 21" : "Are you 21 or older?"}
        </h2>
        <p
          style={{
            margin: "10px auto 0",
            maxWidth: "34ch",
            fontSize: 15,
            lineHeight: 1.6,
            color: "color-mix(in srgb, var(--color-text) 72%, transparent)",
          }}
        >
          {denied
            ? "Sorry, this site is only for adults 21 years old and above."
            : "This site sells nicotine products. You must be at least 21 years old to enter."}
        </p>

        {!denied && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 26 }}>
            <button type="button" className="age-btn-yes" onClick={confirm} autoFocus>
              Yes, I&apos;m 21 or older
            </button>
            <button type="button" className="age-btn-no" onClick={() => setDenied(true)}>
              No, I&apos;m under 21
            </button>
          </div>
        )}

        <p
          style={{
            margin: "22px 0 0",
            fontSize: 11.5,
            lineHeight: 1.5,
            color: "color-mix(in srgb, var(--color-text) 45%, transparent)",
          }}
        >
          Warning: Nicotine is an addictive chemical. By entering, you confirm you are of legal age.
        </p>
      </div>
    </div>
  );
}
