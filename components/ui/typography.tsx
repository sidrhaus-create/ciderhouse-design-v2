import type { ComponentPropsWithoutRef, ElementType } from "react";

type HeadingProps = Omit<ComponentPropsWithoutRef<"h2">, "color"> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "display-xl" | "display-lg" | "heading-1" | "heading-2" | "heading-3";
};

export function Heading({
  as: Tag = "h2",
  className = "",
  size = "heading-2",
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={`type-heading type-${size} ${className}`.trim()}
      {...props}
    />
  );
}

type TextProps = ComponentPropsWithoutRef<"p"> & {
  as?: "p" | "span" | "div";
  size?: "body-lg" | "body" | "body-sm" | "label" | "caption";
  tone?: "default" | "muted" | "inverse";
};

export function Text({
  as = "p",
  className = "",
  size = "body",
  tone = "default",
  ...props
}: TextProps) {
  const Tag = as as ElementType;
  return (
    <Tag
      className={`type-text type-${size} text--${tone} ${className}`.trim()}
      {...props}
    />
  );
}
