export type HomepageContentStatus =
  "approved" | "sourced" | "requires-approval" | "temporary";

export type HomepageSource = {
  label: string;
  url: string;
};

export type HomepageContentItem = {
  status: HomepageContentStatus;
  source: string;
};

const sources = {
  home: "https://ciderhouse.ru/",
  catalog: "https://ciderhouse.ru/katalog",
  production: "https://ciderhouse.ru/production",
  map: "https://ciderhouse.ru/map",
  partners: "https://ciderhouse.ru/clients",
  blog: "https://ciderhouse.ru/blog",
} as const;

export const homepageContent = {
  sources,
  navigation: [
    { label: "Ассортимент", href: "/catalog" },
    { label: "Бренды", href: "/#product-worlds" },
    { label: "Производство", href: "/production" },
    { label: "Где купить", href: "/where-to-buy" },
    { label: "Партнёрам", href: "/partners" },
    { label: "Контакты", href: "/#contacts" },
  ],
  hero: {
    eyebrow: "Cider House · с 2017 года",
    title: ["Мы создаём", "настоящий сидр"],
    body: "Сидры и медовухи естественного брожения с яркими вкусами, натуральным сырьём и собственным производством в России.",
    primaryCta: { label: "Смотреть ассортимент", href: "/catalog" },
    secondaryCta: { label: "Где купить", href: "/where-to-buy" },
    assets: [
      {
        src: "/assets/products/mister-bee/mister-bee-foundation-02-front.png",
        alt: "Бутылка медовухи Mister Bee Lemon",
        position: "left",
      },
      {
        src: "/assets/products/mister-bee/mister-bee-foundation-01-front.png",
        alt: "Бутылка классической медовухи Mister Bee",
        position: "center",
      },
      {
        src: "/assets/products/mister-bee/mister-bee-foundation-03-front.png",
        alt: "Бутылка медовухи Mister Bee Pomegranate Grape",
        position: "right",
      },
    ],
    status: "approved",
    source: sources.home,
  },
  productWorlds: [
    {
      id: "double-tree",
      index: "01",
      label: "Сидр",
      title: "Double Tree",
      description:
        "Европейская классика сидра: яблочные, фруктовые и ягодные вкусы в бутылках и кегах.",
      detail: "0,45 л · лимитированная коллекция 0,75 л · кеги",
      href: "/brands/double-tree",
      logo: "/assets/brand/family-logos/double-tree-logo-raster-source.png",
      status: "sourced",
      source: sources.catalog,
    },
    {
      id: "white-phoenix",
      index: "02",
      label: "Медовуха",
      title: "White Phoenix",
      description:
        "Напитки естественного брожения на медовой основе с яркими фруктовыми и ягодными сочетаниями.",
      detail: "Фруктовые и ягодные сочетания · бутылки и кеги",
      href: "/brands/white-phoenix",
      logo: "/assets/brand/family-logos/white-phoenix-logo-raster-source.png",
      status: "sourced",
      source: sources.home,
    },
    {
      id: "mister-bee",
      index: "03",
      label: "Медовуха",
      title: "Mister Bee",
      description:
        "Современный взгляд на медовуху: понятные вкусы, яркий характер и выразительная упаковка.",
      detail: "Три одобренных product-lock образа представлены без изменений",
      href: "/brands/mister-bee",
      images: [
        "/assets/products/mister-bee/mister-bee-foundation-01-front.png",
        "/assets/products/mister-bee/mister-bee-foundation-02-front.png",
        "/assets/products/mister-bee/mister-bee-foundation-03-front.png",
      ],
      status: "approved",
      source: sources.catalog,
    },
    {
      id: "zero",
      index: "04",
      label: "Новинка",
      title: "Безалкогольная линейка",
      description:
        "Три ярких вкуса и характер настоящего сидра — без алкоголя.",
      detail: "Вишня · Зелёное яблоко · Гранат–малина",
      href: "/brands/zero",
      artwork: {
        src: "/assets/products/zero/cider-house-zero-collection-official.png",
        alt: "Официальная композиция безалкогольной коллекции: Вишня, Зелёное яблоко и Гранат–малина",
        width: 1680,
        height: 1645,
      },
      status: "requires-approval",
      source: sources.home,
    },
  ],
  zeroFeature: {
    eyebrow: "0% collection",
    title: ["Вкус сидра.", "Свобода выбора."],
    body: "Безалкогольная линейка White Phoenix создана для моментов, когда хочется сохранить вкус и остаться в своём ритме.",
    tastes: ["Вишня", "Зелёное яблоко", "Гранат–малина"],
    cta: { label: "Узнать больше", href: "/brands/zero" },
    artwork: {
      src: "/assets/products/zero/cider-house-zero-collection-official.png",
      alt: "Три официальные бутылки безалкогольной коллекции Cider House: Вишня, Зелёное яблоко и Гранат–малина",
      width: 1680,
      height: 1645,
    },
    status: "requires-approval",
    source: sources.home,
  },
  story: {
    eyebrow: "О Cider House",
    title: ["Вкус — это", "творческий процесс"],
    body: "Cider House начался с идеи, что сидр и медовуха могут быть больше привычного набора вкусов. Каждое новое сочетание проходит через пробы, исследование и внимательную работу над балансом.",
    status: "sourced",
    source: sources.home,
  },
  statistics: [
    {
      value: "2017",
      label: "На рынке с 2017 года",
      status: "sourced",
      source: sources.production,
      visible: true,
    },
    {
      value: "3",
      label: "формата: бутылки, банки и кеги",
      status: "sourced",
      source: sources.production,
      visible: true,
    },
    {
      value: "3",
      label: "производственные площадки",
      status: "sourced",
      source: sources.production,
      visible: true,
    },
    {
      value: "Россия",
      label: "география поставок",
      status: "sourced",
      source: sources.map,
      visible: true,
    },
    {
      value: "1 млн",
      label: "бутылок в месяц",
      status: "requires-approval",
      source: sources.production,
      visible: false,
    },
    {
      value: "300 тыс.",
      label: "банок в месяц",
      status: "requires-approval",
      source: sources.production,
      visible: false,
    },
    {
      value: "300",
      label: "городов",
      status: "requires-approval",
      source: sources.production,
      visible: false,
    },
  ],
  production: {
    eyebrow: "От сырья до розлива",
    title: ["Настоящий вкус", "создаётся без спешки"],
    intro:
      "Восемь этапов производства собраны в короткую последовательность без универсальных обещаний для каждого продукта.",
    stages: [
      {
        index: "01",
        title: "Натуральное сырьё",
        body: "Для разных рецептур используются яблочное, грушевое, вишнёвое, ягодное, гранатовое и лимонное сырьё, а также мёд.",
        status: "sourced",
        source: sources.production,
      },
      {
        index: "02",
        title: "Брожение",
        body: "В основе процесса — яблочное сусло или натуральный мёд с винными дрожжами.",
        status: "sourced",
        source: sources.production,
      },
      {
        index: "03",
        title: "Контроль",
        body: "Процесс брожения непрерывно контролируется на производстве.",
        status: "sourced",
        source: sources.production,
      },
      {
        index: "04",
        title: "Температура",
        body: "Температурный режим поддерживается на протяжении примерно 14–16 дней брожения.",
        status: "sourced",
        source: sources.production,
      },
      {
        index: "05",
        title: "Фильтрация",
        body: "После брожения напиток проходит полную фильтрацию.",
        status: "sourced",
        source: sources.production,
      },
      {
        index: "06",
        title: "Охлаждение",
        body: "Перед розливом продукт охлаждают.",
        status: "sourced",
        source: sources.production,
      },
      {
        index: "07",
        title: "Проверка партии",
        body: "Каждая партия проходит индивидуальное лабораторное тестирование качества.",
        status: "sourced",
        source: sources.production,
      },
      {
        index: "08",
        title: "Розлив",
        body: "Готовая продукция выпускается в бутылках, банках и кегах.",
        status: "sourced",
        source: sources.production,
      },
    ],
  },
  whereToBuy: {
    eyebrow: "География вкуса",
    title: ["Найди Cider House", "в своём городе"],
    body: "Продукция представлена в торговых сетях и специализированных магазинах по всей России.",
    cities: [
      "Москва",
      "Санкт-Петербург",
      "Краснодар",
      "Казань",
      "Екатеринбург",
      "Новосибирск",
    ],
    cta: { label: "Где купить", href: "/where-to-buy" },
    status: "sourced",
    source: sources.map,
  },
  partnership: {
    eyebrow: "Партнёрам",
    title: ["Работаем с теми,", "кто выбирает вкус"],
    audiences: [
      "Дистрибьюторам",
      "Торговым сетям",
      "HoReCa",
      "Магазинам разливных напитков",
    ],
    body: "Материалы бренда, фотографии продукции и форма сотрудничества — в отдельном разделе для партнёров.",
    cta: { label: "Стать партнёром", href: "/partners" },
    status: "sourced",
    source: sources.partners,
  },
  social: {
    eyebrow: "Сообщество",
    title: ["Cider House", "в эфире"],
    emptyEditorial:
      "Новые публикации появятся здесь после редакционного запуска. Пока — только официальные каналы без вымышленных новостей и дат.",
    links: [
      { label: "ВКонтакте", href: "https://vk.com/cider_house" },
      { label: "Telegram", href: "https://t.me/ciderhousee" },
      { label: "YouTube", href: "https://www.youtube.com/@ciderhouse6372" },
      {
        label: "Instagram*",
        href: "https://www.instagram.com/ciderhouse.ru/",
        note: "*Организация запрещена на территории Российской Федерации.",
      },
    ],
    status: "sourced",
    source: sources.home,
  },
  faq: [
    {
      question: "Чем отличаются напитки Cider House?",
      answer:
        "Cider House объединяет сидры и медовухи естественного брожения с разными фруктовыми и ягодными сочетаниями. Точные характеристики зависят от конкретного продукта.",
      status: "sourced",
      source: sources.home,
    },
    {
      question: "Где купить продукцию?",
      answer:
        "Продукция представлена в торговых сетях и специализированных магазинах в разных городах России. Актуальную географию смотрите в разделе «Где купить».",
      status: "sourced",
      source: sources.map,
    },
    {
      question: "Можно ли заказать алкогольную продукцию с доставкой?",
      answer:
        "На сайте нет прямой продажи или доставки алкогольной продукции. Для покупки используйте список торговых сетей и магазинов в разделе «Где купить».",
      status: "sourced",
      source: sources.home,
    },
    {
      question: "Какие форматы выпускаются?",
      answer:
        "В актуальном описании производства указаны бутылки, банки и кеги. Доступность формата зависит от конкретной линейки и продукта.",
      status: "sourced",
      source: sources.production,
    },
    {
      question: "Как стать партнёром?",
      answer:
        "Перейдите в раздел для партнёров: там собраны материалы бренда, контакты и форма сотрудничества.",
      status: "sourced",
      source: sources.partners,
    },
  ],
  finalCta: {
    title: "Открой свой вкус",
    actions: [
      { label: "Смотреть ассортимент", href: "/catalog" },
      { label: "Где купить", href: "/where-to-buy" },
    ],
    assets: [
      {
        src: "/assets/products/mister-bee/mister-bee-foundation-02-front.png",
        alt: "Бутылка медовухи Mister Bee Lemon",
      },
      {
        src: "/assets/products/mister-bee/mister-bee-foundation-01-front.png",
        alt: "Бутылка классической медовухи Mister Bee",
      },
      {
        src: "/assets/products/mister-bee/mister-bee-foundation-03-front.png",
        alt: "Бутылка медовухи Mister Bee Pomegranate Grape",
      },
    ],
  },
  contacts: {
    phone: "+7 (495) 177-12-64",
    phoneHref: "tel:+74951771264",
    email: "a@ciderhouse.ru",
    emailHref: "mailto:a@ciderhouse.ru",
    generalEmail: "info@ciderhouse.ru",
    generalEmailHref: "mailto:info@ciderhouse.ru",
    company: "ООО «Сидр Хаус»",
    status: "sourced",
    source: sources.partners,
  },
} as const;

export const homepageSourceList: HomepageSource[] = Object.entries(sources).map(
  ([label, url]) => ({ label, url }),
);
