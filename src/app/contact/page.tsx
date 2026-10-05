import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Chapter, Reveal, Plate } from "@/components/primitives";
import { SITE } from "@/data/site";
import { BRANDS } from "@/data/brands";

export const metadata: Metadata = {
  title: "Сотрудничество",
  description: "Сотрудничество с Cider House: опт, сети, HoReCa, дистрибуция. Напишите на opt@whitephoenix.ru.",
  alternates: { canonical: "/contact/" },
};

const WHO = [
  ["Сети и магазины", "Ассортимент дома для полки: сидр, медовуха и линейка 0%.", "var(--green)"],
  ["HoReCa", "Бары, рестораны, кафе — позиции для барной карты и меню.", "var(--honey)"],
  ["Дистрибуция", "Региональные партнёры и оптовые поставки.", "var(--lilac)"],
];

export default function Contact() {
  const mail = `mailto:${SITE.wholesaleEmail}?subject=${encodeURIComponent("Сотрудничество с CIDERHOUSE")}`;
  return (
    <>
      <PageHero
        id="c-title"
       
        label="Сотрудничество"
        lines={["Давайте дружить"]}
        lead="Опт, HoReCa и сети. Напишите — пришлём условия и актуальный ассортимент."
      >
        <a href={mail} className="btn btn-solid max-w-full">{SITE.wholesaleEmail}</a>
      </PageHero>

      <section className="relative field-white" aria-labelledby="c-who">
        <div className="wrap pb-[clamp(43px,5.3vw,77px)] pt-[clamp(50px,5.9vw,90px)]">
          <Chapter n="01" label="С кем работаем" className="mb-5" />
          <h2 id="c-who" className="t-l mb-10">Три формата</h2>
          <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {WHO.map(([t, d, c], i) => (
              <li key={t} data-reveal style={{ ["--d" as string]: `${i * 0.07}s` }} className="flex min-h-[200px] flex-col justify-between border border-current p-6 ">
                <span className="text-[var(--ui-accent)] text-[clamp(44px,4.2vw,72px)] font-black leading-[0.8] tracking-[-0.05em]">0{i + 1}</span>
                <span>
                  <h3 className="text-[clamp(20px,2vw,30px)] font-extrabold uppercase leading-[1] tracking-[-0.03em] [overflow-wrap:anywhere]">{t}</h3>
                  <p className="mt-2 text-[15px] leading-snug">{d}</p>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative field-black" aria-labelledby="c-how">
        <div className="wrap grid grid-cols-1 gap-10 pb-[clamp(43px,5.3vw,77px)] pt-[clamp(50px,5.9vw,90px)] md:grid-cols-12">
          <div className="md:col-span-4">
            <Chapter n="02" label="В письме укажите" className="mb-5" />
            <h2 id="c-how" className="t-voice max-w-[12ch]">чтобы ответить быстрее</h2>
          </div>
          <Reveal className="md:col-span-8">
            <p className="t-m balance">Город, формат бизнеса и интересующие бренды: {BRANDS.map((b) => b.name).join(", ")}.</p>
            <a href={mail} className="btn mt-8">Написать письмо</a>
            <p className="mt-8 max-w-[52ch] text-sm opacity-70">Телефон, адрес производства и реквизиты будут добавлены из официальных данных ciderhouse.ru.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
