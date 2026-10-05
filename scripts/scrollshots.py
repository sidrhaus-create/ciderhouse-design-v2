"""Scroll through a page and capture viewport frames: python3 scripts/scrollshots.py /path width step count tag"""
import sys, time, os
from playwright.sync_api import sync_playwright
path, w, step, n, tag = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]), sys.argv[5]
h = 900 if w >= 1024 else 844
out = "/tmp/claude-0/qa"; os.makedirs(out, exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": w, "height": h}, is_mobile=w < 768, has_touch=w < 768)
    ctx.add_init_script("try{localStorage.setItem('ch-age-ok','1')}catch(e){}")
    pg = ctx.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto("http://localhost:3000" + path, wait_until="networkidle")
    time.sleep(2.5)
    shots = []
    for i in range(n):
        f = f"{out}/{tag}-{i:02d}.png"
        pg.screenshot(path=f); shots.append(f)
        if w >= 1024:
            for _ in range(step // 100): pg.mouse.wheel(0, 100); time.sleep(0.03)
        else:
            pg.evaluate(f"window.scrollBy(0,{step})")
        time.sleep(1.4)
    print("errors", errs, "height", pg.evaluate("document.documentElement.scrollHeight"))
    b.close()
from PIL import Image
ims = [Image.open(f) for f in shots]
cols = 4 if w >= 1024 else 6
tw = 480 if w >= 1024 else 200
ims = [i.resize((tw, int(i.height * tw / i.width))) for i in ims]
th = ims[0].height
s = Image.new("RGB", (cols * tw, ((len(ims) + cols - 1) // cols) * th), (40, 40, 40))
for k, i in enumerate(ims): s.paste(i, ((k % cols) * tw, (k // cols) * th))
s.save(f"{out}/{tag}-sheet.png")
