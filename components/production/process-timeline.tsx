"use client";

import { useEffect, useRef } from "react";

type ProcessStage = {
  index: string;
  title: string;
  body: string;
};

/**
 * Vertical process timeline for /production. Two independent
 * IntersectionObservers per step (no continuous scroll-position math, no
 * GSAP/ScrollTrigger — the catalog page already established CSS + IO as the
 * non-homepage motion convention, see docs/05-MOTION.md), each writing
 * directly to the DOM via refs rather than React state — the same escape
 * hatch components/motion/safe-reveal.tsx already uses for scroll-driven
 * dataset flags, which avoids re-rendering on every scroll tick:
 * - a generous one-shot observer reveals each step as it scrolls in;
 * - a narrow center-band observer tracks a single "active" step and writes
 *   the spine's fill amount to the --process-progress custom property.
 */
export function ProcessTimeline({
  stages,
}: {
  stages: readonly ProcessStage[];
}) {
  const listRef = useRef<HTMLOListElement>(null);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const steps = stepRefs.current.filter(
      (element): element is HTMLLIElement => element !== null,
    );
    if (steps.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      steps.forEach((step) => {
        step.dataset.revealed = "true";
      });
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.revealed = "true";
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.12 },
    );

    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const order = Number(entry.target.getAttribute("data-step-order"));
          steps.forEach((step, index) => {
            step.dataset.active = index === order ? "true" : "false";
          });
          const progress = steps.length <= 1 ? 0 : order / (steps.length - 1);
          listRef.current?.style.setProperty(
            "--process-progress",
            String(progress),
          );
        });
      },
      { rootMargin: "-42% 0px -46% 0px", threshold: 0 },
    );

    steps.forEach((step) => {
      revealObserver.observe(step);
      activeObserver.observe(step);
    });

    return () => {
      revealObserver.disconnect();
      activeObserver.disconnect();
    };
  }, [stages]);

  return (
    <ol className="production-process__list" ref={listRef}>
      {stages.map((stage, order) => (
        <li
          className="production-process__step"
          data-active="false"
          data-revealed="false"
          data-step-order={order}
          key={stage.index}
          ref={(element) => {
            stepRefs.current[order] = element;
          }}
        >
          <span aria-hidden="true" className="production-process__dot" />
          <span aria-hidden="true" className="production-process__number">
            {stage.index}
          </span>
          <div className="production-process__content">
            <h3>{stage.title}</h3>
            <p>{stage.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
