// Second half of the news migration: converts the downloaded article images to web sizes (locally, with sharp) and writes
// src/data/news.json with their paths and dimensions. Run after scripts/news-migrate.py: node scripts/news-images.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const news = JSON.parse(readFileSync(".news-src/news.raw.json", "utf8"));
const jobs = JSON.parse(readFileSync(".news-src/jobs.json", "utf8"));
const bySlug = Object.fromEntries(news.map((n) => [n.slug, n]));

for (const j of jobs) {
  const dir = `public/assets/news/${j.slug}`;
  mkdirSync(dir, { recursive: true });
  try {
    const img = sharp(j.src, { failOn: "none" }).rotate();
    const meta = await img.metadata();
    const W = Math.min(1600, meta.width ?? 1600);
    const big = await img.clone().resize({ width: W, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${dir}/${j.name}-1600.webp`);
    await img.clone().resize({ width: Math.min(800, W), withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${dir}/${j.name}-800.webp`);
    const rec = { src: `/assets/news/${j.slug}/${j.name}`, w: big.width, h: big.height };
    if (j.name === "cover") bySlug[j.slug].cover = rec; else bySlug[j.slug].gallery.push(rec);
  } catch (e) { console.error("skip", j.slug, j.name, String(e).slice(0, 80)); }
}
writeFileSync("src/data/news.json", JSON.stringify(news, null, 1) + "\n");
console.log(news.length, "posts written;", news.filter((n) => n.cover).length, "with cover");
