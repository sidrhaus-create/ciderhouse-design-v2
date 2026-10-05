"""QA harness: screenshots, console errors, horizontal overflow, broken images/links.
usage: python3 scripts/qa.py <paths comma> <widths comma> [--full] [--scroll N] [--tag name]
"""
import sys, json, os, time
from playwright.sync_api import sync_playwright

BASE = os.environ.get("BASE", "http://localhost:3000")
paths = sys.argv[1].split(",")
widths = [int(w) for w in sys.argv[2].split(",")]
full = "--full" in sys.argv
reduced = "--reduced" in sys.argv
gate = "--gate" in sys.argv
scroll = int(sys.argv[sys.argv.index("--scroll") + 1]) if "--scroll" in sys.argv else 0
tag = sys.argv[sys.argv.index("--tag") + 1] if "--tag" in sys.argv else "s"
out = "/tmp/claude-0/qa"; os.makedirs(out, exist_ok=True)
report = []
with sync_playwright() as p:
    b = p.chromium.launch()
    for w in widths:
        h = 900 if w >= 1024 else (1024 if w == 768 else 844)
        ctx = b.new_context(viewport={"width": w, "height": h}, device_scale_factor=1, reduced_motion="reduce" if reduced else "no-preference",
                            is_mobile=w < 768, has_touch=w < 768)
        if not gate:
            ctx.add_init_script("try{localStorage.setItem('ch-age-ok','1')}catch(e){}")
        for path in paths:
            pg = ctx.new_page()
            errs = []
            pg.on("console", lambda m: errs.append(m.type + ": " + m.text) if m.type in ("error", "warning") else None)
            pg.on("pageerror", lambda e: errs.append("pageerror: " + str(e)))
            bad = []
            pg.on("response", lambda r: bad.append(f"{r.status} {r.url}") if r.status >= 400 else None)
            pg.goto(BASE + path, wait_until="networkidle")
            time.sleep(2.2)
            if scroll:
                # progressive scroll so ScrollTriggers/IO fire
                total = pg.evaluate("document.documentElement.scrollHeight")
                y = 0
                while y < min(scroll, total):
                    y += 400; pg.mouse.wheel(0, 400); time.sleep(0.12)
                time.sleep(1.2)
            ov = pg.evaluate("""() => { const W = document.documentElement.clientWidth; const o=[];
              document.querySelectorAll('body *').forEach(e=>{ const r=e.getBoundingClientRect(); if(r.right>W+1 && r.width>0 && getComputedStyle(e).position!=='fixed'){ let p=e.parentElement, clipped=false; while(p){ const s=getComputedStyle(p); if(s.overflowX!=='visible'){clipped=true;break} p=p.parentElement } if(!clipped) o.push((e.tagName+'.'+(e.className&&e.className.baseVal===undefined?e.className:'')).slice(0,80)+' r='+Math.round(r.right)) }});
              return {sw: document.documentElement.scrollWidth, cw: W, items: o.slice(0,8)} }""")
            imgs = pg.evaluate("[...document.images].filter(i=>i.complete && i.naturalWidth===0 && i.loading!=='lazy').map(i=>i.src)")
            name = f"{out}/{tag}-{path.strip('/').replace('/','_') or 'home'}-{w}.png"
            pg.screenshot(path=name, full_page=full)
            report.append({"path": path, "w": w, "errors": errs[:6], "bad": bad[:6], "overflow": ov if ov["sw"] > ov["cw"] or ov["items"] else None, "brokenImgs": imgs[:4], "shot": name})
            pg.close()
        ctx.close()
    b.close()
for r in report:
    flag = "OK " if not (r["errors"] or r["bad"] or r["overflow"] or r["brokenImgs"]) else "!! "
    print(flag, r["path"], r["w"], json.dumps({k: v for k, v in r.items() if v and k not in ("path", "w", "shot")}, ensure_ascii=False)[:900])
