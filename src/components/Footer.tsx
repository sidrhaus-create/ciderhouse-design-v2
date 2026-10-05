import Link from "next/link";
import { NAV, SITE } from "@/data/site";
import { BRANDS } from "@/data/brands";

export function Footer() {
  return (
    <footer className="field-black relative overflow-hidden" aria-labelledby="footer-title">
      <div className="h-2 bg-purple" aria-hidden="true" />
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-12 pb-12 pt-[clamp(40px,4.6vw,70px)] md:grid-cols-12">
        <div className="col-span-2 md:col-span-5">
          <h2 id="footer-title" className="t-voice balance max-w-[18ch]">Заходите — здесь всё бродит, кроме качества.</h2>
          <div className="mt-8 flex flex-wrap">
            <Link href="/contact/" className="btn btn-solid">Стать партнёром</Link>
            <Link href="/map/" className="btn -ml-px">Где купить</Link>
          </div>
        </div>
        <nav aria-label="Разделы" className="md:col-span-2 md:col-start-7">
          <p className="t-tag mb-4 opacity-60">Разделы</p>
          <ul className="space-y-1.5 text-[14px]">
            {NAV.slice(1).map((n) => (
              <li key={n.href}><Link className="fill-link" href={n.href}>{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Бренды" className="md:col-span-2">
          <p className="t-tag mb-4 opacity-60">Бренды</p>
          <ul className="space-y-1.5 text-[14px]">
            {BRANDS.map((b) => (
              <li key={b.slug}><Link className="fill-link" href={`/brands/${b.slug}/`}>{b.name}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="col-span-2 md:col-span-2">
          <p className="t-tag mb-4 opacity-60">Опт · HoReCa</p>
          <a className="fill-link break-all text-[14px]" href={`mailto:${SITE.wholesaleEmail}`}>{SITE.wholesaleEmail}</a>
          <p className="mt-6 text-sm opacity-70">Официальный сайт: <span className="nobr">ciderhouse.ru</span></p>
        </div>
      </div>

      <div className="wrap select-none border-t border-white/25 py-[clamp(24px,3vw,44px)]" aria-hidden="true">
        <img src="/assets/brand/ciderhouse-logo-white.svg" alt="" width={524} height={137} loading="lazy" className="h-auto w-[min(100%,920px)]" />
      </div>

      <div className="wrap mt-6 flex flex-col gap-3 border-t border-white/25 py-6 text-xs md:flex-row md:items-center md:justify-between">
        <p className="opacity-70">© {new Date().getFullYear()} {SITE.legalName}. Продукция для лиц старше 18 лет.</p>
        <p className="font-semibold uppercase tracking-[0.08em]">18+ · Чрезмерное употребление алкоголя вредит вашему здоровью</p>
      </div>
    </footer>
  );
}
