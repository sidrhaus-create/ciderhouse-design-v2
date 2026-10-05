import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { brandHref, type Brand } from "@/data/brands";

/** One rule for every brand entry point: a brand with a verified official site opens it in a new tab; the others open their page here. */
export function BrandLink({ b, children, ...rest }: { b: Brand; children: ReactNode } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  if (b.site) {
    return (
      <a href={b.site} target="_blank" rel="noopener noreferrer" data-external="" {...rest}>
        {children}
        <span className="sr-only"> — официальный сайт, откроется в новой вкладке</span>
      </a>
    );
  }
  return <Link href={brandHref(b)} {...rest}>{children}</Link>;
}
