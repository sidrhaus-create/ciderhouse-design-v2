"""One-off migration of the news of ciderhouse.ru into the new site.
Reads the public feed of the official site (the old Tilda page is only the factual source), writes src/data/news.json and
downloads the article images into .news-src/ for scripts/news-images.mjs. Run: python scripts/news-migrate.py"""
import json, re, html, os, io, sys, urllib.request, urllib.parse

FEED = "847271457331"
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126", "Referer": "https://ciderhouse.ru/blog"}
SKIP = {"firmennii-merch-s-lyubovyu-ot-cider-hous"}  # merch is no longer part of the site
MAX_GALLERY = 8

def get(url, raw=False):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40) as r:
        b = r.read()
    return b if raw else json.loads(b.decode("utf-8"))

EMOJI = re.compile("[\U0001F000-\U0001FAFF☀-➿️‍⭐⬆✅]+")
FIX = [("XIXвеке", "XIX веке"), ("средствоот", "средство от")]
def clean(s):
    s = html.unescape(re.sub(r"<[^>]+>", "", re.sub(r"<br\s*/?>", " ", s))).replace("\xa0", " ")
    s = re.sub(r"[^.!?]*на этой странице[^.!?]*[.!?]?", "", s)  # sentences that only pointed to a link on the old site
    s = re.sub(r"\s*Где купить\?\s*$", "", s)
    for a, b in FIX: s = s.replace(a, b)
    s = EMOJI.sub("", s)
    s = re.sub(r"\s+([,.!?;:])", r"\1", re.sub(r"[ \t]+", " ", s)).strip()
    return s

def blocks(text):
    out, imgs = [], []
    text = html.unescape(text)  # embeds are stored escaped
    text = re.sub(r"<(script|style|iframe|video)[^>]*>.*?</\1>", "", text, flags=re.S)
    text = re.sub(r"<iframe[^>]*>", "", text, flags=re.S).replace("Your browser doesn't support HTML5 video tag", "")
    for m in re.finditer(r"<img[^>]+?(?:data-original|src)=\"([^\"]+)\"", text):
        if m.group(1).startswith("http") and m.group(1) not in imgs: imgs.append(m.group(1))
    # block-level split: headings, list items, text divs; <br> separates paragraphs
    text = re.sub(r"<h[1-6][^>]*>(.*?)</h[1-6]>", lambda m: "\n\x01" + m.group(1) + "\n", text, flags=re.S)
    text = re.sub(r"<li[^>]*>(.*?)</li>", lambda m: "\n\x02" + m.group(1) + "\n", text, flags=re.S)
    text = re.sub(r"<br\s*/?>|</div>|</p>|</figure>|</blockquote>", "\n", text)
    for line in text.split("\n"):
        kind = "h" if line.startswith("\x01") else "li" if line.startswith("\x02") else "p"
        t = clean(line.replace("\x01", "").replace("\x02", ""))
        m = re.match(r"^\d{1,2}\.\s+(.+)$", t)
        if m and kind == "p": kind, t = "li", m.group(1)  # hand-numbered lines are a list
        if t: out.append({"k": kind, "t": t})
    return out, imgs

feed = get(f"https://feeds.tildacdn.com/api/getfeed/?feeduid={FEED}&size=100&slice=1&sort%5Bdate%5D=desc&getparts=true")
os.makedirs(".news-src", exist_ok=True)
news, jobs = [], []
for p in feed["posts"]:
    slug = p["url"].rsplit("/", 1)[-1].split("-", 1)[1]
    if slug in SKIP: continue
    full = get("https://feeds.tildacdn.com/api/getpost/?postuid=" + p["uid"])["post"]
    body, imgs = blocks(full.get("text") or "")
    lead = clean(p.get("descr") or "")
    norm = lambda s: re.sub(r"\W+", "", s).lower()
    body = [b for b in body if norm(b["t"]) != norm(p["title"])]
    if body and lead and norm(body[0]["t"]) == norm(lead): body = body[1:]
    cover = p.get("image") or ""
    gallery = [u for u in imgs if u != cover][:MAX_GALLERY]
    item = {"slug": slug, "title": clean(p["title"]), "date": p["date"][:10], "tag": (p.get("parts") or "Новости").split(",")[0].strip() or "Новости",
            "lead": lead, "body": body, "sourceUrl": p["url"], "cover": None, "gallery": []}
    for i, u in enumerate([cover] + gallery):
        if not u: continue
        name = "cover" if i == 0 else f"g{i}"
        dst = f".news-src/{slug}__{name}"
        if not os.path.exists(dst):
            try: io.open(dst, "wb").write(get(u, raw=True))
            except Exception as e: print("image failed", slug, name, e, file=sys.stderr); continue
        jobs.append({"slug": slug, "name": name, "src": dst})
    news.append(item)
    print(item["date"], slug, "| blocks", len(body), "| images", (1 if cover else 0) + len(gallery))
json.dump(news, io.open(".news-src/news.raw.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
json.dump(jobs, io.open(".news-src/jobs.json", "w", encoding="utf-8"), ensure_ascii=False)
print(len(news), "posts,", len(jobs), "images")
