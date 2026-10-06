"""Packshots from the studio galleries (single bottles on white) → trimmed transparent webp in public/assets/products/<brand>/
and entries for src/data/packs.json. The white background is removed locally (flood fill from the frame edges, so white highlights
inside the bottle stay); nothing is uploaded anywhere. Usage: python scripts/studio-cutouts.py <dir with originals named by gallery index>"""
import io, json, os, subprocess, sys
from PIL import Image, ImageChops, ImageDraw, ImageFilter

SRC = sys.argv[1]
KEY = (255, 0, 255)
# gallery index → (slug, brand folder, file name, label as printed)
MAP = {
    # Mister Bee — gallery 22.07.25 (new flavours) and 30.06.26 (cleaner frames of the three existing ones)
    91: ("mister-bee-cherry-banana", "mister-bee", "cherry-banana", "Cherry Banana"),
    93: ("mister-bee-feijoa", "mister-bee", "feijoa", "Feijoa"),
    95: ("mister-bee-classic", "mister-bee", "classic", "Classic"),
    97: ("mister-bee-plum", "mister-bee", "plum", "Plum"),
    99: ("mister-bee-lemon", "mister-bee", "lemon", "Lemon"),
    101: ("mister-bee-cranberry", "mister-bee", "cranberry", "Cranberry"),
    103: ("mister-bee-pomegranate-grape", "mister-bee", "pomegranate-grape", "Pomegranate Grape"),
    143: ("mister-bee-cherry-blossom", "mister-bee", "cherry-blossom", "Cherry Blossom"),
    145: ("mister-bee-orange-grapefruit", "mister-bee", "orange-grapefruit", "Orange Grapefruit"),
    147: ("mister-bee-mandarin", "mister-bee", "mandarin", "Mandarin"),
    # Double Tree 0,75 — gallery 26.08.26 (the current white label) and 05.03.26 (cherry)
    171: ("double-tree-075-apple-cider-red", "double-tree", "075-apple-red", "Semi-Sweet Apple Cider"),
    172: ("double-tree-075-pear-cider", "double-tree", "075-pear", "Semi-Sweet Pear Cider"),
    173: ("double-tree-075-pomegranate-cider", "double-tree", "075-pomegranate", "Semi-Sweet Pomegranate Cider"),
    174: ("double-tree-075-apple-cider-green", "double-tree", "075-apple-green", "Semi-Dry Apple Cider"),
    175: ("double-tree-075-apple-cider-golden", "double-tree", "075-apple-golden", "Dry Apple Cider"),
    20: ("double-tree-075-cherry-cider", "double-tree", "075-cherry", "Cherry Cider"),
    # Double Tree 0,45 — gallery 22.07.25 (white label and the Dry Apple special edition)
    105: ("double-tree-grape-citrus", "double-tree", "grape-citrus", "Grape Citrus"),
    107: ("double-tree-double-cherry", "double-tree", "double-cherry", "Double Cherry"),
    109: ("double-tree-pomegranate-cherry", "double-tree", "pomegranate-cherry", "Pomegranate Cherry"),
    111: ("double-tree-dry-apple", "double-tree", "dry-apple", "Dry Apple Cider"),
    # D TREE PARTY — gallery 30.06.26
    149: ("double-tree-party-plum", "double-tree", "party-plum", "Plum Party Cider"),
    151: ("double-tree-party-pomegranate", "double-tree", "party-pomegranate", "Pomegranate Party Cider"),
    153: ("double-tree-party-cherry", "double-tree", "party-cherry", "Cherry Party Cider"),
    155: ("double-tree-party-raspberry", "double-tree", "party-raspberry", "Raspberry Party Cider"),
    157: ("double-tree-party-apple", "double-tree", "party-apple", "Apple Party Cider"),
    # White Phoenix — gallery 12.05.26
    40: ("white-phoenix-pomelo-pineapple", "white-phoenix", "pomelo-pineapple", "Pomelo Pineapple"),
    44: ("white-phoenix-bitter-lemon", "white-phoenix", "bitter-lemon", "Bitter Lemon"),
}

def cutout(path, size=1400, thresh=40):
    im = Image.open(path).convert("RGB"); im.thumbnail((size, size)); w, h = im.size
    fill = im.copy()
    for pt in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0), (0, h // 2), (w - 1, h // 2), (w // 2, h - 1)]:
        if fill.getpixel(pt) != KEY: ImageDraw.floodfill(fill, pt, KEY, thresh=thresh)
    r, g, b = fill.split()
    bg = ImageChops.multiply(ImageChops.multiply(r.point(lambda v: 255 if v == 255 else 0), g.point(lambda v: 255 if v == 0 else 0)), b.point(lambda v: 255 if v == 255 else 0))
    alpha = ImageChops.invert(bg).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.7))
    out = im.copy(); out.putalpha(alpha)
    box = alpha.getbbox()
    # drop most of the studio reflection under the bottle
    return out.crop((box[0], box[1], box[2], box[1] + int((box[3] - box[1]) * 0.955)))

packs = json.load(io.open("src/data/packs.json", encoding="utf-8"))
tmp = ".news-src/cutouts"; os.makedirs(tmp, exist_ok=True)
for i, (slug, brand, name, label) in MAP.items():
    im = cutout(f"{SRC}/{i:03d}")
    png = f"{tmp}/{slug}.png"; im.save(png)
    dst = f"public/assets/products/{brand}"; os.makedirs(dst, exist_ok=True)
    for h in (700, 1400):
        subprocess.run(["node", "-e", f"require('sharp')('{png}').resize({{height:{h},withoutEnlargement:true}}).webp({{quality:84}}).toFile('{dst}/{name}-{h}.webp').then(()=>{{}})"], check=True)
    packs[slug] = {"src": f"/assets/products/{brand}/{name}", "w": im.width, "h": im.height, "label": label, "source": f"studio gallery #{i}"}
    print(slug, im.size)
io.open("src/data/packs.json", "w", encoding="utf-8", newline="\n").write(json.dumps(packs, ensure_ascii=False, indent=1) + "\n")
print(len(packs), "packs")
