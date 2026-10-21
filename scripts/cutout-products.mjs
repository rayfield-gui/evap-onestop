// Step 2 of 3: AI background removal, fully local. Output: assets/cut/<name>.png (transparent)
import { removeBackground } from "@imgly/background-removal-node";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const IN = path.join(ROOT, "assets/norm");
const OUT = path.join(ROOT, "assets/cut");
const only = process.argv.slice(2);

await mkdir(OUT, { recursive: true });
for (const f of (await readdir(IN)).filter((f) => f.endsWith(".png"))) {
  if (only.length && !only.includes(f.replace(/\.png$/, ""))) continue;
  const blob = await removeBackground(pathToFileURL(path.join(IN, f)).href, {
    model: "medium",
    output: { format: "image/png" },
  });
  await writeFile(path.join(OUT, f), Buffer.from(await blob.arrayBuffer()));
  console.log("cut", f);
}
