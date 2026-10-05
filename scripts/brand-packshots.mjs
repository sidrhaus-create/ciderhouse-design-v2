// Packshots from the owner's materials → trimmed transparent webp + a slug → asset map (src/data/packs.json).
// usage: node scripts/brand-packshots.mjs "<Desktop/Бренды>" "<ciderhouse-codex-starter/public/assets/products>"
// Every entry is  output slug : [source file, name exactly as printed on the label].  Labels were checked on contact sheets (scripts/contact-sheet.mjs).
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const [ARCHIVE, STARTER] = process.argv.slice(2);
const MB = path.join(ARCHIVE, "CiderHouse/CIDERHOUSE_SORTED/05_MISTER_BEE/05_ФОТО_И_ВИДЕО/ПРОДУКЦИЯ/Фотографии/Mister Bee/Лицевая этикетка");
const BC = path.join(ARCHIVE, "Bumble Coffee/bumble-tilda/public/assets");
const WP = path.join(STARTER, "white-phoenix"), DT = path.join(STARTER, "double-tree");
const wp = (f) => `white-phoenix-${f}-front.png`, dt = (f) => `double-tree-${f}-front.png`;

const JOBS = {
  "mister-bee": [MB, {
    "orange-grapefruit": ["Апельсин-грейпфрут (1).png", "Orange Grapefruit"],
    "mandarin": ["Мандарин (1).png", "Mandarin"],
    "cherry-blossom": ["Цветочная вишня (1).png", "Cherry Blossom"],
  }],
  "bumble-coffee": [BC, {
    "cherry": ["cherry.png", "Cherry"], "orange": ["orange.png", "Orange"], "pomegranate": ["pomegranate.png", "Pomegranate"],
    "raspberry": ["raspberry.png", "Raspberry"], "wild-berries": ["wild-berries.png", "Wild Berries"], "zero-cola": ["zero-cola.png", "Zero Cola"],
  }],
  "white-phoenix": [WP, {
    "passionfruit-cherry": [wp("cherry-passionfruit"), "Passionfruit Cherry"],
    "coconut-citrus": [wp("coconut-citrus"), "Coconut Citrus"],
    "black-cherry": [wp("dark-cherry"), "Black Cherry"],
    "grape-mandarin": [wp("grape-mandarin"), "Grape & Mandarin"],
    "grapefruit-passion-fruit": [wp("grapefruit-passionfruit"), "Grapefruit & Passion Fruit"],
    "mango-chilli": [wp("mango-chili"), "Mango Chilli"],
    "mango-citrus": [wp("mango-citrus"), "Mango Citrus"],
    "melon-mint": [wp("melon-mint"), "Melon & Mint"],
    "peach-apricot": [wp("peach-apricot"), "Peach & Apricot"],
    "peach-banana": [wp("peach-banana"), "Peach & Banana"],
    "dragon-fruit-kiwi": [wp("pitaya-kiwi"), "Dragon Fruit Kiwi"],
    "pomegranate-raspberry": [wp("pomegranate-raspberry"), "Pomegranate Raspberry"],
    "sea-buckthorn-orange-lemon": [wp("sea-buckthorn-lemon"), "Sea Buckthorn, Orange & Lemon"],
    "red-orange-spritz": [wp("sicilian-orange"), "Red Orange Spritz"],
    "strawberry": [wp("strawberry"), "Strawberry"],
  }],
  "double-tree": [DT, {
    "black-currant": [dt("045-black-currant"), "Black Currant"],
    "caribbean-kiwi": [dt("045-caribbean-kiwi"), "Caribbean Kiwi"],
    "coconut-raspberry": [dt("045-coconut-raspberry"), "Coconut & Raspberry"],
    "dark-cherry": [dt("045-dark-cherry"), "Dark Cherry"],
    "wild-berries": [dt("045-forest-berries"), "Wild Berries"],
    "green-apple": [dt("045-green-apple"), "Green Apple"],
    "lemon-lime": [dt("045-lemon-lime"), "Lemon Lime"],
    "yellow-pear": [dt("045-pear"), "Yellow Pear"],
    "pomegranate-mint": [dt("045-pomegranate-mint"), "Pomegranate & Mint"],
    "raspberry": [dt("045-raspberry"), "Raspberry"],
    "red-apple": [dt("045-red-apple"), "Red Apple"],
    "watermelon-mint": [dt("045-watermelon-mint"), "Watermelon & Mint"],
    "075-cherry-cider": [dt("075-dark-cherry"), "Cherry Cider"],
    "075-apple-cider-green": [dt("075-green-apple"), "Apple Cider"],
    "075-pomegranate-cider": [dt("075-pomegranate-raspberry"), "Pomegranate Cider"],
    "075-apple-cider-red": [dt("075-red-apple"), "Apple Cider"],
    "075-pear-cider": [dt("075-yellow-pear"), "Pear Cider"],
  }],
};

const map = {};
for (const [brand, [dir, items]] of Object.entries(JOBS)) {
  const dest = `public/assets/products/${brand}/`;
  fs.mkdirSync(dest, { recursive: true });
  for (const [slug, [file, label]] of Object.entries(items)) {
    const trimmed = await sharp(path.join(dir, file)).trim().toBuffer();
    const m = await sharp(trimmed).metadata();
    for (const h of [700, 1400]) await sharp(trimmed).resize({ height: Math.min(h, m.height) }).webp({ quality: 86 }).toFile(`${dest}${slug}-${h}.webp`);
    map[`${brand}-${slug}`] = { src: `/assets/products/${brand}/${slug}`, w: m.width, h: m.height, label, source: file };
  }
}
fs.writeFileSync("src/data/packs.json", JSON.stringify(map, null, 1) + "\n");
const sizes = Object.entries(map).map(([k, v]) => `${k} ${v.w}x${v.h}`);
console.log(sizes.length, "packs;", "min source height", Math.min(...Object.values(map).map((v) => v.h)));
if (process.argv[4]) { // debug crop of one label for reading small print
  const t = await sharp(path.join(WP, wp("cherry-passionfruit"))).trim().toBuffer(), mm = await sharp(t).metadata();
  await sharp(t).extract({ left: 0, top: Math.round(mm.height * 0.52), width: mm.width, height: Math.round(mm.height * 0.36) }).resize({ width: 900 }).flatten({ background: "#888" }).jpeg().toFile(process.argv[4]);
}
