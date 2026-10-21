// Step 3 of 3: place each transparent cutout in front of the panther plate at a fixed spot,
// so every listing image matches. Output: public/products/listing/<name>.webp
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PLATE = path.join(ROOT, "assets/panther-plate.png");
const IN = path.join(ROOT, "assets/cut");
const OUT = path.join(ROOT, "public/products/listing");

// Fractions of the plate. The product's right edge overlaps the panther's shoulder
// (starts ~0.48) but stays clear of its face (starts ~0.57).
const RIGHT_EDGE = 0.55;
const LEFT_LIMIT = 0.08;
const FLOOR = 0.92;
const MAX_HEIGHT = 0.68;

// Crop to rows/columns that are meaningfully opaque, so stray specks left by the
// background removal don't inflate the box and shrink the product.
async function loadCutout(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const rows = new Uint32Array(h);
  const cols = new Uint32Array(w);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4 + 3;
      if (data[i] < 24) data[i] = 0;
      if (data[i] > 160) {
        rows[y]++;
        cols[x]++;
      }
    }
  const span = (counts, min) => {
    let a = 0;
    let b = counts.length - 1;
    while (a < b && counts[a] < min) a++;
    while (b > a && counts[b] < min) b--;
    return [a, b];
  };
  const [top, bottom] = span(rows, w * 0.03);
  const [left, right] = span(cols, h * 0.03);
  return sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left, top, width: right - left + 1, height: bottom - top + 1 })
    .png()
    .toBuffer();
}

async function compose(file, plate, size) {
  const cut = await loadCutout(file);
  const meta = await sharp(cut).metadata();

  let scale = (size * MAX_HEIGHT) / meta.height;
  const maxWidth = size * (RIGHT_EDGE - LEFT_LIMIT);
  if (meta.width * scale > maxWidth) scale = maxWidth / meta.width;
  const pw = Math.round(meta.width * scale);
  const ph = Math.round(meta.height * scale);
  const left = Math.round(size * RIGHT_EDGE - pw);
  const top = Math.round(size * FLOOR - ph);

  const product = await sharp(cut).resize(pw, ph).toBuffer();

  const sw = Math.round(pw * 1.15);
  const sh = Math.max(12, Math.round(size * 0.03));
  const pad = 80;
  const shadow = await sharp(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${sw + pad}" height="${sh + pad}"><ellipse cx="${(sw + pad) / 2}" cy="${(sh + pad) / 2}" rx="${sw / 2}" ry="${sh / 2}" fill="rgba(20,12,35,0.32)"/></svg>`,
    ),
  )
    .blur(14)
    .png()
    .toBuffer();

  return sharp(plate)
    .composite([
      { input: shadow, left: Math.round(left + pw / 2 - (sw + pad) / 2), top: Math.round(top + ph - (sh + pad) / 2) },
      { input: product, left, top },
    ])
    .webp({ quality: 84 })
    .toBuffer();
}

const plate = await sharp(PLATE).toBuffer();
const { width: size } = await sharp(PLATE).metadata();
const only = process.argv.slice(2);
await mkdir(OUT, { recursive: true });

for (const f of (await readdir(IN)).filter((f) => f.endsWith(".png"))) {
  const name = f.replace(/\.png$/, "");
  if (only.length && !only.includes(name)) continue;
  await sharp(await compose(path.join(IN, f), plate, size)).toFile(path.join(OUT, `${name}.webp`));
  console.log("composed", name);
}
