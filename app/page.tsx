import type { Metadata } from "next";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Foundation",
  description:
    "Project foundation dashboard for Cider House design tokens, components, responsive shell, and motion prototypes.",
};

const previewRoutes = [
  {
    index: "01",
    href: "/design-system",
    title: "Design system",
    description:
      "Confirmed brand colors, provisional accents, type roles, spacing, grids, and UI states.",
  },
  {
    index: "02",
    href: "/components-preview",
    title: "Components",
    description:
      "Typed primitives, product-lock rendering, forms, cards, overlays, tabs, and status states.",
  },
  {
    index: "03",
    href: "/motion-playground",
    title: "Motion",
    description:
      "Safe reveal, gap-free ticker, reduced-motion fallback, and a restrained ScrollTrigger proof.",
  },
] as const;

export default function FoundationPage() {
  return (
    <>
      <Section className="foundation-intro" spacing="roomy" tone="ink">
        <Container size="wide">
          <div className="foundation-intro__meta">
            <span>PROJECT FOUNDATION</span>
            <span>STAGE 01 / NOT THE HOMEPAGE</span>
          </div>
          <Heading
            as="h1"
            className="foundation-intro__title"
            size="display-xl"
          >
            A clear system for expressive brand worlds.
          </Heading>
          <div className="foundation-intro__footer">
            <Text size="body-lg" tone="inverse">
              Техническая и визуальная основа Cider House: mobile-first shell,
              токены, data contracts, доступные UI-паттерны и безопасное
              движение.
            </Text>
            <ButtonLink href="/design-system" variant="inverse">
              Открыть систему <span aria-hidden="true">↗</span>
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Review map</span>
              <Heading as="h2" size="heading-1">
                Три маршрута проверки
              </Heading>
            </div>
            <Text tone="muted">
              Каждый маршрут закрывает отдельный слой foundation scope.
            </Text>
          </div>
          <Grid className="route-grid" columns={3}>
            {previewRoutes.map((route) => (
              <article className="route-card" key={route.href}>
                <span className="route-card__index">{route.index}</span>
                <Heading as="h3" size="heading-2">
                  {route.title}
                </Heading>
                <Text tone="muted">{route.description}</Text>
                <TextLink href={route.href}>Review route ↗</TextLink>
              </article>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="foundation-boundary" size="wide">
          <div>
            <span className="eyebrow">Scope boundary</span>
            <Heading as="h2" size="heading-2">
              Homepage intentionally not built.
            </Heading>
          </div>
          <Text size="body-lg" tone="muted">
            This route is a review dashboard, not a marketing composition. Final
            navigation, product storytelling, and campaign scenes begin only
            after the system and assets are approved.
          </Text>
        </Container>
      </Section>
    </>
  );
}
