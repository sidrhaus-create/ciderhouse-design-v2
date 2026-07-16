import type { Metadata } from "next";
import { Accordion } from "@/components/ui/accordion";
import { BrandCard, EmptyCard, ProductCard } from "@/components/ui/cards";
import { Container } from "@/components/ui/container";
import { Dialog } from "@/components/ui/dialog";
import { Drawer } from "@/components/ui/drawer";
import { Grid } from "@/components/ui/grid";
import { Section } from "@/components/ui/section";
import { StatusMessage, ToastPreview } from "@/components/ui/status";
import { Tabs } from "@/components/ui/tabs";
import { Heading, Text } from "@/components/ui/typography";
import { FormPreview } from "@/components/previews/interactive-previews";
import { previewBrands, previewProducts } from "@/data/preview-content";

export const metadata: Metadata = {
  title: "Components preview",
  description:
    "Accessible typed UI component previews for the Cider House foundation.",
};

const accordionItems = [
  {
    id: "product-lock",
    title: "How does product lock work?",
    content: (
      <Text tone="muted">
        ProductAsset always uses contain sizing and an approved file path. It
        never crops, recolors, redraws, or overlays packaging details.
      </Text>
    ),
  },
  {
    id: "reduced-motion",
    title: "What changes with reduced motion?",
    content: (
      <Text tone="muted">
        Content remains complete and visible. Continuous and scroll-scrubbed
        movement stops while structure, copy, and actions remain intact.
      </Text>
    ),
  },
  {
    id: "content",
    title: "Is this real product content?",
    content: (
      <Text tone="muted">
        No. Preview copy is explicitly marked as placeholder and does not make
        product claims.
      </Text>
    ),
  },
];

export default function ComponentsPreviewPage() {
  return (
    <>
      <Section className="page-hero" spacing="roomy" tone="ink">
        <Container size="wide">
          <span className="eyebrow eyebrow--inverse">
            02 / Foundation route
          </span>
          <Heading as="h1" size="display-xl">
            Components
          </Heading>
          <Text size="body-lg" tone="inverse">
            Reusable, typed building blocks with keyboard paths, explicit
            states, and product-safe media.
          </Text>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Cards + product lock</span>
              <Heading as="h2" size="heading-1">
                Real asset, placeholder facts
              </Heading>
            </div>
            <Text tone="muted">
              The supplied PNG remains fully visible and unchanged.
            </Text>
          </div>
          <Grid className="component-card-grid" columns={3}>
            <ProductCard placeholder product={previewProducts[0]!} />
            <BrandCard brand={previewBrands[0]!} placeholder />
            <EmptyCard message="Empty-state: no approved items match this preview filter." />
          </Grid>
        </Container>
      </Section>

      <Section tone="muted">
        <Container size="wide">
          <Grid className="preview-split" columns={2}>
            <div>
              <span className="eyebrow">Forms + filters</span>
              <Heading as="h2" size="heading-2">
                Validation states
              </Heading>
              <FormPreview />
            </div>
            <div>
              <span className="eyebrow">Status system</span>
              <Heading as="h2" size="heading-2">
                Live feedback
              </Heading>
              <div className="status-stack">
                <StatusMessage>
                  Information state for neutral guidance.
                </StatusMessage>
                <StatusMessage tone="success">
                  Success state with polite announcement.
                </StatusMessage>
                <StatusMessage tone="error">
                  Error state with assertive announcement.
                </StatusMessage>
                <StatusMessage tone="loading">
                  Loading state without layout shift.
                </StatusMessage>
                <ToastPreview />
              </div>
            </div>
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <Grid className="preview-split" columns={2}>
            <div>
              <span className="eyebrow">Disclosure</span>
              <Heading as="h2" size="heading-2">
                Accordion
              </Heading>
              <Accordion items={accordionItems} />
            </div>
            <div>
              <span className="eyebrow">Views</span>
              <Heading as="h2" size="heading-2">
                Keyboard tabs
              </Heading>
              <Tabs
                items={[
                  {
                    id: "mobile",
                    label: "Mobile",
                    content: (
                      <Text>
                        4-column grid, independent art direction, touch-first
                        controls.
                      </Text>
                    ),
                  },
                  {
                    id: "tablet",
                    label: "Tablet",
                    content: (
                      <Text>
                        8-column grid with fluid gutters and rebalanced
                        compositions.
                      </Text>
                    ),
                  },
                  {
                    id: "desktop",
                    label: "Desktop",
                    content: (
                      <Text>
                        12-column grid with readable content widths and
                        intentional negative space.
                      </Text>
                    ),
                  },
                ]}
                label="Responsive modes"
              />
            </div>
          </Grid>
        </Container>
      </Section>

      <Section tone="ink">
        <Container size="wide">
          <div className="section-heading">
            <div>
              <span className="eyebrow eyebrow--inverse">Overlays</span>
              <Heading as="h2" size="heading-1">
                Dialog + drawer
              </Heading>
            </div>
            <Text tone="inverse">
              Native dialog semantics, focus containment, Escape handling, and
              scroll-lock cleanup.
            </Text>
          </div>
          <div className="button-specimen">
            <Dialog title="Accessible dialog" triggerLabel="Открыть dialog">
              <Text tone="muted">
                A focused decision surface for short, deliberate tasks.
              </Text>
            </Dialog>
            <Drawer title="Accessible drawer" triggerLabel="Открыть drawer">
              <Text tone="muted">
                A touch-friendly side panel for navigation or filters.
              </Text>
            </Drawer>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <div className="nav-anatomy">
            <div>
              <span className="eyebrow">Responsive application shell</span>
              <Heading as="h2" size="heading-2">
                Navigation is already live
              </Heading>
            </div>
            <Text tone="muted">
              Resize below 860 px to switch the header from desktop links to the
              full-height mobile menu. Touch and keyboard paths use the same
              working routes.
            </Text>
          </div>
        </Container>
      </Section>
    </>
  );
}
