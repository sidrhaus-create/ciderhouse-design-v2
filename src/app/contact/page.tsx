import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactLines, Socials } from "@/components/Contacts";
import { ContactForm } from "@/components/ContactForm";
import { Chapter } from "@/components/primitives";
import { CONTACTS, EMAIL, mailto } from "@/data/site";
import { BRANDS } from "@/data/brands";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Контакты CIDERHOUSE: ${CONTACTS.phone.label}, ${CONTACTS.emails.join(", ")}. Опт, сети, HoReCa, дистрибуция.`,
  alternates: { canonical: "/contact/" },
};

const WHO = [
  ["Сети и магазины", "Ассортимент дома для полки: сидр, медовуха и линейка 0%."],
  ["HoReCa", "Бары, рестораны, кафе — позиции для барной карты и меню."],
  ["Дистрибуция", "Региональные партнёры и оптовые поставки."],
];

export default function Contact() {
  const mail = mailto("Сотрудничество с CIDERHOUSE");
  return (
    <>
      <PageHero
        id="c-title"
        label="Контакты"
        lines={["Давайте дружить"]}
        lead="Опт, HoReCa и сети. Позвоните или напишите — пришлём условия и актуальный ассортимент."
      >
        <div className="flex flex-wrap">
          <a href={CONTACTS.phone.href} className="btn btn-solid max-w-full">{CONTACTS.phone.label}</a>
          <a href={mail} className="btn -ml-px max-w-full">{EMAIL}</a>
        </div>
      </PageHero>

      {/* the contact sheet: the same lines as in the footer and the menu (src/data/site.ts) */}
      <section className="field-black relative" aria-labelledby="c-lines">
        <h2 id="c-lines" className="sr-only">Телефон, почта и соцсети</h2>
        <div className="grid grid-cols-1 border-t border-current md:grid-cols-3">
          <div className="border-b border-current px-[var(--gutter)] py-8 md:border-b-0 md:border-r">
            <p className="t-tag mb-5 opacity-70">Телефон</p>
            <a href={CONTACTS.phone.href} className="fill-link nobr text-[clamp(22px,2.3vw,36px)] font-extrabold leading-none tracking-[-0.03em]">{CONTACTS.phone.label}</a>
          </div>
          <div className="border-b border-current px-[var(--gutter)] py-8 md:border-b-0 md:border-r">
            <p className="t-tag mb-5 opacity-70">Почта</p>
            <ul className="space-y-2">
              {CONTACTS.emails.map((e) => (
                <li key={e}><a href={mailto(undefined, e)} className="fill-link break-all text-[clamp(20px,2vw,32px)] font-extrabold leading-none tracking-[-0.03em]">{e}</a></li>
              ))}
            </ul>
          </div>
          <div className="px-[var(--gutter)] py-8">
            <p className="t-tag mb-5 opacity-70">Соцсети</p>
            <Socials size="text-[clamp(18px,1.6vw,24px)] font-bold" />
          </div>
        </div>
      </section>

      <section className="relative field-white" aria-labelledby="c-who">
        <div className="wrap pb-[clamp(43px,5.3vw,77px)] pt-[clamp(50px,5.9vw,90px)]">
          <Chapter n="01" label="С кем работаем" className="mb-5" />
          <h2 id="c-who" className="t-l mb-10">Три формата</h2>
          <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {WHO.map(([t, d], i) => (
              <li key={t} data-reveal style={{ ["--d" as string]: `${i * 0.07}s` }} className="flex min-h-[200px] flex-col justify-between border border-current p-6">
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

      <section id="form" className="relative field-black scroll-mt-4" aria-labelledby="c-form">
        <div className="wrap grid grid-cols-1 gap-10 pb-[clamp(50px,5.9vw,90px)] pt-[clamp(50px,5.9vw,90px)] md:grid-cols-12">
          <div className="md:col-span-4">
            <Chapter n="02" label="Написать нам" className="mb-5" />
            <h2 id="c-form" className="t-l">Форма<br />обратной связи</h2>
            <p className="mt-6 max-w-[34ch] text-[15px] leading-snug opacity-80">Укажите город, формат бизнеса и интересующие бренды: {BRANDS.map((b) => b.name).join(", ")} — так мы ответим быстрее.</p>
            <ContactLines className="mt-8 opacity-80" />
          </div>
          <div className="md:col-span-8 md:pt-2"><ContactForm /></div>
        </div>
      </section>
    </>
  );
}
