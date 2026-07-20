"use client";

import { useEffect, useRef, type ReactNode } from "react";

type HeroParallaxProps = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

/**
 * Very small desktop-only pointer parallax for a hero product cluster.
 * Disabled under prefers-reduced-motion and on touch/coarse pointers.
 * Never changes layout — only nudges a CSS custom property consumed by
 * `transform: translate(...)` on the children.
 */
export function HeroParallax({
  children,
  className = "",
  ariaLabel,
}: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    function handleMove(event: PointerEvent) {
      const rect = element!.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      element!.style.setProperty("--parallax-x", px.toFixed(3));
      element!.style.setProperty("--parallax-y", py.toFixed(3));
    }

    function handleLeave() {
      element!.style.setProperty("--parallax-x", "0");
      element!.style.setProperty("--parallax-y", "0");
    }

    element.addEventListener("pointermove", handleMove);
    element.addEventListener("pointerleave", handleLeave);
    return () => {
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div aria-label={ariaLabel} className={className} ref={ref}>
      {children}
    </div>
  );
}
