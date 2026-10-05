// Optimises the media of the curated Telegram stories (src/data/news-current.ts) locally with sharp.
// Usage: node scripts/news-telegram-images.mjs <dir with downloaded post media named <postId>_<n>.jpg>
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = process.argv[2];
// story slug → [cover, ...gallery] as <postId>_<index>
const MAP = {
  "serfing-v-konakovo": ["1003_1", "1003_0"],
  "komanda-na-zavode": ["975_0", "975_1", "975_2", "975_3", "969_0"],
  "festival-matushka-zemlya": ["944_0", "942_0", "944_1", "944_2", "950_0"],
  "kak-sok-stanovitsya-bezalkogolnym-sidrom": ["927_0", "927_1", "927_2", "927_3", "927_4", "927_5", "927_6", "927_7", "927_8"],
  "bezalkogolnaya-lineyka": ["925_0"],
  "russian-grill-fest-2026": ["915_3", "915_0", "915_2", "915_4", "915_5"],
  "novinka-pomelo-ananas": ["897_0"],
};
for (const [slug, files] of Object.entries(MAP)) {
  const dir = `public/assets/news/${slug}`;
  mkdirSync(dir, { recursive: true });
  for (const [i, f] of files.entries()) {
    const name = i === 0 ? "cover" : `g${i}`;
    const img = sharp(`${SRC}/${f}.jpg`).rotate();
    const a = await img.clone().webp({ quality: 84 }).toFile(`${dir}/${name}-1600.webp`);
    await img.clone().resize({ width: 800, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${dir}/${name}-800.webp`);
    console.log(slug, name, `${a.width}x${a.height}`);
  }
}
