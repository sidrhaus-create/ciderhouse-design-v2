// Builds optimized, responsive assets from original CIDERHOUSE source files.
// Source: user's own repository github.com/sidrhaus-create/si (assets/), cloned locally.
// Packaging is never redrawn: only lossless-geometry ops (trim to a shared box, resize, re-encode).
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = process.env.SRC || "/home/claude/sidrhaus-create/si/assets";
const OUT = path.resolve("public/assets");
const mk = (p) => fs.mkdirSync(p, { recursive: true });
const manifest = [];
const log = (entry) => manifest.push(entry);

// ---------- brand SVGs (copied verbatim) ----------
mk(`${OUT}/brand`);
const svgs = [
  ["round-logo.svg", "ciderhouse-round.svg", "CIDERHOUSE round seal (Double Tree · White Phoenix)", "CIDERHOUSE"],
  ["phoenix-mark.svg", "white-phoenix-mark.svg", "White Phoenix bird mark (title in file: White Phoenix)", "White Phoenix"],
  ["zerocider_logo.svg", "zerocider-logo.svg", "ZER° CIDER wordmark with seal", "ZER° CIDER"],
];
for (const [src, dst, type, brand] of svgs) {
  fs.copyFileSync(`${SRC}/${src}`, `${OUT}/brand/${dst}`);
  log({ type, brand, source: `sidrhaus-create/si/assets/${src}`, local: `/assets/brand/${dst}` });
}

// ---------- retail partner logos ----------
mk(`${OUT}/partners`);
const partners = { 1: "perekrestok", 2: "pyaterochka", 3: "magnit", 4: "da", 5: "lenta", 6: "okey", 7: "monetka", 8: "x5-group", 9: "vinlab" };
for (const [n, slug] of Object.entries(partners)) {
  fs.copyFileSync(`${SRC}/partners/partner-01 (${n}).svg`, `${OUT}/partners/${slug}.svg`);
  log({ type: "retail partner logo", brand: slug, source: `sidrhaus-create/si/assets/partners/partner-01 (${n}).svg`, local: `/assets/partners/${slug}.svg` });
}

// ---------- 0% bottle cutouts: trim to the UNION bbox so all three keep identical scale ----------
const bottles = [
  ["zerocider_asset_01_19e505f673.png", "wp-pomegranate-raspberry-0", "White Phoenix 0% Pomegranate Raspberry"],
  ["zerocider_asset_02_d7f5462e4a.png", "dt-green-apple-0", "Double Tree 0% Green Apple"],
  ["zerocider_asset_03_37d162af20.png", "wp-cherry-0", "White Phoenix 0% Cherry"],
];
const boxes = [];
for (const [src] of bottles) {
  const { data, info } = await sharp(`${SRC}/${src}`).ensureAlpha().extractChannel("alpha").raw().toBuffer({ resolveWithObject: true });
  let x0 = info.width, y0 = info.height, x1 = 0, y1 = 0;
  for (let y = 0; y < info.height; y += 2) for (let x = 0; x < info.width; x += 2) {
    if (data[y * info.width + x] > 10) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  boxes.push({ x0, y0, x1, y1, w: info.width, h: info.height });
}
const U = boxes.reduce((a, b) => ({ x0: Math.min(a.x0, b.x0), y0: Math.min(a.y0, b.y0), x1: Math.max(a.x1, b.x1), y1: Math.max(a.y1, b.y1) }));
const pad = 24;
const ext = { left: Math.max(0, U.x0 - pad), top: Math.max(0, U.y0 - pad) };
ext.width = Math.min(boxes[0].w - ext.left, U.x1 - U.x0 + pad * 2);
ext.height = Math.min(boxes[0].h - ext.top, U.y1 - U.y0 + pad * 2);
mk(`${OUT}/products/zero`);
for (const [src, slug, name] of bottles) {
  for (const w of [240, 400, 600, 900]) {
    await sharp(`${SRC}/${src}`).extract(ext).resize({ width: w }).webp({ quality: 86, alphaQuality: 90 }).toFile(`${OUT}/products/zero/${slug}-${w}.webp`);
  }
  log({ type: "product cutout (original photography, trimmed to shared box)", brand: name, source: `sidrhaus-create/si/assets/${src}`, local: `/assets/products/zero/${slug}-{240,400,600,900}.webp` });
}
fs.writeFileSync(`${OUT}/products/zero/ratio.json`, JSON.stringify({ width: ext.width, height: ext.height }));

// ---------- studio reel (49 frames of the 0% trio, crane-down move) ----------
mk(`${OUT}/zero/reel`);
const frames = fs.readdirSync(SRC).filter((f) => /^zerocider_asset_\d+_.*\.webp$/.test(f)).sort();
let i = 0;
for (const f of frames) {
  i++;
  const n = String(i).padStart(2, "0");
  await sharp(`${SRC}/${f}`).webp({ quality: 74 }).toFile(`${OUT}/zero/reel/${n}.webp`);
  await sharp(`${SRC}/${f}`).resize({ width: 640 }).webp({ quality: 70 }).toFile(`${OUT}/zero/reel/${n}-s.webp`);
}
log({ type: `studio film frames x${frames.length}`, brand: "ZER° trio", source: "sidrhaus-create/si/assets/zerocider_asset_04..52", local: "/assets/zero/reel/NN(.|-s).webp" });

// stills
for (const [n, name] of [["01", "caps"], ["20", "close"], [String(frames.length), "trio"]]) {
  for (const w of [640, 1100]) await sharp(`${OUT}/zero/reel/${n}.webp`).resize({ width: w }).webp({ quality: 80 }).toFile(`${OUT}/zero/still-${name}-${w}.webp`);
}

// ---------- open slots for originals not yet retrieved ----------
for (const slot of ["white-phoenix", "double-tree", "mister-bee", "bumble-coffee", "migliore", "production", "merch"]) {
  mk(`${OUT}/slots/${slot}`);
  fs.writeFileSync(`${OUT}/slots/${slot}/README.md`, `# Slot: ${slot}\n\nDrop ORIGINAL assets from ciderhouse.ru / brand owner here.\nNaming: <product-slug>-<width>.webp (transparent cutouts preferred), see src/data/catalog.ts.\nNever substitute invented renders.\n`);
}

fs.writeFileSync("ASSET_MANIFEST.json", JSON.stringify(manifest, null, 2));
console.log("ok", ext, frames.length, "frames");

// ---------- normalise partner logo viewBoxes to their visible artwork (artwork itself untouched) ----------
import { execFileSync } from "node:child_process";
execFileSync("python3", ["scripts/fit-svg.py", `${OUT}/partners`], { stdio: "inherit" });
