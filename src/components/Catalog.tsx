"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Info, MagnifyingGlass, Storefront, X } from "@phosphor-icons/react";
import { products, swatch, type Product } from "@/lib/products";

const MOBILE_PREVIEW = 8;
const muted = (pct: number) => `color-mix(in srgb, var(--color-text) ${pct}%, transparent)`;

function ShopeeIcon({ size = 16 }: { size?: number }) {
  return (
    <img src="/media/design/shopee.png" alt="" width={size} height={size} style={{ borderRadius: 3 }} />
  );
}

function ProductCard({
  p,
  sel,
  onSelect,
  onOpen,
}: {
  p: Product;
  sel: number | null;
  onSelect: (i: number) => void;
  onOpen: () => void;
}) {
  const [imgHover, setImgHover] = useState(false);
  const [picked, setPicked] = useState(false);
  const hover = imgHover || picked;
  const fl = sel === null ? undefined : p.flavors[sel];
  return (
    <article
      className="card product-card"
      role="button"
      tabIndex={0}
      aria-label={`View details for ${p.name}`}
      onClick={onOpen}
      onMouseLeave={() => setPicked(false)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onOpen())}
      style={{ cursor: "pointer", gap: 14, padding: "10px 10px 12px", border: "1px solid var(--color-divider)" }}
    >
      <div
        onMouseEnter={() => setImgHover(true)}
        onMouseLeave={() => setImgHover(false)}
        style={{
          position: "relative",
          aspectRatio: "1 / 1",
          borderRadius: 6,
          overflow: "hidden",
          background: "var(--color-neutral-900)",
        }}
      >
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        {p.listingImage && (
          <img
            src={fl?.shopeeImage ?? p.listingImage}
            alt=""
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 220ms ease",
              opacity: hover ? 1 : 0,
              pointerEvents: "none",
            }}
          />
        )}
        {p.listingImage && (
        <span
          className="pc-badge"
          style={{
            position: "absolute",
            left: 8,
            bottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            borderRadius: 999,
            fontSize: 11,
            background: "color-mix(in srgb, var(--color-bg) 80%, transparent)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            color: "var(--color-accent-2-200)",
            pointerEvents: "none",
          }}
        >
          <Storefront />
          {hover ? "How it looks on Shopee" : "Hover to see Shopee listing"}
        </span>
        )}
      </div>

      <div className="pc-body" style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 4px", flex: 1 }}>
        <div className="pc-head" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
          <h3 className="card-title pc-title" style={{ margin: 0, fontSize: 18 }}>
            {p.name}
          </h3>
          {p.price ? (
            <span
              className="pc-price"
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: "var(--color-accent-2-300)",
                fontFeatureSettings: "'tnum' 1",
                whiteSpace: "nowrap",
              }}
            >
              {p.price}
            </span>
          ) : (
            <span className="pc-price-note" style={{ fontSize: 12, color: muted(55), whiteSpace: "nowrap" }}>Price on Shopee</span>
          )}
        </div>
        <div className="pc-meta" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div className="pc-dots" style={{ display: "flex", gap: 8 }}>
            {p.flavors.slice(0, 7).map((f, i) => (
              <button
                key={f.code}
                type="button"
                aria-label={`${f.code} · ${f.name}`}
                title={`${f.code} · ${f.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(i);
                  if (p.listingImage) setPicked(true);
                }}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: swatch(f.code),
                  boxShadow:
                    i === sel
                      ? `0 0 0 2px var(--color-surface), 0 0 0 3.5px ${swatch(f.code)}`
                      : "inset 0 0 0 1px rgb(255 255 255 / 0.12)",
                }}
              />
            ))}
          </div>
          {p.flavors.length > 1 && (
            <span className="pc-count" style={{ fontSize: 12, color: muted(55), whiteSpace: "nowrap" }}>{p.flavors.length} flavors</span>
          )}
        </div>
        {fl ? (
          <span className="pc-flavor" style={{ fontSize: 13, color: muted(80) }}>
            <span style={{ fontSize: 11, letterSpacing: "0.04em", color: muted(55) }}>{fl.code}</span> · {fl.name}
          </span>
        ) : (
          p.flavors.length > 1 && <span className="pc-flavor" style={{ fontSize: 13, color: muted(50) }}>Tap a color to pick a flavor</span>
        )}
      </div>

      <a
        href={p.shopeeUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="btn btn-primary btn-block pc-order"
        style={{ marginTop: 0, minHeight: 38 }}
      >
        <ShopeeIcon />
        <span>
          Order<span className="pc-order-long"> on Shopee</span>
        </span>
        <ArrowUpRight className="pc-order-arrow" />
      </a>
    </article>
  );
}

function Detail({
  p,
  sel,
  onSelect,
  onClose,
}: {
  p: Product;
  sel: number | null;
  onSelect: (i: number) => void;
  onClose: () => void;
}) {
  const [view, setView] = useState<"product" | "shopee">("product");
  const fl = sel === null ? undefined : p.flavors[sel];
  const shopeeSrc = fl?.shopeeImage ?? p.listingImage;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);

  const thumb = (active: boolean) => ({
    display: "block",
    width: 68,
    height: 68,
    borderRadius: 6,
    overflow: "hidden",
    background: "var(--color-neutral-900)",
    boxShadow: active ? "0 0 0 2px var(--color-accent)" : "0 0 0 1px var(--color-divider)",
  });

  return (
    <div className="dialog-backdrop detail-backdrop" onClick={onClose}>
      <div
        className="dialog detail-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={p.name}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="btn btn-ghost btn-icon detail-close"
          aria-label="Close"
          title="Close"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <div className="detail-media-col">
          <div className="detail-media">
            <img
              src={view === "shopee" && shopeeSrc ? shopeeSrc : p.image}
              alt={view === "shopee" ? `${p.name} as listed on Shopee` : p.name}
              style={{ width: "100%", height: "100%", objectFit: view === "shopee" ? "contain" : "cover" }}
            />
          </div>
          {p.listingImage && (
          <div className="detail-thumbs">
            {(["product", "shopee"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                aria-pressed={view === v}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  fontSize: 11,
                  color: muted(70),
                }}
              >
                <span style={thumb(view === v)}>
                  <img
                    src={v === "product" ? p.image : shopeeSrc}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </span>
                {v === "product" ? "Product" : "On Shopee"}
              </button>
            ))}
          </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, minWidth: 0, paddingTop: 4 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span className="card-kicker">{p.category}</span>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(26px, 3vw, 34px)",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                fontWeight: 500,
              }}
            >
              {p.name}
            </h2>
            <span
              style={{
                fontSize: 24,
                fontWeight: 500,
                color: "var(--color-accent-2-300)",
                fontFeatureSettings: "'tnum' 1",
              }}
            >
              {p.price || "See price on Shopee"}
            </span>
          </div>

          {p.flavors.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: muted(60) }}>
              {p.flavors.length} flavor{p.flavors.length === 1 ? "" : "s"} available
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {p.flavors.map((f, i) => (
                <button
                  key={f.code}
                  type="button"
                  onClick={() => {
                    onSelect(i);
                    if (p.flavors[i].shopeeImage ?? p.listingImage) setView("shopee");
                  }}
                  aria-pressed={i === sel}
                  style={{
                    all: "unset",
                    boxSizing: "border-box",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "9px 12px",
                    borderRadius: "var(--radius-md)",
                    border: `1px solid ${i === sel ? "var(--color-accent-600)" : "var(--color-divider)"}`,
                    background: i === sel ? "color-mix(in srgb, var(--color-accent) 12%, transparent)" : "transparent",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: swatch(f.code),
                      boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.12)",
                    }}
                  />
                  <span style={{ fontSize: 14, flex: 1 }}>{f.name}</span>
                  <span style={{ fontSize: 11, letterSpacing: "0.04em", color: muted(55) }}>{f.code}</span>
                </button>
              ))}
            </div>
          </div>
          )}

          {p.listingImage && fl ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 16px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-accent-600)",
                background: "color-mix(in srgb, var(--color-accent) 14%, transparent)",
                marginTop: "auto",
              }}
            >
              <span
                style={{
                  flex: "none",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: swatch(fl.code),
                  boxShadow: "0 0 0 2px var(--color-surface), 0 0 0 3.5px currentColor",
                  color: "var(--color-accent-400)",
                }}
              />
              <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                <span style={{ fontSize: 12, color: muted(70) }}>On Shopee, choose this variation</span>
                <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: "0.02em", lineHeight: 1.1 }}>
                  {fl.code.toUpperCase()}
                </span>
                <span style={{ fontSize: 12, color: muted(60) }}>{fl.name}</span>
              </span>
            </div>
          ) : (
            <p style={{ margin: 0, display: "flex", gap: 10, fontSize: 13, lineHeight: 1.55, color: muted(75) }}>
              <Info size={16} style={{ flex: "none", marginTop: 1, color: "var(--color-accent-2-300)" }} />
              <span>
                {p.listingImage
                  ? "Pick a flavor above. Shopee lists this under a different product, so you'll choose the matching code there."
                  : "Find this product in our Shopee store, or message us there to order."}
              </span>
            </p>
          )}

          <a
            href={p.shopeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-block"
            style={{ marginTop: p.listingImage && fl ? 0 : "auto", minHeight: 44, fontSize: 15 }}
          >
            <ShopeeIcon size={18} />
            Order on Shopee
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </div>
  );
}

export function Catalog() {
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");
  const [flavorSel, setFlavorSel] = useState<Record<string, number>>({});
  const [detailSlug, setDetailSlug] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const q = useDeferredValue(query.trim().toLowerCase());

  const cats = useMemo(() => ["All", ...new Set(products.map((p) => p.category))], []);
  const visible = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === "All" || p.category === cat) &&
          (!q ||
            [p.name, p.category, ...p.flavors.map((f) => `${f.code} ${f.name}`)].join(" ").toLowerCase().includes(q)),
      ),
    [cat, q],
  );

  // Phones show the first products only until expanded; searching or filtering shows everything.
  const collapsed = !expanded && !q && cat === "All" && visible.length > MOBILE_PREVIEW;
  const select = (slug: string) => (i: number) => setFlavorSel((s) => ({ ...s, [slug]: i }));
  const detail = products.find((p) => p.slug === detailSlug);

  return (
    <section
      id="products"
      style={{
        position: "relative",
        scrollMarginTop: 84,
        maxWidth: 1200,
        margin: "0 auto",
        padding: "clamp(40px, 6vw, 80px) clamp(20px, 5vw, 72px)",
      }}
    >
      <div
        data-reveal="up"
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "var(--radius-lg)",
          minHeight: "clamp(240px, 28vw, 380px)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 20,
          padding: "clamp(20px, 3vw, 36px)",
          marginBottom: 28,
          background: "#050407",
          boxShadow: "0 0 0 1px color-mix(in srgb, var(--color-accent) 20%, transparent)",
        }}
      >
        <img
          data-kenburns="1"
          src="/media/design/catalog-banner.webp"
          alt="Violet-lit display counter stocked with vape devices and e-liquids"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "75% center",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(to right, color-mix(in srgb, #050407 85%, transparent) 0%, transparent 60%), linear-gradient(to top, color-mix(in srgb, #050407 80%, transparent) 0%, transparent 55%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 12 }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
            }}
          >
            <span style={{ width: 28, height: 1, background: "var(--color-accent)" }} />
            Catalog
          </span>
          <h2 style={{ margin: 0, fontSize: "clamp(30px, 3.6vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.015em" }}>
            Products
          </h2>
        </div>
        <label
          style={{
            position: "relative",
            display: "block",
            width: "min(320px, 100%)",
            background: "color-mix(in srgb, var(--color-bg) 70%, transparent)",
            borderRadius: "var(--radius-md)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          <MagnifyingGlass
            size={15}
            style={{
              position: "absolute",
              left: 11,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-neutral-500)",
              pointerEvents: "none",
            }}
          />
          <input
            className="input"
            type="search"
            placeholder="Search products or flavors"
            aria-label="Search products or flavors"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ paddingLeft: 34, minHeight: 38 }}
          />
        </label>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <div style={{ maxWidth: "100%", overflowX: "auto" }}>
          <div className="seg" role="radiogroup" aria-label="Category">
            {cats.map((c) => (
              <label key={c} className="seg-opt">
                <input type="radio" name="category" checked={cat === c} onChange={() => setCat(c)} />
                <span>{c}</span>
                <span style={{ fontSize: 11, color: "var(--color-neutral-500)" }}>
                  {products.filter((p) => c === "All" || p.category === c).length}
                </span>
              </label>
            ))}
          </div>
        </div>
        <span style={{ fontSize: 13, color: muted(60) }}>
          {visible.length} product{visible.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className={`product-grid${collapsed ? " is-collapsed" : ""}`}>
        {visible.map((p) => (
          <ProductCard
            key={p.slug}
            p={p}
            sel={flavorSel[p.slug] ?? null}
            onSelect={select(p.slug)}
            onOpen={() => setDetailSlug(p.slug)}
          />
        ))}
      </div>

      {collapsed && (
        <button type="button" className="btn btn-secondary show-more-mobile" onClick={() => setExpanded(true)}>
          Show all {visible.length} products
        </button>
      )}

      {visible.length === 0 && (
        <div style={{ padding: "48px 0", display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
          <p style={{ margin: 0, fontSize: 15, color: muted(70) }}>No products match “{query}”.</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setQuery("");
              setCat("All");
            }}
          >
            Clear search
          </button>
        </div>
      )}

      {detail && (
        <Detail
          p={detail}
          sel={flavorSel[detail.slug] ?? null}
          onSelect={select(detail.slug)}
          onClose={() => setDetailSlug(null)}
        />
      )}
    </section>
  );
}
