import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden field-purple px-6 pb-[var(--sheet-r)] text-center">
      <p className="relative font-black leading-[0.74] text-[min(30vw,50svh)]">0,0°</p>
      <p className="t-tag relative mt-8">Ошибка 404</p>
      <h1 className="t-m relative mt-3">Такой страницы у нас нет</h1>
      <Link href="/" className="btn btn-solid relative mt-8">На главную</Link>
    </section>
  );
}
