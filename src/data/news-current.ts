import type { Post } from "./news";

/** Current news, curated from the official Telegram channel @ciderhousee (reviewed 2026-10-05).
 *  Telegram → editorial review → this file. Nothing is loaded from Telegram at runtime.
 *  Each story keeps its provenance (`sourcePostIds`, `sourceUrl`); the wording is edited for the site, the facts are only those
 *  stated in the posts. Giveaways, polls, memes and Friday posts stay in the channel.
 *  Images: the posts' own media, optimised locally by scripts/news-telegram-images.mjs. */
const tg = (id: number) => `https://t.me/ciderhousee/${id}`;
const img = (slug: string, name: string, w: number, h: number) => ({ src: `/assets/news/${slug}/${name}`, w, h });

export const CURRENT: Post[] = [
  {
    slug: "serfing-v-konakovo",
    title: "Серфинг в Конаково: наши напитки — в призах",
    date: "2026-08-09",
    tag: "События",
    lead: "Команда CIDERHOUSE провела выходные на соревнованиях по серфингу в Конаково.",
    body: [
      { k: "p", t: "Одни из самых насыщенных выходных лета: мы ездили на соревнования по серфингу в Конаково." },
      { k: "p", t: "Продукция CIDERHOUSE была представлена на награждении — её получили победители и участники соревнований." },
    ],
    cover: img("serfing-v-konakovo", "cover", 533, 800),
    gallery: [img("serfing-v-konakovo", "g1", 533, 800)],
    sourceType: "telegram", sourceChannel: "@ciderhousee", sourcePostIds: [1003, 1005], sourceUrl: tg(1005),
    featured: true,
  },
  {
    slug: "komanda-na-zavode",
    title: "Бросаем удалёнку и мчим на завод",
    date: "2026-07-15",
    tag: "Производство",
    lead: "Команда, которая ведёт наши соцсети, провела день на производстве сидра — от цеха до лаборатории.",
    body: [
      { k: "p", t: "«Бросаем удалёнку и мчим на завод» — так выглядел один наш понедельник. Мы решили проверить, где на самом деле круче: дома с ноутбуком или на производстве." },
      { k: "p", t: "За день увидели, как бродит сидр, прошли по цеху и складу и заглянули в лабораторию — туда, где напиток проверяют перед розливом." },
      { k: "h", t: "Плюсы работы на заводе, которые мы нашли" },
      { k: "li", t: "Можно попробовать себя в чём-то новом — например, в лаборатории." },
      { k: "li", t: "Частые дегустации — исключительно по работе." },
      { k: "li", t: "Десять тысяч шагов за день набираются сами собой." },
      { k: "li", t: "Свежие ягоды в обеденный перерыв." },
      { k: "p", t: "Минус тоже нашёлся: на созвоне уже не скажешь, что не работает камера." },
      { k: "p", t: "В сентябре мы вернулись на завод ещё раз: поговорили с его руководителем и продолжили изучать производство." },
    ],
    cover: img("komanda-na-zavode", "cover", 640, 800),
    gallery: [img("komanda-na-zavode", "g1", 640, 800), img("komanda-na-zavode", "g2", 640, 800), img("komanda-na-zavode", "g3", 640, 800)],
    sourceType: "telegram", sourceChannel: "@ciderhousee", sourcePostIds: [969, 975, 1033, 1035], sourceUrl: tg(975),
    more: { href: "/production/", label: "Подробнее о производстве" },
  },
  {
    slug: "festival-matushka-zemlya",
    title: "Фестиваль «Матушка Земля» в Петербурге",
    date: "2026-06-20",
    tag: "События",
    lead: "Два дня в центре Петербурга: стенд CIDERHOUSE, сидр и медовуха под открытым небом.",
    body: [
      { k: "p", t: "CIDERHOUSE стал участником фестиваля «Матушка Земля» — фестиваля современной российской культуры, гастрономии, музыки и живого общения." },
      { k: "p", t: "Петербург встретил тепло: солнце, люди, музыка. Пока мы разливали сидр и медовуху, вокруг водили хороводы, пели и играли в ручеёк — под открытым небом, в центре города." },
      { k: "p", t: "Стенд работал оба дня фестиваля, 20 и 21 июня." },
    ],
    cover: img("festival-matushka-zemlya", "cover", 533, 800),
    gallery: [img("festival-matushka-zemlya", "g1", 533, 800), img("festival-matushka-zemlya", "g2", 533, 800), img("festival-matushka-zemlya", "g3", 533, 800), img("festival-matushka-zemlya", "g4", 533, 800)],
    sourceType: "telegram", sourceChannel: "@ciderhousee", sourcePostIds: [938, 942, 944, 950], sourceUrl: tg(942),
  },
  {
    slug: "kak-sok-stanovitsya-bezalkogolnym-sidrom",
    title: "Как яблочный сок становится безалкогольным сидром",
    date: "2026-06-05",
    tag: "Производство",
    lead: "Наглядная схема: путь напитка по этапам, каждый из которых влияет на вкус, аромат и качество.",
    body: [
      { k: "p", t: "Мы подготовили схему, которая показывает путь производства безалкогольного сидра — от яблок до отгрузки." },
      { k: "li", t: "Всё начинается с яблок: для сидра выбирают сорта с правильным балансом сладости и кислотности." },
      { k: "li", t: "Сок поступает на завод, где его подготавливают и направляют в ёмкости." },
      { k: "li", t: "Брожение — вкус становится глубже, появляются натуральные сидровые ноты." },
      { k: "li", t: "Остановка брожения охлаждением." },
      { k: "li", t: "Фильтрация и карбонизация: из напитка удаляют лишние частицы, осадок и остатки дрожжей, затем насыщают его газом." },
      { k: "li", t: "Контроль качества: перед розливом напиток проверяют по ключевым параметрам." },
      { k: "li", t: "Розлив: готовый безалкогольный сидр поступает на линию." },
      { k: "li", t: "Отгрузка: сидр упаковывают и отправляют на склады и в магазины." },
    ],
    cover: img("kak-sok-stanovitsya-bezalkogolnym-sidrom", "cover", 800, 800),
    gallery: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => img("kak-sok-stanovitsya-bezalkogolnym-sidrom", `g${n}`, 800, 800)),
    sourceType: "telegram", sourceChannel: "@ciderhousee", sourcePostIds: [927], sourceUrl: tg(927),
    more: { href: "/production/", label: "Подробнее о производстве" },
  },
  {
    slug: "bezalkogolnaya-lineyka",
    title: "Любимые вкусы — теперь без градуса",
    date: "2026-05-27",
    tag: "Продукт",
    lead: "CIDERHOUSE выпустил безалкогольную линейку: самые популярные вкусы в версии 0%.",
    body: [
      { k: "p", t: "Мы взяли самые популярные вкусы и сделали их безалкогольными. Теперь любимые напитки можно пить и за рулём, и в понедельник — и просто потому, что хочется." },
      { k: "p", t: "С июля безалкогольный сидр можно заказать на Ozon. Поставки в розничные магазины налаживаются." },
    ],
    cover: img("bezalkogolnaya-lineyka", "cover", 640, 800),
    gallery: [],
    sourceType: "telegram", sourceChannel: "@ciderhousee", sourcePostIds: [925, 956, 969], sourceUrl: tg(925),
    more: { href: "/non-alcoholic/", label: "Направление 0%" },
  },
  {
    slug: "russian-grill-fest-2026",
    title: "Russian Grill Fest 2026: три дня в Москве",
    date: "2026-05-22",
    tag: "События",
    lead: "22–24 мая CIDERHOUSE работал на барбекю-фестивале в бизнес-квартале «Арма».",
    body: [
      { k: "p", t: "Russian Grill Fest 2026 — три дня огня, дыма, мяса и живой музыки в Москве, в бизнес-квартале «Арма». Мы приехали на фестиваль с сидром и медовухой и помогали гостям подобрать напиток к стейку." },
      { k: "p", t: "Все три дня на стенде разливали сидр и медовуху и дарили подарки. Тепло, людно и вкусно — таким фестиваль и запомнился." },
    ],
    cover: img("russian-grill-fest-2026", "cover", 533, 800),
    gallery: [img("russian-grill-fest-2026", "g1", 533, 800), img("russian-grill-fest-2026", "g2", 533, 800), img("russian-grill-fest-2026", "g3", 533, 800), img("russian-grill-fest-2026", "g4", 533, 800)],
    sourceType: "telegram", sourceChannel: "@ciderhousee", sourcePostIds: [901, 910, 915, 923], sourceUrl: tg(910),
  },
  {
    slug: "novinka-pomelo-ananas",
    title: "Новинка: медовуха «Помело — ананас»",
    date: "2026-04-10",
    tag: "Продукт",
    lead: "В линейке White Phoenix — новый тропический вкус.",
    body: [
      { k: "p", t: "Встречайте новинку — медовуху White Phoenix Pomelo Pineapple, «Помело — ананас»." },
      { k: "p", t: "Сочный цитрус, сладость ананаса и мягкий медовый финал: маленькое путешествие туда, где всегда тепло." },
    ],
    cover: img("novinka-pomelo-ananas", "cover", 601, 800),
    gallery: [],
    sourceType: "telegram", sourceChannel: "@ciderhousee", sourcePostIds: [895, 897], sourceUrl: tg(897),
    more: { href: "/brands/white-phoenix/", label: "Линейка White Phoenix" },
  },
];
