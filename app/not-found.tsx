import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";

export default function NotFound() {
  return (
    <Section className="not-found" spacing="roomy" tone="ink">
      <Container size="narrow">
        <span className="eyebrow eyebrow--inverse">404 / Route not found</span>
        <Heading as="h1" size="display-lg">
          This route is outside the foundation.
        </Heading>
        <Text size="body-lg" tone="inverse">
          The requested page has not been created or is not part of this review
          stage.
        </Text>
        <ButtonLink href="/" variant="inverse">
          Вернуться к foundation
        </ButtonLink>
      </Container>
    </Section>
  );
}
