import Link from "next/link";
import { foundationNavigation } from "@/lib/navigation";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__grid" size="wide">
        <div>
          <Link
            aria-label="Cider House foundation — главная"
            className="wordmark wordmark--inverse"
            href="/"
          >
            CIDER<span>HOUSE</span>
          </Link>
          <p className="site-footer__statement">
            Системная основа цифровой платформы. Не финальная главная страница.
          </p>
        </div>
        <nav aria-label="Навигация в подвале" className="site-footer__nav">
          {foundationNavigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-footer__legal">
          <span>18+ · Legal copy pending review</span>
          <span>© Cider House · Foundation preview</span>
        </div>
      </Container>
    </footer>
  );
}
