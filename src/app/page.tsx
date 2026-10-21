import type { CSSProperties, ReactNode } from "react";
import {
  ArrowDown,
  ArrowSquareOut,
  ArrowUp,
  ArrowUpRight,
  HandPointing,
  Handshake,
  IdentificationCard,
  MapPin,
  Palette,
  Phone,
  SealCheck,
  ShoppingCartSimple,
  Storefront,
  Truck,
  Warning,
} from "@phosphor-icons/react/ssr";
import { Catalog } from "@/components/Catalog";
import { Faq } from "@/components/Faq";
import { AgeGate } from "@/components/AgeGate";
import { Motion } from "@/components/Motion";
import { SHOPEE_STORE } from "@/lib/products";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  MESSENGER_URL,
  PHONE,
  TELEGRAM_GROUPS,
  TELEGRAM_URL,
} from "@/lib/site";
import { InstagramIcon, MessengerIcon } from "@/components/BrandIcons";
import { SocialLinks } from "@/components/SocialLinks";
import { ContactForm } from "@/components/ContactForm";
import { ChatWidget } from "@/components/ChatWidget";

const muted = (pct: number) => `color-mix(in srgb, var(--color-text) ${pct}%, transparent)`;
const container: CSSProperties = {
  position: "relative",
  width: "100%",
  maxWidth: 1200,
  margin: "0 auto",
};
const sectionTitle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(30px, 3.6vw, 44px)",
  lineHeight: 1.1,
  letterSpacing: "-0.015em",
  fontWeight: 500,
};

function Eyebrow({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontSize: 12,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color,
      }}
    >
      <span style={{ width: 28, height: 1, background: color }} />
      {children}
    </span>
  );
}

function ShopeeIcon({ size = 18 }: { size?: number }) {
  return <img src="/media/design/shopee.png" alt="" width={size} height={size} style={{ borderRadius: 3 }} />;
}

function TelegramIcon({ size = 18 }: { size?: number }) {
  return <img src="/media/design/telegram.png" alt="" width={size} height={size} style={{ borderRadius: "50%" }} />;
}

const highlights = [
  { icon: SealCheck, label: "Quality Products" },
  { icon: Truck, label: "Fast & Secure Shipping" },
  { icon: Handshake, label: "Trusted Service" },
  { icon: Storefront, label: "Wholesale, Retail and Resellers" },
];

const regions = [
  {
    name: "Luzon",
    tag: "North",
    areas: "Metro Manila, Central Luzon, CALABARZON, Bicol and the northern provinces.",
    color: "var(--color-accent-2-400)",
  },
  {
    name: "Visayas",
    tag: "Central",
    areas: "Cebu, Iloilo, Bacolod, Tacloban, Bohol and the surrounding islands.",
    color: "var(--color-accent-400)",
  },
  {
    name: "Mindanao",
    tag: "South",
    areas: "Davao, Cagayan de Oro, General Santos, Zamboanga and nearby cities.",
    color: "var(--color-accent-300)",
  },
];

