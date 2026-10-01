import { homepageContent } from "@/data/homepage-content";

/**
 * Copy and imagery for the secondary pages (about, where to buy, partners,
 * contacts) and for the campaign banners. Every sentence is either taken from
 * `data/homepage-content.ts` (already reconciled with ciderhouse.ru — see
 * docs/HOMEPAGE-CONTENT-SOURCES.md) or a neutral navigation phrase. No sales
 * figures, retailers, addresses, awards or product properties are introduced
 * here.
 */

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/** Official photography published on ciderhouse.ru, stored unmodified. */
export const photography = {
  mangoBowl: {
    src: "/assets/photography/white-phoenix-mango-citrus-fruit-bowl.jpg",
    width: 1680,
    height: 1260,
    alt: "Бутылки White Phoenix Манго-цитрус во льду среди апельсинов, лимонов и манго",
  },
  cherryCocktail: {
    src: "/assets/photography/white-phoenix-black-cherry-cocktail.jpg",
    width: 1680,
    height: 2283,
    alt: "Бутылка White Phoenix Тёмная вишня рядом с бокалом и свежей вишней на красном фоне",
  },
  appleCider: {
    src: "/assets/photography/double-tree-apple-bottles-cans.jpg",
    width: 1680,
    height: 2240,
    alt: "Бутылки и банки Double Tree Зелёное яблоко рядом со свежими зелёными яблоками",
  },
  doubleTreeTrio: {
    src: "/assets/photography/double-tree-075-trio-purple.png",
    width: 580,
    height: 787,
    alt: "Три бутылки Double Tree 0,75 л на фиолетовом фоне",
  },
  factory: {
    src: "/assets/production/factory-hero.png",
    width: 1176,
    height: 784,
    alt: "Производственные ёмкости для брожения на площадке Cider House",
  },
  podium: {
    src: "/assets/products/catalog/catalog-hero-transparent.png",
    width: 2400,
    height: 1350,
    alt: "Ассортимент бутылок Cider House: линейки Double Tree и White Phoenix; фотография показана без изменений",
  },
  zero: {
    src: "/assets/products/zero/cider-house-zero-collection-official.png",
    width: 1680,
    height: 1645,
    alt: "Три официальные бутылки безалкогольной коллекции Cider House: Вишня, Зелёное яблоко и Гранат–малина",
  },
} satisfies Record<string, Photo>;

const { contacts, whereToBuy, partnership, story, social, faq } =
  homepageContent;

export const aboutContent = {
  eyebrow: story.eyebrow,
  title: story.title,
  body: story.body,
  lead: homepageContent.hero.body,
  seo: {
    title: "О нас — Cider House",
    description:
      "Cider House — сидры и медовухи естественного брожения с 2017 года: Double Tree, White Phoenix, Mister Bee и безалкогольная линейка.",
  },
};

export const whereToBuyContent = {
  eyebrow: whereToBuy.eyebrow,
  title: whereToBuy.title,
  body: whereToBuy.body,
  cities: whereToBuy.cities,
  citiesNote:
    "Города приведены для примера — продукция представлена и в других городах России.",
  answers: faq.filter((item) =>
    [
      "Где купить продукцию?",
      "Можно ли заказать алкогольную продукцию с доставкой?",
    ].includes(item.question),
  ),
  seo: {
    title: "Где купить — Cider House",
    description:
      "Продукция Cider House представлена в торговых сетях и специализированных магазинах по всей России.",
  },
};

export const partnersContent = {
  eyebrow: partnership.eyebrow,
  title: partnership.title,
  audiences: partnership.audiences,
  body: "Для партнёров подготовлены материалы бренда: фотографии продукции, логотипы и листовки. Напишите или позвоните — обсудим формат сотрудничества.",
  seo: {
    title: "Партнёрам — Cider House",
    description:
      "Cider House работает с дистрибьюторами, торговыми сетями, HoReCa и магазинами разливных напитков.",
  },
};

export const contactsContent = {
  title: ["Будем", "на связи"],
  channels: [
    {
      label: "Телефон",
      value: contacts.phone,
      href: contacts.phoneHref,
    },
    {
      label: "Партнёрам",
      value: contacts.email,
      href: contacts.emailHref,
    },
    {
      label: "Общие вопросы",
      value: contacts.generalEmail,
      href: contacts.generalEmailHref,
    },
  ],
  company: contacts.company,
  social: social.links,
  seo: {
    title: "Контакты — Cider House",
    description: "Телефон, электронная почта и официальные каналы Cider House.",
  },
};
