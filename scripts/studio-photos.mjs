// Studio photography (D. Murashov, wfolio galleries supplied by the owner) → optimised web assets in public/assets/studio/.
// Usage: node scripts/studio-photos.mjs <dir with downloaded originals named by gallery index>
// Writes <name>-900.webp and <name>-1800.webp (never enlarged) and prints the manifest for src/data/photos.ts.
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = process.argv[2];
const MAP = {
  // gallery 2 — Studio_Bottles 05.03.26 (Double Tree 0,75)
  "024": "dt-075-six-beige", "026": "dt-075-apples-sage", "034": "dt-075-apple-portrait",
  // gallery 3 — Studio_Bottles 12.05.26 (the house line-up)
  "090": "house-lineup-white",
  // gallery 4 — Studio_Bottles 22.07.25 (Mister Bee, Double Tree)
  "113": "mb-trio-beige-wide", "115": "mb-duo-beige-wide", "116": "dt-white-trio-purple", "117": "dt-dry-apple-beige", "119": "dt-golden-apple-duo",
  // gallery 5 — Studio_Bottles 10.06.26 (0%)
  "127": "zero-trio-fruit-sage", "129": "zero-green-apple-duo", "131": "zero-pomegranate-raspberry-duo", "132": "zero-trio-fruit-grey", "136": "zero-cherry-duo", "137": "zero-green-apple-purple", "138": "zero-green-apple-sage", "140": "zero-cherry-sage",
  // gallery 6 — Studio_Bottles 30.06.26 (0% and Mister Bee groups)
  "159": "zero-trio-beige", "160": "zero-trio-purple", "161": "mb-trio-beige", "162": "mb-trio-purple",
  "165": "party-five-beige", "166": "party-five-purple",
  // gallery 7 — Studio_Bottles 26.08.26 (Double Tree 0,75)
  "178": "dt-075-five-beige", "179": "dt-075-lying-white", "180": "dt-075-lying-purple", "183": "dt-075-standing-beige",
};
mkdirSync("public/assets/studio", { recursive: true });
for (const [id, name] of Object.entries(MAP)) {
  const img = sharp(`${SRC}/${id}`, { failOn: "none" }).rotate();
  const m = await img.metadata();
  const big = await img.clone().resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/assets/studio/${name}-1800.webp`);
  await img.clone().resize({ width: 900, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`public/assets/studio/${name}-900.webp`);
  console.log(`${name}: { w: ${big.width}, h: ${big.height} }, // source ${m.width}x${m.height}`);
}
