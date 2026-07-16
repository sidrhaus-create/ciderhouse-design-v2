import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: "default" | "wide" | "narrow";
};

export function Container({
  className = "",
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={`container container--${size} ${className}`.trim()}
      {...props}
    />
  );
}
