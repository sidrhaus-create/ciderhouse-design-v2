// Contact sheet for label verification. usage: node scripts/contact-sheet.mjs <dir> <out.jpg> [cols] [cropTopFraction cropHeightFraction]
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const [dir, out, colsArg, topArg, hArg] = process.argv.slice(2);
const cols = Number(colsArg || 6), top = Number(topArg || 0), hf = Number(hArg || 1);
const files = fs.readdirSync(dir).filter((f) => /\.(png|webp|jpe?g)$/i.test(f)).sort();
const W = 300, H = 380, LBL = 34;
const tiles = [];
for (const [i, f] of files.entries()) {
  const src = sharp(path.join(dir, f));
  const m = await src.metadata();
  const crop = await src.extract({ left: 0, top: Math.round(m.height * top), width: m.width, height: Math.round(m.height * hf) }).resize(W, H, { fit: "contain", background: "#8a8a8a" }).flatten({ background: "#8a8a8a" }).png().toBuffer();
  const label = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${LBL}"><rect width="100%" height="100%" fill="#000"/><text x="6" y="22" font-family="Arial" font-size="15" fill="#fff">${f.replace(/&/g, "+").replace(/-front\.png$/, "")}  ${m.width}x${m.height}</text></svg>`);
  tiles.push({ input: crop, left: (i % cols) * W, top: Math.floor(i / cols) * (H + LBL) }, { input: label, left: (i % cols) * W, top: Math.floor(i / cols) * (H + LBL) + H });
}
const rows = Math.ceil(files.length / cols);
await sharp({ create: { width: cols * W, height: rows * (H + LBL), channels: 3, background: "#8a8a8a" } }).composite(tiles).jpeg({ quality: 82 }).toFile(out);
console.log(files.length, "files →", out);
