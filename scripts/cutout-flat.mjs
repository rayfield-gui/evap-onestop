// Step 2 (alternative): remove a plain, even background by flood-filling from the edges.
// For photos marked "cutout": "flat" in product-photos.json, where the AI model cuts into dark packaging.
import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const IN = path.join(ROOT, "assets/norm");
const OUT = path.join(ROOT, "assets/cut");
const TOLERANCE = 22;
const FEATHER = 14;

const list = JSON.parse(await readFile(path.join(import.meta.dirname, "product-photos.json"), "utf8"));
await mkdir(OUT, { recursive: true });

for (const { out } of list.filter((p) => p.cutout === "flat")) {
  const { data, info } = await sharp(path.join(IN, `${out}.png`)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const corners = [0, w - 1, (h - 1) * w, (h - 1) * w + w - 1].map((p) => p * 4);
  const bg = [0, 1, 2].map((c) => Math.round(corners.reduce((s, i) => s + data[i + c], 0) / 4));
  const dist = (p) => {
    const i = p * 4;
    return Math.max(Math.abs(data[i] - bg[0]), Math.abs(data[i + 1] - bg[1]), Math.abs(data[i + 2] - bg[2]));
  };

  const seen = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const p = stack.pop();
    if (seen[p]) continue;
    const d = dist(p);
    if (d > TOLERANCE + FEATHER) continue;
    seen[p] = 1;
    data[p * 4 + 3] = d <= TOLERANCE ? 0 : Math.round(((d - TOLERANCE) / FEATHER) * 255);
    if (d > TOLERANCE) continue;
    const x = p % w;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (p >= w) stack.push(p - w);
    if (p < w * (h - 1)) stack.push(p + w);
  }

  await sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toFile(path.join(OUT, `${out}.png`));
  console.log("cut (flat)", out);
}
