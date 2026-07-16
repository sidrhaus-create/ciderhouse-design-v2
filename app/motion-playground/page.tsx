import type { Metadata } from "next";
import { SafeReveal } from "@/components/motion/safe-reveal";
import { ScrollProof } from "@/components/motion/scroll-proof";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Marquee } from "@/components/ui/marquee";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Motion playground",
  description:
    "Native-scroll and reduced-motion prototypes for the Cider House foundation.",
};

export default function MotionPlaygroundPage() {
  return (
    <>
      <Section className="page-hero motion-hero" spacing="roomy" tone="brand">
        <Container size="wide">
          <span className="eyebrow eyebrow--inverse">
            03 / Foundation route
          </span>
          <Heading as="h1" size="display-xl">
            Motion with purpose
          </Heading>
          <Text size="body-lg" tone="inverse">
            Small, reversible prototypes establish timing and cleanup rules
            without defining the final homepage choreography.
          </Text>
        </Container>
      </Section>

      <Marquee
        items={[
          "PRODUCT FIRST",
          "NATIVE SCROLL",
          "MOBILE READY",
          "REVERSIBLE",
          "REDUCED MOTION",
        ]}
        label="Motion principles"
      />

      <Section spacing="roomy">
        <Container size="wide">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Tier 2</span>
              <Heading as="h2" size="heading-1">
                Safe reveal
              </Heading>
            </div>
            <Text tone="muted">
              IntersectionObserver runs once; reduced motion renders the final
              state immediately.
            </Text>
          </div>
          <Grid className="reveal-grid" columns={3}>
            {["Hierarchy", "Product focus", "Stable teardown"].map(
              (item, index) => (
                <SafeReveal
                  className={`reveal-card reveal-card--${index + 1}`}
                  key={item}
                >
                  <span>0{index + 1}</span>
                  <Heading as="h3" size="heading-2">
                    {item}
                  </Heading>
                  <Text tone="muted">
                    A restrained entrance supports reading order without
                    blocking interaction.
                  </Text>
                </SafeReveal>
              ),
            )}
          </Grid>
        </Container>
      </Section>

      <Section className="scroll-proof-section" spacing="roomy" tone="ink">
        <Container size="wide">
          <div className="section-heading">
            <div>
              <span className="eyebrow eyebrow--inverse">Tier 2 / GSAP</span>
              <Heading as="h2" size="heading-1">
                Short scroll proof
              </Heading>
            </div>
            <Text tone="inverse">
              No pinned dead zone. Scroll forward, reverse, or flick quickly.
            </Text>
          </div>
          <ScrollProof />
        </Container>
      </Section>

      <Section>
        <Container className="motion-contract" size="wide">
          <div>
            <span className="eyebrow">Fallback contract</span>
            <Heading as="h2" size="heading-2">
              Reduced motion keeps the story complete.
            </Heading>
          </div>
          <ul>
            <li>Ticker stops and remains readable.</li>
            <li>Reveal cards render fully visible.</li>
            <li>ScrollTrigger is not created.</li>
            <li>All copy and actions remain in document flow.</li>
          </ul>
        </Container>
      </Section>
    </>
  );
}
