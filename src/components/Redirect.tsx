"use client";
import { useEffect } from "react";

/** A deliberate redirect for a legacy route in a static export: meta refresh + location.replace, with a plain link as the fallback. */
export function Redirect({ to, label }: { to: string; label: string }) {
  const external = /^https?:/.test(to);
  useEffect(() => { window.location.replace(to); }, [to]);
  return (
    <section className="field-white relative">
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <div className="wrap flex min-h-[70svh] flex-col justify-center pb-16 pt-[clamp(92px,9vw,128px)]">
        <p className="t-tag mb-6">Страница переехала</p>
        <h1 className="t-xl">{label}</h1>
        <a href={to} {...(external ? { rel: "noopener noreferrer", "data-external": "" } : {})} className="btn btn-solid mt-8 self-start">Перейти</a>
      </div>
    </section>
  );
}
