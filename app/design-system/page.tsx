import type { Metadata } from "next";
import Image from "next/image";
import { Button, ButtonLink, TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "Cider House foundation tokens for color, typography, spacing, layout, and motion.",
};

const colors = [
  {
    name: "Master primary",
    value: "#6B3077",
    status: "Pantone 7663 C · RGB 107 48 119",
    className: "swatch--primary",
  },
  {
    name: "Secondary white",
    value: "#FFFFFF",
    status: "RGB 255 255 255 · CMYK 0 0 0 0",
    className: "swatch--white",
  },
  {
    name: "Secondary black",
    value: "#000000",
    status: "RGB 0 0 0 · CMYK 91 79 62 97",
    className: "swatch--black",
  },
] as const;

const brandAssets = [
  {
    name: "Horizontal master · black",
    path: "/assets/brand/master-logo/cider-house-logo-horizontal-black.svg",
    width: 3094,
    height: 1000,
    stage: "",
  },
  {
    name: "Horizontal master · white",
    path: "/assets/brand/master-logo/cider-house-logo-horizontal-white.svg",
    width: 3775,
    height: 1000,
    stage: "brand-asset-card__stage--purple",
  },
  {
    name: "Master badge · black",
    path: "/assets/brand/master-logo/cider-house-logo-badge-black.svg",
    width: 227,
    height: 227,
    stage: "",
  },
  {
    name: "Master badge · white on purple",
    path: "/assets/brand/master-logo/cider-house-logo-badge-white-on-purple.svg",
    width: 280,
    height: 280,
    stage: "",
  },
  {
    name: "Colibri · black",
    path: "/assets/brand/symbols/cider-house-colibri-black.svg",
    width: 585,
    height: 1000,
    stage: "",
  },
  {
    name: "Colibri · white",
    path: "/assets/brand/symbols/cider-house-colibri-white.svg",
    width: 609,
    height: 1000,
    stage: "brand-asset-card__stage--ink",
  },
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
            Official identity paths and colors extracted from the supplied
            brandbook, with unresolved typography kept explicitly temporary.
          </Text>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Color</span>
              <Heading as="h2" size="heading-1">
                Official palette
              </Heading>
            </div>
            <Text tone="muted">
              These are the only official palette values documented in the
              supplied brandbook.
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
              <span className="eyebrow">Extracted identity</span>
              <Heading as="h2" size="heading-2">
                Native vector assets
              </Heading>
            </div>
            <Text tone="muted">
              Exported from existing PDF paths without tracing, redrawing,
              retyping, simplification, or recoloring.
            </Text>
          </div>
          <div className="brand-asset-grid">
            {brandAssets.map((asset) => (
              <article className="brand-asset-card" key={asset.path}>
                <div className={`brand-asset-card__stage ${asset.stage}`}>
                  <Image
                    alt={`${asset.name} extracted from the supplied brandbook`}
                    height={asset.height}
                    src={asset.path}
                    width={asset.width}
                  />
                </div>
                <div className="brand-asset-card__meta">
                  <Heading as="h3" size="heading-3">
                    {asset.name}
                  </Heading>
                  <code>{asset.path}</code>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Typography</span>
              <Heading as="h2" size="heading-1">
                Documented names + temporary hierarchy
              </Heading>
            </div>
            <span className="status-chip">Production font files missing</span>
          </div>
          <div className="type-specimen">
            <div className="type-specimen__row">
              <code>White Phoenix</code>
              <div>
                <Heading as="h3" size="heading-3">
                  Sauna-SmallCaps
                </Heading>
                <Text tone="muted">
                  Official family font name. No separate weight or licensed font
                  file is supplied.
                </Text>
              </div>
            </div>
            <div className="type-specimen__row">
              <code>Double Tree</code>
              <div>
                <Heading as="h3" size="heading-3">
                  Cera PRO Medium
                </Heading>
                <Text tone="muted">
                  Official family font name and Medium weight. No licensed font
                  file is supplied.
                </Text>
              </div>
            </div>
            <div className="type-specimen__row">
              <code>Website fallback</code>
              <Text tone="muted">
                Arial / Helvetica remains a clearly temporary interface stack.
                The PDF does not identify master website display or body fonts.
              </Text>
            </div>
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
              Linked action →
            </ButtonLink>
            <TextLink href="/motion-playground">Text link →</TextLink>
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