const steps = [
  {
    num: "01",
    img: "/media/design/step-1.webp",
    icon: HandPointing,
    title: "Pick a product",
    body: "Browse the catalog and tap a product to see its flavors, price and how it looks on Shopee.",
  },
  {
    num: "02",
    img: "/media/design/step-2.webp",
    icon: ArrowSquareOut,
    title: "Open it on Shopee",
    body: "Tap “Order on Shopee” to go straight to the product listing in our Shopee store.",
  },
  {
    num: "03",
    img: "/media/design/step-3.webp",
    icon: Palette,
    title: "Choose your flavor",
    body: "On Shopee, pick the variation that matches your flavor code. Each flavor code shows its color here.",
  },
  {
    num: "04",
    img: "/media/design/step-4.webp",
    icon: ShoppingCartSimple,
    title: "Check out",
    body: "Add to cart and check out on Shopee. Payment and delivery tracking are handled by Shopee.",
  },
];

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1100px 700px at 85% -120px, color-mix(in srgb, var(--color-accent-800) 70%, transparent), transparent 62%), radial-gradient(800px 600px at -5% 38%, color-mix(in srgb, var(--color-accent-2-900) 70%, transparent), transparent 60%), var(--color-bg)",
        overflowX: "clip",
      }}
    >
      {/* Nav */}
      <nav
        className="nav site-nav"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          flexWrap: "wrap",
          gap: "16px clamp(20px, 3vw, 44px)",
          padding: "14px clamp(20px, 5vw, 72px)",
          background: "color-mix(in srgb, var(--color-bg) 84%, transparent)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "0 1px 0 color-mix(in srgb, var(--color-accent) 18%, transparent)",
        }}
      >
        <a
          href="#top"
          className="nav-brand"
          style={{ display: "flex", alignItems: "center", gap: 14, letterSpacing: "-0.01em", color: "var(--color-text)" }}
        >
          <img
            src="/media/design/logo.png"
            alt="Vape One Stop panther logo"
            width={52}
            height={52}
            className="brand-logo"
            style={{
              filter:
                "brightness(1.7) saturate(1.2) drop-shadow(0 0 12px color-mix(in srgb, var(--color-accent) 60%, transparent))",
            }}
          />
          <span style={{ display: "flex", flexDirection: "column", gap: 3, lineHeight: 1.05 }}>
            <span className="brand-name">Vape One Stop</span>
            <span
              style={{
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-accent-2-300)",
              }}
            >
              Distribution
            </span>
          </span>
        </a>
        <div className="nav-links">
          <a href="#products" style={{ fontSize: 16, padding: "8px 2px" }}>
            Products
          </a>
          <a href="#how-to-order" style={{ fontSize: 16, padding: "8px 2px" }}>
            How to order
          </a>
          <a href="#faqs" style={{ fontSize: 16, padding: "8px 2px" }}>
            FAQs
          </a>
          <a href="#contact" style={{ fontSize: 16, padding: "8px 2px" }}>
            Contact
          </a>
        </div>
        <SocialLinks size={18} className="nav-social" />
        <a
          href={SHOPEE_STORE}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary nav-cta"
          style={{ minHeight: 46, paddingInline: 20, fontSize: 15, gap: 10, color: "var(--color-accent)" }}
        >
          <ShopeeIcon size={20} />
          <span>Order now</span>
          <ArrowUpRight size={15} className="nav-cta-arrow" />
        </a>
      </nav>

      <main>
        {/* Hero */}
        <section
          id="top"
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "clamp(600px, calc(100svh - 84px), 960px)",
            display: "flex",
            alignItems: "flex-end",
            background: "#050407",
          }}
        >
          <picture
            data-parallax="0.28"
            style={{ position: "absolute", inset: 0, display: "block", willChange: "transform" }}
          >
            <source media="(max-width: 767px)" srcSet="/media/design/hero-mobile.webp" />
            <img
              data-kenburns="1"
              src="/media/design/hero.webp"
              alt="Black panther in a fedora and overcoat with a cigar"
              fetchPriority="high"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "72% 22%" }}
            />
          </picture>
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "linear-gradient(to top, var(--color-bg) 0%, color-mix(in srgb, var(--color-bg) 70%, transparent) 22%, transparent 52%), linear-gradient(to right, color-mix(in srgb, #050407 70%, transparent) 0%, transparent 55%)",
            }}
          />
          <div style={{ ...container, padding: "120px clamp(20px, 5vw, 72px) clamp(48px, 8vw, 104px)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: 600 }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(42px, 6.2vw, 88px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.03em",
                  fontWeight: 500,
                  textShadow: "0 2px 30px color-mix(in srgb, #000 60%, transparent)",
                }}
              >
                <span data-reveal="hero" data-delay="100" style={{ display: "block" }}>
                  Every shelf, stocked.
                </span>
                <span data-reveal="hero" data-delay="260" style={{ display: "block", color: "var(--color-accent-2-300)" }}>
                  One stop.
                </span>
              </h1>
              <p
                data-reveal="hero"
                data-delay="420"
                style={{ margin: 0, fontSize: 17, lineHeight: 1.65, maxWidth: "48ch", color: muted(86) }}
              >
                Retail and wholesale vape distribution. Disposables, pods, devices and e-liquids from one catalog. Buy
                on Shopee, or join our Wholesale group for bulk prices.
              </p>
              <div data-reveal="hero" data-delay="560" style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                <a
                  href="#products"
                  className="btn btn-primary"
                  style={{
                    minHeight: 46,
                    paddingInline: 22,
                    fontSize: 15,
                    background: "color-mix(in srgb, var(--color-bg) 55%, transparent)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                  }}
                >
                  Browse the catalog <ArrowDown />
                </a>
                <a
                  href={SHOPEE_STORE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  style={{ minHeight: 46, fontSize: 15, color: "var(--color-accent-2-200)" }}
                >
                  <ShopeeIcon />
                  Shop on Shopee <ArrowUpRight />
                </a>
              </div>
              <div
                data-reveal="hero"
                data-delay="700"
                style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px", fontSize: 13, color: muted(72) }}
              >
                {[
                  { icon: Storefront, text: "Retail & wholesale" },
                  { icon: IdentificationCard, text: "21+ only" },
                  { icon: Truck, text: "Nationwide delivery" },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Icon style={{ color: "var(--color-accent)" }} />
                    {text}
                  </span>
                ))}
              </div>
              <div
                data-reveal="hero"
                data-delay="820"
                style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 13, color: muted(72) }}
              >
                <span>Follow us</span>
                <SocialLinks size={18} />
              </div>
            </div>
          </div>
        </section>

        <div style={{ position: "relative" }}>
          <img
            data-drift="1"
            className="lighten smoke"
            src="/media/design/smoke.webp"
            alt=""
            loading="lazy"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
          />

          {/* What do you need */}
          <section
            id="start"
            style={{ ...container, scrollMarginTop: 84, padding: "clamp(32px, 5vw, 64px) clamp(20px, 5vw, 72px) 0" }}
          >
            <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
              <Eyebrow color="var(--color-accent)">Start here</Eyebrow>
              <h2 style={sectionTitle}>What do you need?</h2>
            </div>
            <div className="intent-grid">
              {[
                {
                  icon: <ShopeeIcon size={30} />,
                  title: "Buy now",
                  text: "Browse our products and check out on our official Shopee store.",
                  primary: { label: "Shop on Shopee", href: SHOPEE_STORE, external: true },
                  secondary: { label: "See catalog", href: "#products" },
                },
                {
                  icon: <TelegramIcon size={30} />,
                  title: "Updates & new releases",
                  text: "Get new flavors, restocks and promos first in our Telegram group.",
                  primary: { label: "Join Retail Updates", href: TELEGRAM_GROUPS[0].href, external: true },
                  secondary: { label: "All groups", href: "#contact" },
                },
                {
                  icon: <MessengerIcon size={30} />,
                  title: "Questions & bulk orders",
                  text: "Ask us anything, or request bulk and special orders.",
                  primary: { label: "Message us", href: MESSENGER_URL, external: true },
                  secondary: { label: "Wholesale group", href: TELEGRAM_GROUPS[1].href, external: true },
                },
                {
                  icon: (
                    <span
                      style={{
                        display: "grid",
                        placeItems: "center",
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        background: "var(--color-accent-800)",
                      }}
                    >
                      <SealCheck size={18} style={{ color: "var(--color-accent-200)" }} />
                    </span>
                  ),
                  title: "Rules & how it works",
                  text: "How ordering works, delivery, payment and our policies.",
                  primary: { label: "Read the FAQs", href: "#faqs" },
                  secondary: { label: "Facebook page", href: FACEBOOK_URL, external: true },
                },
              ].map((c) => (
                <article key={c.title} className="intent-card" data-reveal="stagger">
                  <span style={{ flex: "none" }}>{c.icon}</span>
                  <h3 style={{ margin: "14px 0 0", fontSize: 19, lineHeight: 1.25, fontWeight: 500 }}>{c.title}</h3>
                  <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.55, color: muted(70), flex: 1 }}>{c.text}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 14px", marginTop: 16 }}>
                    <a
                      href={c.primary.href}
                      {...(c.primary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="btn btn-primary"
                      style={{ minHeight: 38, paddingInline: 14 }}
                    >
                      {c.primary.label}
                      {c.primary.external ? <ArrowUpRight size={14} /> : <ArrowDown size={14} />}
                    </a>
                    <a
                      href={c.secondary.href}
                      {...(c.secondary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      style={{ fontSize: 13 }}
                    >
                      {c.secondary.label}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Highlights */}
          <section style={{ ...container, padding: "clamp(24px, 4vw, 48px) clamp(20px, 5vw, 72px) 0" }}>
            <div
              className="highlights-grid"
              style={{
                position: "relative",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                background: "color-mix(in srgb, var(--color-accent) 18%, transparent)",
                boxShadow:
                  "0 0 0 1px color-mix(in srgb, var(--color-accent) 22%, transparent), 0 20px 60px -30px color-mix(in srgb, var(--color-accent) 50%, transparent)",
              }}
            >
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  data-reveal="stagger"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "clamp(18px, 2.4vw, 28px)",
                    background: "color-mix(in srgb, var(--color-surface) 92%, var(--color-accent-900))",
                  }}
                >
                  <span
                    data-pulse="1"
                    style={{
                      flex: "none",
                      display: "grid",
                      placeItems: "center",
                      width: 54,
                      height: 54,
                      borderRadius: "50%",
                      border: "1px solid var(--color-accent-600)",
                      background:
                        "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 70%)",
                      boxShadow: "0 0 22px color-mix(in srgb, var(--color-accent) 35%, transparent)",
                    }}
                  >
                    <Icon size={27} style={{ color: "var(--color-accent-400)" }} />
                  </span>
                  <span style={{ fontSize: 16, lineHeight: 1.3, fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>
          </section>

          <Catalog />
        </div>

        {/* How to order */}
        <section
          id="how-to-order"
          style={{
            scrollMarginTop: 84,
            position: "relative",
            marginTop: "clamp(24px, 4vw, 56px)",
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--color-bg) 92%, transparent), color-mix(in srgb, var(--color-section) 72%, transparent) 45%, color-mix(in srgb, var(--color-bg) 94%, transparent)), linear-gradient(to right, color-mix(in srgb, var(--color-bg) 70%, transparent), transparent 70%), url(/media/design/how-to-bg.webp) center / cover no-repeat, var(--color-section)",
          }}
        >
          <div style={{ ...container, padding: "clamp(56px, 7vw, 96px) clamp(20px, 5vw, 72px)" }}>
            <div
              data-reveal="up"
              style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: "clamp(32px, 4vw, 56px)" }}
            >
              <Eyebrow color="var(--color-accent-2-300)">Ordering</Eyebrow>
              <h2 style={sectionTitle}>How to order</h2>
            </div>
            <ol className="steps-grid" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {steps.map(({ num, img, icon: Icon, title, body }) => (
                <li key={num} data-reveal="stagger" style={{ display: "flex", flexDirection: "column", gap: 14, position: "relative" }}>
                  <div
                    className="step-img"
                    style={{
                      position: "relative",
                      aspectRatio: "1 / 1",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                      background: "#050407",
                      boxShadow:
                        "0 0 0 1px color-mix(in srgb, var(--color-accent) 22%, transparent), 0 24px 50px -24px color-mix(in srgb, var(--color-accent) 45%, transparent)",
                      marginBottom: 6,
                    }}
                  >
                    <img src={img} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div className="step-rule" style={{ position: "relative", height: 1, marginBottom: 6 }}>
                    <span
                      style={{
                        position: "absolute",
                        inset: "0 0 auto 0",
                        height: 1,
                        background:
                          "linear-gradient(to right, var(--color-accent-2-300) 0 32px, color-mix(in srgb, var(--color-text) 22%, transparent) 32px calc(100% - 48px), transparent)",
                      }}
                    />
                  </div>
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 14, fontFeatureSettings: "'tnum' 1", color: "var(--color-accent-2-300)" }}>
                      {num}
                    </span>
                    <Icon size={18} style={{ color: muted(70) }} />
                  </span>
                  <h3 style={{ margin: 0, fontSize: 20, lineHeight: 1.25, fontWeight: 500 }}>{title}</h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: muted(76) }}>{body}</p>
                </li>
              ))}
            </ol>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", marginTop: "clamp(40px, 5vw, 64px)" }}>
              <a
                href="#products"
                className="btn btn-primary"
                style={{
                  minHeight: 40,
                  paddingInline: 18,
                  color: "var(--color-accent-200)",
                  borderColor: "var(--color-accent-300)",
                }}
              >
                Browse the catalog <ArrowUp />
              </a>
              <a
                href={SHOPEE_STORE}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ minHeight: 40, color: "var(--color-accent-2-200)" }}
              >
                <ShopeeIcon />
                Visit our Shopee store <ArrowUpRight />
              </a>
            </div>
          </div>
        </section>

        {/* Coverage */}
        <section
          className="coverage"
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "clamp(560px, 56vw, 860px)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            data-kenburns="1"
            className="lighten coverage-map"
            src="/media/design/coverage-map.webp"
            alt="Map of the Philippines with delivery routes"
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            className="coverage-fade"
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          />
          <div style={{ ...container, padding: "clamp(56px, 7vw, 96px) clamp(20px, 5vw, 72px)" }}>
            <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 500 }}>
              <Eyebrow color="var(--color-accent-2-300)">Coverage</Eyebrow>
              <h2 style={sectionTitle}>Delivering nationwide</h2>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: muted(78) }}>
                From Luzon to Mindanao, orders ship with tracking straight to your store.
              </p>
            </div>

            <ol
              style={{
                listStyle: "none",
                margin: "clamp(28px, 4vw, 44px) 0 0",
                padding: 0,
                maxWidth: 500,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {regions.map((r) => (
                <li
                  key={r.name}
                  data-reveal="stagger"
                  style={{
                    position: "relative",
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: "4px 18px",
                    padding: "18px 0",
                    borderTop: "1px solid color-mix(in srgb, var(--color-accent) 18%, transparent)",
                  }}
                >
                  <span
                    data-pulse="1"
                    style={{
                      gridRow: "span 2",
                      alignSelf: "center",
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: r.color,
                      boxShadow: `0 0 16px ${r.color}`,
                    }}
                  />
                  <span style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                    <span style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.01em" }}>{r.name}</span>
                    <span style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: r.color }}>
                      {r.tag}
                    </span>
                  </span>
                  <span style={{ fontSize: 14, lineHeight: 1.55, color: muted(68) }}>{r.areas}</span>
                </li>
              ))}
            </ol>

            <div
              data-reveal="up"
              style={{ display: "flex", flexWrap: "wrap", gap: "10px 22px", marginTop: 8, fontSize: 13, color: muted(72) }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Truck size={16} style={{ color: "var(--color-accent)" }} />
                Tracked delivery through Shopee
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MapPin size={16} style={{ color: "var(--color-accent-2-300)" }} />
                Ships to all three island groups
              </span>
            </div>
          </div>
        </section>

        <div style={{ position: "relative" }}>
          <img
            data-drift="flip"
            className="lighten smoke"
            src="/media/design/smoke.webp"
            alt=""
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
              transform: "scaleX(-1)",
            }}
          />

          {/* FAQs */}
          <section
            id="faqs"
            style={{
              ...container,
              scrollMarginTop: 84,
              padding: "clamp(56px, 7vw, 104px) clamp(20px, 5vw, 72px)",
              display: "flex",
              flexWrap: "wrap",
              gap: "32px clamp(32px, 5vw, 80px)",
              alignItems: "flex-start",
            }}
          >
            <div
              data-reveal="up"
              style={{ flex: "1 1 280px", maxWidth: 380, display: "flex", flexDirection: "column", gap: 12 }}
            >
              <Eyebrow color="var(--color-accent)">Support</Eyebrow>
              <h2 style={sectionTitle}>FAQs</h2>
              <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.6, color: muted(72) }}>
                Something not covered here? Message us on{" "}
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                  Telegram
                </a>{" "}
                or call/text <a href={`tel:${PHONE}`}>{PHONE}</a>.
              </p>
              <div className="faq-panther"
                style={{
                  position: "relative",
                  marginTop: 16,
                  aspectRatio: "825 / 1024",
                  width: "100%",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, #000 14%, #000 60%, transparent 97%), linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%)",
                  WebkitMaskComposite: "source-in",
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, #000 14%, #000 60%, transparent 97%), linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%)",
                  maskComposite: "intersect",
                }}
              >
                <img
                  src="/media/design/faq-panther.webp"
                  alt="Black panther in a suit sitting in a leather armchair"
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
            <Faq />
          </section>
        </div>

        {/* Contact */}
        <section
          id="contact"
          style={{ ...container, scrollMarginTop: 84, padding: "clamp(40px, 6vw, 80px) clamp(20px, 5vw, 72px)" }}
        >
          <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            <Eyebrow color="var(--color-accent-2-300)">Contact us</Eyebrow>
            <h2 style={sectionTitle}>Let&apos;s talk</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, maxWidth: "56ch", color: muted(76) }}>
              Leave your details and we&apos;ll get back to you, or reach us directly on any of our channels.
            </p>
          </div>
          <div className="contact-layout">
          <ContactForm />
          <div className="community-grid contact-channels">
            {[
              {
                href: MESSENGER_URL,
                icon: <MessengerIcon size={36} />,
                title: "Messenger",
                text: "Questions, bulk and special requests.",
                cta: "Message us",
              },
              {
                href: TELEGRAM_GROUPS[0].href,
                icon: <TelegramIcon size={36} />,
                title: "Retail updates",
                text: "New flavors, restocks and promos for retail buyers.",
                cta: "Join on Telegram",
              },
              {
                href: TELEGRAM_GROUPS[1].href,
                icon: <TelegramIcon size={36} />,
                title: "Wholesale",
                text: "Bulk pricing and stock alerts for shops and distributors.",
                cta: "Join on Telegram",
              },
              {
                href: TELEGRAM_GROUPS[2].href,
                icon: <TelegramIcon size={36} />,
                title: "Resellers & affiliates",
                text: "Sell with us: reseller, wholesale and affiliate program.",
                cta: "Join on Telegram",
              },
              {
                href: INSTAGRAM_URL,
                icon: <InstagramIcon size={36} />,
                title: "@blckphanter_",
                text: "Product drops and new arrivals on Instagram.",
                cta: "Follow on Instagram",
              },
              {
                href: `tel:${PHONE}`,
                icon: (
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "var(--color-accent-800)",
                    }}
                  >
                    <Phone size={20} style={{ color: "var(--color-accent-200)" }} />
                  </span>
                ),
                title: PHONE,
                text: "Call or text us for orders and inquiries.",
                cta: "Call now",
              },
            ].map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.href.startsWith("tel:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="community-card"
                data-reveal="stagger"
              >
                <span style={{ flex: "none" }}>{c.icon}</span>
                <span style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                  <span style={{ fontSize: 17, fontWeight: 500 }}>{c.title}</span>
                  <span style={{ fontSize: 14, lineHeight: 1.5, color: muted(68) }}>{c.text}</span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 6,
                      fontSize: 13,
                      color: "var(--color-accent-300)",
                    }}
                  >
                    {c.cta} <ArrowUpRight size={13} />
                  </span>
                </span>
              </a>
            ))}
          </div>
          </div>
        </section>

        {/* Closing */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "clamp(440px, 42vw, 640px)",
            display: "flex",
            alignItems: "center",
            background: "#050407",
          }}
        >
          <img
            data-kenburns="1"
            src="/media/design/closing.webp"
            alt="Black panther in a fedora walking down a neon-lit alley"
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "72% center",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "linear-gradient(to bottom, var(--color-bg) 0%, transparent 22%, transparent 72%, var(--color-bg) 100%), linear-gradient(to right, color-mix(in srgb, #050407 85%, transparent) 0%, color-mix(in srgb, #050407 40%, transparent) 45%, transparent 70%)",
            }}
          />
          <div style={{ ...container, padding: "clamp(64px, 8vw, 112px) clamp(20px, 5vw, 72px)" }}>
            <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 480 }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(34px, 4.6vw, 60px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  fontWeight: 500,
                  textShadow: "0 2px 24px color-mix(in srgb, #000 60%, transparent)",
                }}
              >
                Ready to stock up?
              </h2>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: muted(82) }}>
                Browse the catalog, pick your flavors and check out on our Shopee store.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                <a
                  href={SHOPEE_STORE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                    minHeight: 46,
                    paddingInline: 22,
                    fontSize: 15,
                    gap: 10,
                    background: "color-mix(in srgb, var(--color-bg) 55%, transparent)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                  }}
                >
                  <ShopeeIcon />
                  Order on Shopee
                  <ArrowUpRight />
                </a>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{
                    minHeight: 46,
                    paddingInline: 18,
                    fontSize: 15,
                    gap: 10,
                    borderColor: "color-mix(in srgb, #2aabee 45%, transparent)",
                    background: "color-mix(in srgb, var(--color-bg) 55%, transparent)",
                  }}
                >
                  <TelegramIcon />
                  Join our community
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ ...container, padding: "0 clamp(20px, 5vw, 72px) 40px" }}>
        <div
          style={{
            height: 1,
            background: "linear-gradient(to right, transparent, var(--color-divider) 48px calc(100% - 48px), transparent)",
            marginBottom: 32,
          }}
        />
        <div className="footer-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 16, fontWeight: 500 }}>Vape One Stop Distribution</span>
            <span style={{ fontSize: 13, color: muted(60) }}>Wholesale, retail and reseller vape distribution.</span>
            <a href={`tel:${PHONE}`} className="footer-link" style={{ marginTop: 6 }}>
              <Phone size={18} style={{ color: "var(--color-accent-400)" }} />
              {PHONE}
            </a>
            <SocialLinks size={20} className="footer-social" />
          </div>

          <nav aria-label="Telegram communities" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: muted(55) }}>
              Join on Telegram
            </span>
            {TELEGRAM_GROUPS.map((g) => (
              <a key={g.href} href={g.href} target="_blank" rel="noopener noreferrer" className="footer-link">
                <TelegramIcon size={18} />
                {g.label}
              </a>
            ))}
          </nav>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              alignSelf: "start",
              gap: 10,
              maxWidth: 460,
              padding: "12px 14px",
              border: "1px solid var(--color-neutral-700)",
              borderRadius: "var(--radius-md)",
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            <Warning size={16} style={{ flex: "none", marginTop: 1, color: "var(--color-accent-2-300)" }} />
            <span>
              <strong style={{ fontWeight: 600 }}>WARNING:</strong> This product contains nicotine. Nicotine is an
              addictive chemical. For sale to adults 21+ only.
            </span>
          </div>
        </div>
        <p style={{ margin: "28px 0 0", fontSize: 12, color: muted(48) }}>
          © 2026 Vape One Stop Distribution. All rights reserved.
        </p>
      </footer>

      <ChatWidget />
      <AgeGate />
      <Motion />
    </div>
  );
}
