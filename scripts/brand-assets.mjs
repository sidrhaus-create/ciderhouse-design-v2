// Extracts the 0% graphic of the non-alcoholic line from the owner's source (an SVG wrapping a transparent PNG)
// and reports the copied logo files. usage: node scripts/brand-assets.mjs "<path to Zero Cider/nol.svg>" [contact-sheet.jpg]
import sharp from "sharp";
import fs from "node:fs";

const [src, sheet] = process.argv.slice(2);
const OUT = "public/assets/brand/";
const svg = fs.readFileSync(src, "utf8");
const m = svg.match(/base64,([A-Za-z0-9+/=\s]+)/);
if (!m) throw new Error("no embedded raster in " + src);
const buf = Buffer.from(m[1].replace(/\s/g, ""), "base64");
const meta = await sharp(buf).metadata();
console.log("0% source", meta.width, meta.height, "alpha", meta.hasAlpha);
for (const w of [480, 900]) await sharp(buf).resize(w).webp({ quality: 88 }).toFile(`${OUT}zero-percent-${w}.webp`);

const files = ["double-tree-logo-a.png", "double-tree-logo-b.png", "white-phoenix-logo.png"];
for (const f of files) {
  const st = await sharp(OUT + f).stats(), me = await sharp(OUT + f).metadata();
  console.log(f, me.width, me.height, "alpha", me.hasAlpha, "rgb", st.channels.slice(0, 3).map((c) => Math.round(c.mean)).join(","), "a", st.channels[3] ? Math.round(st.channels[3].mean) : "-");
}
if (sheet) {
  const tiles = [];
  for (const f of [...files, "zero-percent-480.webp"]) tiles.push(await sharp(OUT + f).resize(360, 240, { fit: "contain", background: "#888" }).flatten({ background: "#888" }).png().toBuffer());
  await sharp({ create: { width: 1440, height: 240, channels: 3, background: "#888" } }).composite(tiles.map((t, i) => ({ input: t, left: i * 360, top: 0 }))).jpeg().toFile(sheet);
}

// Logos → trimmed, transparent, in ink (black) and reversed (white) versions.
const ink = async (input, name, opaque) => {
  let img = sharp(OUT + input);
  if (opaque) { // black line art on white → alpha from luminance
    const { data, info } = await img.grayscale().raw().toBuffer({ resolveWithObject: true });
    const rgba = Buffer.alloc(info.width * info.height * 4);
    for (let i = 0; i < info.width * info.height; i++) rgba[i * 4 + 3] = 255 - data[i];
    img = sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } });
  }
  const black = await img.png().toBuffer();
  const trimmed = await sharp(black).trim().png().toBuffer();
  const { data, info } = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const b = Buffer.from(data), w = Buffer.from(data);
  for (let i = 0; i < info.width * info.height; i++) { b[i * 4] = b[i * 4 + 1] = b[i * 4 + 2] = 0; w[i * 4] = w[i * 4 + 1] = w[i * 4 + 2] = 255; }
  const raw = { raw: { width: info.width, height: info.height, channels: 4 } };
  await sharp(b, raw).png({ compressionLevel: 9 }).toFile(`${OUT}${name}-black.png`);
  await sharp(w, raw).png({ compressionLevel: 9 }).toFile(`${OUT}${name}-white.png`);
  console.log(name, info.width, info.height);
};
await ink("double-tree-logo-a.png", "double-tree-logo", false);
await ink("white-phoenix-logo.png", "white-phoenix-logo", true);
