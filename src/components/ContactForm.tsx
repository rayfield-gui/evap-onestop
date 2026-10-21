"use client";

import { useActionState, useState } from "react";
import { PaperPlaneTilt, WarningCircle } from "@phosphor-icons/react";
import { submitContact } from "@/app/contact/actions";
import { INTERESTS, type ContactState } from "@/lib/contact";
import { ContactSuccess } from "./ContactSuccess";

const initial: ContactState = {};

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <span role="alert" style={{ fontSize: 12.5, color: "var(--color-accent-2-300)" }}>
      {msg}
    </span>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const [dismissed, setDismissed] = useState<ContactState | null>(null);
  const v = state.values;
  const fe = state.fieldErrors ?? {};
  const showSuccess = !!state.success && dismissed !== state;

  return (
    <>
    {showSuccess && <ContactSuccess interest={state.success!.interest} onClose={() => setDismissed(state)} />}
    <form action={action} className="contact-form" noValidate>
      <div className="contact-field">
        <label htmlFor="cf-name">Full name</label>
        <input
          id="cf-name"
          name="name"
          className="input"
          autoComplete="name"
          placeholder="Juan Dela Cruz"
          defaultValue={v?.name}
          aria-invalid={!!fe.name}
          required
        />
        <FieldError msg={fe.name} />
      </div>

      <div className="contact-field">
        <label htmlFor="cf-phone">Phone number</label>
        <input
          id="cf-phone"
          name="phone"
          className="input"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0917 123 4567"
          defaultValue={v?.phone}
          aria-invalid={!!fe.phone}
          required
        />
        <FieldError msg={fe.phone} />
      </div>

      <div className="contact-field">
        <label htmlFor="cf-page">
          Business page <span style={{ opacity: 0.6 }}>(optional)</span>
        </label>
        <input
          id="cf-page"
          name="page"
          className="input"
          inputMode="url"
          placeholder="Facebook page or Shopee shop link"
          defaultValue={v?.page}
        />
      </div>

      <fieldset className="contact-field" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend>What are you interested in?</legend>
        <div className="interest-options">
          {INTERESTS.map((i) => (
            <label key={i.value} className="interest-opt">
              <input type="radio" name="interest" value={i.value} defaultChecked={v?.interest === i.value} required />
              <span>{i.label}</span>
            </label>
          ))}
        </div>
        <FieldError msg={fe.interest} />
      </fieldset>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      {state.error && (
        <p
          role="alert"
          style={{
            margin: 0,
            display: "flex",
            gap: 8,
            fontSize: 13.5,
            lineHeight: 1.5,
            color: "var(--color-accent-2-200)",
          }}
        >
          <WarningCircle size={18} style={{ flex: "none", marginTop: 1 }} />
          {state.error}
        </p>
      )}

      <button type="submit" className="age-btn-yes" disabled={pending} style={{ opacity: pending ? 0.75 : 1 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <PaperPlaneTilt size={18} />
          {pending ? "Sending…" : "Send"}
        </span>
      </button>
      <p style={{ margin: 0, fontSize: 12, color: "color-mix(in srgb, var(--color-text) 50%, transparent)" }}>
        We&apos;ll reach out through your number. Your details are only used to reply to you.
      </p>
    </form>
    </>
  );
}
