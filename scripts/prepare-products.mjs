// Step 1 of 3: auto-orient, apply manual rotation, downscale. Output: assets/norm/<out>.png
// Runs separately from the background-removal step because the two sharp versions can't share a process.
import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "Products/Phanter");
const OUT = path.join(ROOT, "assets/norm");
const list = JSON.parse(await readFile(path.join(import.meta.dirname, "product-photos.json"), "utf8"));

await mkdir(OUT, { recursive: true });
// `crop` is [left, top, right, bottom] as fractions, for photos with other objects beside the product.
for (const { file, out, rotate = 0, crop } of list) {
  let img = await sharp(path.join(SRC, file)).rotate().rotate(rotate).toBuffer();
  if (crop) {
    const { width, height } = await sharp(img).metadata();
    const [l, t, r, b] = crop;
    img = await sharp(img)
      .extract({
        left: Math.round(l * width),
        top: Math.round(t * height),
        width: Math.round((r - l) * width),
        height: Math.round((b - t) * height),
      })
      .toBuffer();
  }
  await sharp(img)
    .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
    .png()
    .toFile(path.join(OUT, `${out}.png`));
  console.log("prepared", out);
}
