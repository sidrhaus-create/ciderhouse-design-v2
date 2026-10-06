/** The flavour dictionary: ONE Russian display name per product slug. Catalogue, brand pages, product sheets, alt texts and
 *  metadata all read it through `Product.nameRu` — Russian names are never typed by hand in components.
 *
 *  evidence:
 *   "official" — the name as published in the catalogue of ciderhouse.ru or on zerocider materials (checked 2026-10-05);
 *   "owner"    — the name from the owner's own materials (price tags, flavour sheets, archive file names);
 *   "label"    — not found in Russian anywhere: a direct reading of the English label. Listed in CONTENT_SOURCES.md for confirmation.
 *  Notation: sentence case, two fruits joined with an em dash. */
export type Flavour = { ru: string; evidence: "official" | "owner" | "label" };

export const FLAVOURS: Record<string, Flavour> = {
  // ZER° CIDER 0,0%
  "zero-green-apple": { ru: "Зелёное яблоко", evidence: "owner" },
  "zero-cherry": { ru: "Вишня", evidence: "owner" },
  "zero-pomegranate-raspberry": { ru: "Гранат — малина", evidence: "owner" },

  // White Phoenix — catalogue of ciderhouse.ru
  "white-phoenix-passionfruit-cherry": { ru: "Вишня — маракуйя", evidence: "official" },
  "white-phoenix-coconut-citrus": { ru: "Кокос — цитрус", evidence: "official" },
  "white-phoenix-black-cherry": { ru: "Тёмная вишня", evidence: "official" },
  "white-phoenix-grape-mandarin": { ru: "Виноград — мандарин", evidence: "official" },
  "white-phoenix-grapefruit-passion-fruit": { ru: "Грейпфрут — маракуйя", evidence: "official" },
  "white-phoenix-mango-chilli": { ru: "Манго — чили", evidence: "official" },
  "white-phoenix-mango-citrus": { ru: "Манго — цитрус", evidence: "official" },
  "white-phoenix-melon-mint": { ru: "Дыня — мята", evidence: "official" },
  "white-phoenix-peach-apricot": { ru: "Персик — абрикос", evidence: "official" },
  "white-phoenix-peach-banana": { ru: "Персик — банан", evidence: "official" },
  "white-phoenix-dragon-fruit-kiwi": { ru: "Питахайя — киви", evidence: "official" },
  "white-phoenix-pomegranate-raspberry": { ru: "Гранат — малина", evidence: "official" },
  // the site says «Облепиха-Лимон»; the label and the owner's archive file say sea buckthorn, orange & lemon
  "white-phoenix-sea-buckthorn-orange-lemon": { ru: "Облепиха — апельсин — лимон", evidence: "owner" },
  "white-phoenix-red-orange-spritz": { ru: "Сицилийский апельсин", evidence: "official" },
  "white-phoenix-strawberry": { ru: "Клубника", evidence: "official" },
  "white-phoenix-pomelo-pineapple": { ru: "Помело — ананас", evidence: "owner" }, // Telegram, 10.04.2026; archive file «Помело Ананас»
  "white-phoenix-bitter-lemon": { ru: "Горький лимон", evidence: "label" },

  // Double Tree 0,45 — catalogue of ciderhouse.ru and the owner's price tags
  "double-tree-green-apple": { ru: "Зелёное яблоко", evidence: "official" },
  "double-tree-red-apple": { ru: "Красное яблоко", evidence: "official" },
  "double-tree-dark-cherry": { ru: "Тёмная вишня", evidence: "official" },
  "double-tree-yellow-pear": { ru: "Груша", evidence: "official" },
  "double-tree-raspberry": { ru: "Малина", evidence: "official" },
  "double-tree-wild-berries": { ru: "Лесные ягоды", evidence: "owner" },
  "double-tree-black-currant": { ru: "Чёрная смородина", evidence: "label" },
  "double-tree-caribbean-kiwi": { ru: "Карибский киви", evidence: "label" },
  "double-tree-coconut-raspberry": { ru: "Кокос — малина", evidence: "label" },
  "double-tree-lemon-lime": { ru: "Лимон — лайм", evidence: "label" },
  "double-tree-pomegranate-mint": { ru: "Гранат — мята", evidence: "label" },
  "double-tree-watermelon-mint": { ru: "Арбуз — мята", evidence: "label" },
  // white label 0,45 and the special edition — studio gallery 22.07.25
  "double-tree-grape-citrus": { ru: "Виноград — цитрус", evidence: "label" },
  "double-tree-double-cherry": { ru: "Двойная вишня", evidence: "official" }, // news of 07.02.2022
  "double-tree-pomegranate-cherry": { ru: "Гранат — вишня", evidence: "label" },
  "double-tree-dry-apple": { ru: "Яблоко — сухой", evidence: "label" },

  // Double Tree 0,75 — the labels read "Apple / Cherry / Pear / Pomegranate Cider"
  "double-tree-075-apple-cider-green": { ru: "Зелёное яблоко", evidence: "owner" },
  "double-tree-075-apple-cider-red": { ru: "Красное яблоко", evidence: "owner" },
  "double-tree-075-pear-cider": { ru: "Груша", evidence: "owner" },
  "double-tree-075-cherry-cider": { ru: "Вишня", evidence: "label" },
  "double-tree-075-pomegranate-cider": { ru: "Гранат", evidence: "label" },
  "double-tree-075-apple-cider-golden": { ru: "Золотое яблоко", evidence: "owner" }, // archive file «Золотое Яблоко»

  // D TREE PARTY — the labels themselves are in Russian: «фруктовый сливовый сидр» etc.
  "double-tree-party-plum": { ru: "Слива", evidence: "official" },
  "double-tree-party-pomegranate": { ru: "Гранат", evidence: "official" },
  "double-tree-party-cherry": { ru: "Вишня", evidence: "official" },
  "double-tree-party-raspberry": { ru: "Малина", evidence: "official" },
  "double-tree-party-apple": { ru: "Яблоко", evidence: "official" },

  // Mister Bee — the owner's flavour archive
  "mister-bee-orange-grapefruit": { ru: "Апельсин — грейпфрут", evidence: "owner" },
  "mister-bee-mandarin": { ru: "Мандарин", evidence: "owner" },
  "mister-bee-cherry-blossom": { ru: "Цветочная вишня", evidence: "owner" },
  // catalogue of ciderhouse.ru: «Тропический банан-вишня», «Ароматная фейхоа», «Классическая медовуха», «Сочная слива», «Лимонная свежесть», «Яркая клюква», «Терпкий гранат-виноград»
  "mister-bee-cherry-banana": { ru: "Банан — вишня", evidence: "official" },
  "mister-bee-feijoa": { ru: "Фейхоа", evidence: "official" },
  "mister-bee-classic": { ru: "Классическая", evidence: "official" },
  "mister-bee-plum": { ru: "Слива", evidence: "official" },
  "mister-bee-lemon": { ru: "Лимон", evidence: "official" },
  "mister-bee-cranberry": { ru: "Клюква", evidence: "official" },
  "mister-bee-pomegranate-grape": { ru: "Гранат — виноград", evidence: "official" },
};

export const flavourRu = (slug: string): string => {
  const f = FLAVOURS[slug];
  if (!f) throw new Error(`No Russian flavour name for "${slug}" — add it to src/data/flavours.ts`);
  return f.ru;
};
