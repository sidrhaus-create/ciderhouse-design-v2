import { CONTACTS, SOCIALS, mailto } from "@/data/site";

/** The company's contact lines and social links. The only place that renders them — data comes from src/data/site.ts. */
export function ContactLines({ className = "", size = "text-[14px]" }: { className?: string; size?: string }) {
  return (
    <ul className={`space-y-1.5 ${size} ${className}`}>
      <li><a className="fill-link nobr" href={CONTACTS.phone.href}>{CONTACTS.phone.label}</a></li>
      {CONTACTS.emails.map((e) => <li key={e}><a className="fill-link break-all" href={mailto(undefined, e)}>{e}</a></li>)}
    </ul>
  );
}

export function Socials({ className = "", size = "text-[14px]" }: { className?: string; size?: string }) {
  return (
    <ul className={`space-y-1.5 ${size} ${className}`}>
      {SOCIALS.map((s) => (
        <li key={s.href}>
          <a className="fill-link" href={s.href} target="_blank" rel="noopener noreferrer" data-external="">
            {s.name}<span aria-hidden="true"> ↗</span><span className="sr-only"> — откроется в новой вкладке</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
