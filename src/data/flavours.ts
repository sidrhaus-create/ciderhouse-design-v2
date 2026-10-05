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

  // Double Tree 0,75 — the labels read "Apple / Cherry / Pear / Pomegranate Cider"
  "double-tree-075-apple-cider-green": { ru: "Зелёное яблоко", evidence: "owner" },
  "double-tree-075-apple-cider-red": { ru: "Красное яблоко", evidence: "owner" },
  "double-tree-075-pear-cider": { ru: "Груша", evidence: "owner" },
  "double-tree-075-cherry-cider": { ru: "Вишня", evidence: "label" },
  "double-tree-075-pomegranate-cider": { ru: "Гранат", evidence: "label" },

  // Mister Bee — the owner's flavour archive
  "mister-bee-orange-grapefruit": { ru: "Апельсин — грейпфрут", evidence: "owner" },
  "mister-bee-mandarin": { ru: "Мандарин", evidence: "owner" },
  "mister-bee-cherry-blossom": { ru: "Цветочная вишня", evidence: "owner" },

  // Bumble Coffee — the owner's flavour sheet (Bumble_Coffee_Вкусы_A5)
  "bumble-coffee-cherry": { ru: "Вишня", evidence: "owner" },
  "bumble-coffee-orange": { ru: "Апельсин", evidence: "owner" },
  "bumble-coffee-pomegranate": { ru: "Гранат", evidence: "owner" },
  "bumble-coffee-raspberry": { ru: "Малина", evidence: "owner" },
  "bumble-coffee-wild-berries": { ru: "Лесные ягоды", evidence: "owner" },
  "bumble-coffee-zero-cola": { ru: "Кола", evidence: "owner" },
};

export const flavourRu = (slug: string): string => {
  const f = FLAVOURS[slug];
  if (!f) throw new Error(`No Russian flavour name for "${slug}" — add it to src/data/flavours.ts`);
  return f.ru;
};
