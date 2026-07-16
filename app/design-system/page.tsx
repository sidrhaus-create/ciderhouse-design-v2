import type { Metadata } from "next";
import { Button, ButtonLink, TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "Cider House foundation tokens for color, typography, spacing, layout, and motion.",
};

const colors = [
  {
    name: "Brand primary",
    value: "#5D2F6A",
    status: "confirmed",
    className: "swatch--primary",
  },
  {
    name: "Brand purple 2",
    value: "#6B3077",
    status: "brandbook",
    className: "swatch--purple-2",
  },
  {
    name: "Brand purple 3",
    value: "#774282",
    status: "documented",
    className: "swatch--purple-3",
  },
  {
    name: "Brand purple 4",
    value: "#601D70",
    status: "documented",
    className: "swatch--purple-4",
  },
  {
    name: "Ink",
    value: "#0C0B1A",
    status: "confirmed",
    className: "swatch--ink",
  },
  {
    name: "Paper",
    value: "#F7F2F4",
    status: "documented",
    className: "swatch--paper",
  },
  {
    name: "White",
    value: "#FFFFFF",
    status: "brandbook",
    className: "swatch--white",
  },
  {
    name: "Black",
    value: "#000000",
    status: "brandbook",
    className: "swatch--black",
  },
] as const;

const accents = [
  { name: "Double Tree", className: "accent--double-tree" },
  { name: "White Phoenix", className: "accent--white-phoenix" },
  { name: "Mister Bee", className: "accent--mister-bee" },
  { name: "0% collection", className: "accent--zero" },
] as const;

const typeSamples = [
  { token: "display-xl", sample: "Cinematic scale" },
  { token: "display-lg", sample: "Expressive systems" },
  { token: "heading-1", sample: "Heading one" },
  { token: "heading-2", sample: "Heading two" },
  { token: "heading-3", sample: "Heading three" },
] as const;

export default function DesignSystemPage() {
  return (
    <>
      <Section className="page-hero" spacing="roomy" tone="brand">
        <Container size="wide">
          <span className="eyebrow eyebrow--inverse">
            01 / Foundation route
          </span>
          <Heading as="h1" size="display-xl">
            Design system
          </Heading>
          <Text size="body-lg" tone="inverse">
            Confirmed brand foundations are separated from provisional working
            tokens, so later asset approval does not require component rewrites.
          </Text>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Color</span>
              <Heading as="h2" size="heading-1">
                Core palette
              </Heading>
            </div>
            <Text tone="muted">
              Status labels show the source and confidence of each value.
            </Text>
          </div>
          <div className="swatch-grid">
            {colors.map((color) => (
              <article className="swatch" key={color.name}>
                <div
                  aria-hidden="true"
                  className={`swatch__color ${color.className}`}
                />
                <div className="swatch__meta">
                  <strong>{color.name}</strong>
                  <code>{color.value}</code>
                  <span>{color.status}</span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container size="wide">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Family worlds</span>
              <Heading as="h2" size="heading-2">
                Provisional accent slots
              </Heading>
            </div>
            <span className="status-chip">Replace after official approval</span>
          </div>
          <Grid className="accent-grid" columns={4}>
            {accents.map((accent) => (
              <article
                className={`accent-card ${accent.className}`}
                key={accent.name}
              >
                <span>PROVISIONAL</span>
                <Heading as="h3" size="heading-3">
                  {accent.name}
                </Heading>
              </article>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Typography</span>
              <Heading as="h2" size="heading-1">
                Fluid hierarchy
              </Heading>
            </div>
            <span className="status-chip">Temporary system font</span>
          </div>
          <div className="type-specimen">
            {typeSamples.map((item) => (
              <div className="type-specimen__row" key={item.token}>
                <code>{item.token}</code>
                <div className={`type-heading type-${item.token}`}>
                  {item.sample}
                </div>
              </div>
            ))}
            <div className="type-specimen__row">
              <code>body-lg</code>
              <Text size="body-lg">
                Editorial rhythm stays readable across compact phones, tablets,
                and wide displays.
              </Text>
            </div>
            <div className="type-specimen__row">
              <code>body / label / caption</code>
              <div className="inline-type-samples">
                <Text>Body copy for interface and editorial content.</Text>
                <Text as="span" size="label">
                  LABEL TEXT
                </Text>
                <Text as="span" size="caption" tone="muted">
                  Caption and metadata
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container size="wide">
          <div className="section-heading">
            <div>
              <span className="eyebrow eyebrow--inverse">Controls</span>
              <Heading as="h2" size="heading-1">
                Action states
              </Heading>
            </div>
            <Text tone="inverse">
              All controls retain a visible keyboard focus ring.
            </Text>
          </div>
          <div className="button-specimen">
            <Button>Primary action</Button>
            <Button variant="inverse">Inverse action</Button>
            <Button variant="secondary">Secondary action</Button>
            <Button disabled>Disabled action</Button>
            <ButtonLink href="/components-preview" variant="inverse">
              Linked action ↗
            </ButtonLink>
            <TextLink href="/motion-playground">Text link ↗</TextLink>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Layout rhythm</span>
              <Heading as="h2" size="heading-2">
                Spacing and grid
              </Heading>
            </div>
            <Text tone="muted">4 columns mobile · 8 tablet · 12 desktop.</Text>
          </div>
          <div className="spacing-list" aria-label="Spacing token samples">
            {["2xs", "xs", "sm", "md", "lg", "xl", "2xl"].map((space) => (
              <div className="spacing-list__row" key={space}>
                <code>space-{space}</code>
                <span className={`space-block space-block--${space}`} />
              </div>
            ))}
          </div>
          <div aria-label="Responsive grid preview" className="grid-preview">
            {Array.from({ length: 12 }, (_, index) => (
              <span key={index}>{index + 1}</span>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
