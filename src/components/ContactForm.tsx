"use client";
import { useState, type FormEvent } from "react";
import { CONTACTS, EMAIL } from "@/data/site";

/** The feedback form of a static site: it composes a letter to the house's address and opens the visitor's mail client with the
 *  fields filled in. No third-party form service, nothing stored anywhere. Same ruled language as the rest of the site. */
type Field = "name" | "company" | "contact" | "message";
const LABEL: Record<Field, string> = { name: "Имя", company: "Компания", contact: "Телефон или e-mail", message: "Сообщение" };

export function ContactForm({ subject = "Сотрудничество с CIDERHOUSE" }: { subject?: string }) {
  const [v, setV] = useState<Record<Field, string>>({ name: "", company: "", contact: "", message: "" });
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);
  const missing = (["name", "contact", "message"] as Field[]).filter((k) => !v[k].trim());
  const set = (k: Field) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (missing.length) return;
    const body = [`Имя: ${v.name}`, v.company && `Компания: ${v.company}`, `Контакт: ${v.contact}`, "", v.message].filter((x) => x !== "").join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field = "peer w-full border-0 border-b border-current bg-transparent px-0 py-3 text-[17px] leading-snug outline-none placeholder:opacity-0 focus-visible:border-b-2 focus-visible:border-purple";
  const label = "t-tag pointer-events-none absolute left-0 top-3 origin-left transition-transform duration-300 [transition-timing-function:var(--ease-out)] peer-focus-visible:-translate-y-6 peer-focus-visible:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-90";

  return (
    <form onSubmit={submit} noValidate className="grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2" aria-describedby="form-note">
      {(["name", "company", "contact"] as Field[]).map((k) => {
        const bad = touched && k !== "company" && !v[k].trim();
        return (
          <div key={k} className={`relative pt-6 ${k === "contact" ? "md:col-span-2" : ""}`}>
            <input id={`f-${k}`} name={k} value={v[k]} onChange={set(k)} placeholder={LABEL[k]} autoComplete={k === "name" ? "name" : k === "company" ? "organization" : "email"} required={k !== "company"} aria-invalid={bad || undefined} className={`${field} ${bad ? "border-b-2 border-[var(--fl-cherry)]" : ""}`} />
            <label htmlFor={`f-${k}`} className={label}>{LABEL[k]}{k === "company" && <span className="opacity-60"> · необязательно</span>}</label>
          </div>
        );
      })}
      <div className="relative pt-6 md:col-span-2">
        <textarea id="f-message" name="message" value={v.message} onChange={set("message")} placeholder={LABEL.message} rows={4} required aria-invalid={(touched && !v.message.trim()) || undefined} className={`${field} resize-y ${touched && !v.message.trim() ? "border-b-2 border-[var(--fl-cherry)]" : ""}`} />
        <label htmlFor="f-message" className={label}>{LABEL.message}</label>
      </div>
      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <button type="submit" className="btn btn-solid self-start">Отправить</button>
        <p id="form-note" className="max-w-[46ch] text-[13.5px] leading-snug opacity-75" aria-live="polite">
          {sent ? `Письмо открылось в вашей почтовой программе. Если нет — напишите на ${EMAIL} или позвоните ${CONTACTS.phone.label}.`
            : touched && missing.length ? `Заполните: ${missing.map((k) => LABEL[k].toLowerCase()).join(", ")}.`
            : `Письмо уйдёт на ${EMAIL}. Ответим в рабочее время.`}
        </p>
      </div>
    </form>
  );
}
