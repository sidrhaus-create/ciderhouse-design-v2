import sys, glob, re, io, cairosvg
from PIL import Image
for f in glob.glob(sys.argv[1] + "/*.svg"):
    s = open(f, encoding="utf-8").read()
    m = re.search(r'viewBox="([\d.\-]+)[ ,]+([\d.\-]+)[ ,]+([\d.\-]+)[ ,]+([\d.\-]+)"', s)
    if not m: print("no viewBox", f); continue
    x, y, w, h = map(float, m.groups())
    W = 1200; H = round(W * h / w)
    im = Image.open(io.BytesIO(cairosvg.svg2png(bytestring=s.encode(), output_width=W, output_height=H))).convert("RGBA")
    bb = im.split()[3].point(lambda a: 255 if a > 8 else 0).getbbox()
    if not bb: continue
    k = w / W; pad = 2 * k
    nx, ny = x + bb[0] * k - pad, y + bb[1] * k - pad
    nw, nh = (bb[2] - bb[0]) * k + 2 * pad, (bb[3] - bb[1]) * k + 2 * pad
    s = s.replace(m.group(0), f'viewBox="{nx:.2f} {ny:.2f} {nw:.2f} {nh:.2f}"', 1)
    s = re.sub(r'(<svg[^>]*?)\s(width|height)="[^"]*"', r"\1", s, count=2)
    open(f, "w", encoding="utf-8").write(s)
    print("fit", f.split("/")[-1], round(nw), "x", round(nh))
