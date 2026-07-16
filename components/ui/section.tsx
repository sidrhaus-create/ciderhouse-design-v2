import type { ComponentPropsWithoutRef } from "react";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: "paper" | "ink" | "brand" | "muted";
  spacing?: "compact" | "default" | "roomy";
};

export function Section({
  className = "",
  tone = "paper",
  spacing = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={`section section--${tone} section--${spacing} ${className}`.trim()}
      {...props}
    />
  );
}
