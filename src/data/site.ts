import type { SourceId } from "./sources";

/** ONE source of truth for public company data. Every page, the header, the footer and the structured metadata read from here —
 *  change a phone, an e-mail or a social URL in this file and it changes everywhere. Nothing below is repeated in components. */
export const SITE = {
  url: "https://ciderhouse.ru",
  name: "CIDERHOUSE",
  legalName: "Cider House",
  tagline: "Мы создаём настоящий сидр", // official homepage title
  description:
    "CIDERHOUSE — производитель сидра и медовухи: Double Tree, White Phoenix, Mister Bee и безалкогольное направление 0% — ZER° CIDER.",
  since: 2017, // on the market since — official site
  locale: "ru_RU",
};

// Contacts and socials: ciderhouse.ru (footer of the official site, checked 2026-10-05) + owner confirmation.
export const CONTACTS = {
  phone: { label: "+7 (495) 177-12-64", href: "tel:+74951771264" },
  emails: ["info@ciderhouse.ru", "a@ciderhouse.ru"],
} as const;
/** The address used by single-button calls to action. */
export const EMAIL = CONTACTS.emails[0];
export const mailto = (subject?: string, to: string = EMAIL) => `mailto:${to}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export const SOCIALS = [
  { name: "ВКонтакте", href: "https://vk.com/cider_house" },
  { name: "Telegram", href: "https://t.me/ciderhousee" },
  { name: "YouTube", href: "https://www.youtube.com/@ciderhouse6372" },
] as const;

export const NAV = [
  { href: "/", label: "Дом", hint: "CIDERHOUSE" },
  { href: "/about/", label: "О компании", hint: `с ${SITE.since} года` },
  { href: "/brands/", label: "Бренды", hint: "4 характера" },
  { href: "/katalog/", label: "Ассортимент", hint: "каталог" },
  { href: "/non-alcoholic/", label: "0%", hint: "безалкогольное" },
  { href: "/production/", label: "Производство", hint: "от сока и мёда до розлива" },
  { href: "/map/", label: "Где купить", hint: "магазины и маркетплейсы" },
  { href: "/clients/", label: "Партнёры", hint: "сети" },
  { href: "/news/", label: "Новости", hint: "журнал дома" },
  { href: "/contact/", label: "Контакты", hint: "опт · HoReCa" },
] as const;

// Company facts — official site (ciderhouse.ru) and owner brief. Evergreen wording: "с 2017 года", never a count of years.
export const ABOUT_FACTS: { v: string; k: string; note: string }[] = [
  { v: `С ${SITE.since}`, k: "года на рынке", note: "Разрабатываем и производим сидр и медовуху." },
  { v: "Сидр и медовуха", k: "две основы", note: "Яблочный сок и мёд, натуральные фруктовые соки." },
  { v: "Бутылки и кеги", k: "два формата", note: "Для полки магазина и для бара." },
  { v: "Два региона", k: "производство", note: "Краснодарский край и Тверская область." },
];

// Production story — house-wide, from the official site and the owner brief. No temperatures, timings, recipes or capacities.
export const PROCESS: { n: string; title: string; text: string; glyph?: string; source: SourceId }[] = [
  { n: "01", title: "Основа: яблочный сок и мёд", text: "Сидр начинается с яблочного сока, медовуха — с мёда. Это основа каждого напитка дома.", glyph: "сок · мёд", source: "official" },
  { n: "02", title: "Натуральные фруктовые соки", text: "К основе добавляют натуральные фруктовые и ягодные соки — так появляются необычные сочетания вкусов.", source: "official" },
  { n: "03", title: "Брожение", text: "Напиток рождается в естественном брожении. Мы работаем по европейской технологии производства.", source: "official" },
  { n: "04", title: "Контроль качества", text: "Процесс контролируют на каждом этапе, а каждую партию проверяет лаборатория.", glyph: "каждая партия", source: "official" },
  { n: "05", title: "Розлив", text: "Готовый напиток разливают в бутылки и кеги.", glyph: "бутылки · кеги", source: "official" },
  { n: "06", title: "Два производства", text: "Напитки CIDERHOUSE производят в Краснодарском крае и Тверской области.", glyph: "юг · центр", source: "official" },
];

export const ZERO_FACTS = [
  { k: "01", title: "Сделано в России", text: "Безалкогольный сидр российского производства." },
  { k: "02", title: "Классическая технология", text: "Полный цикл сидроделия — вкус и характер сидра сохранены." },
  { k: "03", title: "Категория 0,0%", text: "Один из самых быстрорастущих сегментов напитков в мире." },
  { k: "04", title: "Три характера", text: "Зелёное яблоко, вишня и гранат — малина." },
];

export const PARTNERS = [
  { slug: "x5-group", aspect: 3.31, name: "X5 Group" },
  { slug: "pyaterochka", aspect: 0.96, name: "Пятёрочка" },
  { slug: "perekrestok", aspect: 7.57, name: "Перекрёсток" },
  { slug: "magnit", aspect: 5.27, name: "Магнит" },
  { slug: "lenta", aspect: 1.14, name: "Лента" },
  { slug: "okey", aspect: 2.64, name: "О'КЕЙ" },
  { slug: "vinlab", aspect: 5.45, name: "ВинЛаб" },
  { slug: "da", aspect: 1.0, name: "ДА!" },
  { slug: "monetka", aspect: 3.46, name: "Монетка" },
];

export const MARKETPLACES = [
  { name: "OZON", note: "Все три вкуса ZER° с доставкой", href: "https://www.ozon.ru" },
  { name: "Wildberries", note: "Наборы и отдельные вкусы", href: "https://www.wildberries.ru" },
  { name: "Яндекс Маркет", note: "Экспресс-доставка", href: "https://market.yandex.ru" },
];
