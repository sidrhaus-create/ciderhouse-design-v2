import type { SourceId } from "./sources";

export const SITE = {
  url: "https://ciderhouse.ru",
  name: "CIDERHOUSE",
  legalName: "Cider House",
  tagline: "Мы создаём настоящий сидр", // official homepage title
  description:
    "CIDERHOUSE — производитель сидра и медовухи: White Phoenix, Mister Bee, Double Tree и безалкогольное направление 0% — ZER° CIDER, Bumble Coffee, Migliore.",
  wholesaleEmail: "opt@whitephoenix.ru", // owner materials
  locale: "ru_RU",
};

export const NAV = [
  { href: "/", label: "Дом", hint: "CIDERHOUSE" },
  { href: "/brands/", label: "Бренды", hint: "6 характеров" },
  { href: "/katalog/", label: "Ассортимент", hint: "каталог" },
  { href: "/non-alcoholic/", label: "0%", hint: "безалкогольное" },
  { href: "/production/", label: "Производство", hint: "от яблока до бутылки" },
  { href: "/map/", label: "Где купить", hint: "магазины и маркетплейсы" },
  { href: "/clients/", label: "Партнёры", hint: "сети" },
  { href: "/contact/", label: "Сотрудничество", hint: "опт · HoReCa" },
  { href: "/merch/", label: "Мерч", hint: "фирменный" },
  { href: "/blog/", label: "Журнал", hint: "новости" },
] as const;

// Production process — owner materials (ZER° CIDER 0,0% technology). Order and wording preserved, lightly edited.
export const PROCESS: { n: string; title: string; text: string; glyph?: string; source: SourceId }[] = [
  { n: "01", title: "Всё начинается с яблок", text: "Для сидра выбирают сорта с правильным балансом сладости и кислотности.", source: "owner-repo" },
  { n: "02", title: "Яблочный сок — основа", text: "Концентрированный сок поступает на завод, где его подготавливают и направляют в ёмкости для дальнейшего производства напитка.", source: "owner-repo" },
  { n: "03", title: "Брожение", text: "Брожение идёт на восстановленном яблочном соке и сахаре с добавлением винных дрожжей.", source: "owner-repo" },
  { n: "04", title: "Остановка брожения", text: "Брожение идёт до 0,5% — затем процесс останавливают охлаждением и доводят напиток до 0,0%.", glyph: "0,5 → 0,0", source: "owner-repo" },
  { n: "05", title: "Фильтрация и карбонизация", text: "Из напитка удаляют лишние частицы, осадок и остатки дрожжей, затем насыщают углекислым газом — так появляются мягкие пузырьки.", glyph: "CO₂", source: "owner-repo" },
  { n: "06", title: "Контроль качества", text: "Каждая партия проходит лабораторную проверку: вкус, аромат, карбонизация и строгое соответствие 0,0%.", source: "owner-repo" },
  { n: "07", title: "Розлив", text: "Готовый сидр разливают в фирменные бутылки на автоматической линии — без контакта с воздухом.", source: "owner-repo" },
  { n: "08", title: "Отгрузка", text: "Со склада — в маркетплейсы, магазины и бары по всей России.", source: "owner-repo" },
];

export const ZERO_FACTS = [
  { k: "01", title: "Сделано в России", text: "Безалкогольный сидр российского производства." },
  { k: "02", title: "Классическая технология", text: "Полный цикл сидроделия — вкус и характер сидра сохранены." },
  { k: "03", title: "Категория 0,0%", text: "Один из самых быстрорастущих сегментов напитков в мире." },
  { k: "04", title: "Три характера", text: "Зелёное яблоко, вишня и гранат-малина." },
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

// Journal: posts confirmed in the index of the official domain. Linked to originals.
export const JOURNAL = [
  { title: "Топ-6 фактов о сидре", href: "https://ciderhouse.ru/tpost/a7ligjlro1-top-6-faktov-o-sidre", tag: "Культура" },
  { title: "Кинокомпания «CIDERHOUSE» и фильм «Неуловимые»", href: "https://ciderhouse.ru/tpost/ij9mvktgy1-kinokompaniya-ciderhouse-i-film-neulovim", tag: "Новости" },
];
