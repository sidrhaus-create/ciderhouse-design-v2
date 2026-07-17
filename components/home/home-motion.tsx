"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

export function HomeMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            "[data-home-reveal]",
            "[data-home-hero-bottle]",
            "[data-home-hero-symbol]",
            "[data-home-world-visual]",
            "[data-home-world-logo]",
            "[data-home-world-copy]",
            "[data-home-story-symbol]",
            "[data-home-zero-showcase]",
            "[data-home-zero-taste]",
            "[data-home-final-product]",
            "[data-home-city-symbol]",
            "[data-home-social-card]",
            "[data-home-partner-audience]",
            "[data-production-bottle]",
            "[data-production-step]",
            "[data-production-progress]",
          ].join(", "),
          {
            clearProps: "all",
          },
        );
      });

      media.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 769px)",
        () => {
          const hero = root.querySelector<HTMLElement>("[data-home-hero]");
          if (hero) {
            gsap.to("[data-home-hero-copy]", {
              yPercent: -8,
              opacity: 0.78,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 0.3,
                invalidateOnRefresh: true,
              },
            });

            gsap.utils
              .toArray<HTMLElement>("[data-home-hero-bottle]")
              .forEach((element, index) => {
                gsap.to(element, {
                  yPercent: index === 1 ? 7 : 13,
                  scale: index === 1 ? 0.985 : 0.97,
                  ease: "none",
                  scrollTrigger: {
                    trigger: hero,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.32 + index * 0.08,
                    invalidateOnRefresh: true,
                  },
                });
              });

            gsap.to("[data-home-hero-symbol]", {
              xPercent: -5,
              yPercent: 10,
              rotate: -3,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            });
          }

          gsap.utils
            .toArray<HTMLElement>("[data-home-reveal]:not([data-home-world])")
            .forEach((element) => {
              gsap.fromTo(
                element,
                { y: 44, opacity: 0.68 },
                {
                  y: 0,
                  opacity: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 90%",
                    end: "top 58%",
                    scrub: 0.28,
                    invalidateOnRefresh: true,
                  },
                },
              );
            });

          gsap.utils
            .toArray<HTMLElement>("[data-home-world]")
            .forEach((world) => {
              const visual = world.querySelector<HTMLElement>(
                "[data-home-world-visual]",
              );
              const logo = world.querySelector<HTMLElement>(
                "[data-home-world-logo]",
              );
              const copy = world.querySelector<HTMLElement>(
                "[data-home-world-copy]",
              );
              const meta = world.querySelector<HTMLElement>(
                "[data-home-world-meta]",
              );

              if (visual) {
                gsap.fromTo(
                  visual,
                  { y: 32 },
                  {
                    y: -18,
                    ease: "none",
                    scrollTrigger: {
                      trigger: world,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 0.4,
                      invalidateOnRefresh: true,
                    },
                  },
                );
              }

              if (logo) {
                gsap.fromTo(
                  logo,
                  { clipPath: "inset(0 0 100% 0)", y: 24 },
                  {
                    clipPath: "inset(0 0 0% 0)",
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                      trigger: world,
                      start: "top 82%",
                      end: "top 48%",
                      scrub: 0.3,
                      invalidateOnRefresh: true,
                    },
                  },
                );
              }

              if (copy) {
                gsap.fromTo(
                  copy,
                  { x: 38, opacity: 0.58 },
                  {
                    x: 0,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                      trigger: world,
                      start: "top 82%",
                      end: "top 52%",
                      scrub: 0.28,
                      invalidateOnRefresh: true,
                    },
                  },
                );
              }

              if (meta) {
                gsap.fromTo(
                  meta,
                  { opacity: 0.45 },
                  {
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                      trigger: world,
                      start: "top 88%",
                      end: "top 62%",
                      scrub: 0.25,
                    },
                  },
                );
              }

              gsap.utils
                .toArray<HTMLElement>(
                  world.querySelectorAll("[data-home-product-lock]"),
                )
                .forEach((product, index) => {
                  gsap.fromTo(
                    product,
                    { yPercent: index === 1 ? 3 : 8 },
                    {
                      yPercent: index === 1 ? -2 : -5,
                      ease: "none",
                      scrollTrigger: {
                        trigger: world,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.38 + index * 0.08,
                        invalidateOnRefresh: true,
                      },
                    },
                  );
                });
            });

          const zeroFeature = root.querySelector<HTMLElement>(
            "[data-home-zero-feature]",
          );
          if (zeroFeature) {
            gsap.fromTo(
              "[data-home-zero-showcase]",
              { y: 46 },
              {
                y: -20,
                ease: "none",
                scrollTrigger: {
                  trigger: zeroFeature,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.4,
                  invalidateOnRefresh: true,
                },
              },
            );

            gsap.utils
              .toArray<HTMLElement>("[data-home-zero-taste]")
              .forEach((taste, index) => {
                gsap.fromTo(
                  taste,
                  { x: 22, opacity: 0.58 },
                  {
                    x: 0,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                      trigger: taste,
                      start: "top 88%",
                      end: "top 68%",
                      scrub: 0.2 + index * 0.05,
                    },
                  },
                );
              });
          }

          const story = root.querySelector<HTMLElement>("[data-home-story]");
          if (story) {
            gsap.to("[data-home-story-symbol]", {
              xPercent: -8,
              yPercent: 8,
              rotate: -5,
              ease: "none",
              scrollTrigger: {
                trigger: story,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            });
          }

          const production = root.querySelector<HTMLElement>(
            "[data-production-story]",
          );
          if (production) {
            gsap.to("[data-production-bottle]", {
              yPercent: 8,
              rotate: 1.5,
              ease: "none",
              scrollTrigger: {
                trigger: production,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.36,
                invalidateOnRefresh: true,
              },
            });

            const steps = gsap.utils.toArray<HTMLElement>(
              "[data-production-step]",
            );
            const progress = root.querySelector<HTMLElement>(
              "[data-production-progress]",
            );

            const activateStage = (activeIndex: number) => {
              steps.forEach((step, index) =>
                step.classList.toggle("is-active", index === activeIndex),
              );
              if (progress) {
                gsap.to(progress, {
                  scaleY: (activeIndex + 1) / steps.length,
                  duration: 0.24,
                  ease: "power2.out",
                  overwrite: true,
                });
              }
            };

            activateStage(0);
            steps.forEach((element, index) => {
              ScrollTrigger.create({
                trigger: element,
                start: "top 58%",
                end: "bottom 42%",
                onEnter: () => activateStage(index),
                onEnterBack: () => activateStage(index),
                onLeaveBack: () => activateStage(Math.max(0, index - 1)),
                invalidateOnRefresh: true,
              });

              gsap.fromTo(
                element,
                { x: 28, opacity: 0.58 },
                {
                  x: 0,
                  opacity: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 86%",
                    end: "top 64%",
                    scrub: 0.25,
                    invalidateOnRefresh: true,
                  },
                },
              );
            });
          }

          const cityField = root.querySelector<HTMLElement>(".home-city-field");
          if (cityField) {
            gsap.to("[data-home-city-symbol]", {
              xPercent: -12,
              yPercent: -8,
              rotate: -4,
              ease: "none",
              scrollTrigger: {
                trigger: cityField,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.55,
                invalidateOnRefresh: true,
              },
            });
          }

          gsap.utils
            .toArray<HTMLElement>(
              "[data-home-social-card], [data-home-partner-audience]",
            )
            .forEach((element) => {
              gsap.fromTo(
                element,
                { y: 24, opacity: 0.65 },
                {
                  y: 0,
                  opacity: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 90%",
                    end: "top 72%",
                    scrub: 0.22,
                    invalidateOnRefresh: true,
                  },
                },
              );
            });

          const finalProduct = root.querySelector<HTMLElement>(
            "[data-home-final-product]",
          );
          if (finalProduct) {
            gsap.fromTo(
              finalProduct,
              { y: 42 },
              {
                y: -16,
                ease: "none",
                scrollTrigger: {
                  trigger: finalProduct,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.42,
                  invalidateOnRefresh: true,
                },
              },
            );
          }
        },
      );

      media.add(
        "(prefers-reduced-motion: no-preference) and (max-width: 768px)",
        () => {
          gsap.utils
            .toArray<HTMLElement>(
              "[data-home-reveal], [data-home-social-card], [data-home-partner-audience]",
            )
            .forEach((element) => {
              gsap.fromTo(
                element,
                { y: 20, opacity: 0.62 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.48,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 91%",
                    toggleActions: "play none none reverse",
                  },
                },
              );
            });
        },
      );
    }, root);

    let refreshFrame = 0;
    const refresh = () => {
      window.cancelAnimationFrame(refreshFrame);
      refreshFrame = window.requestAnimationFrame(() =>
        ScrollTrigger.refresh(),
      );
    };
    const refreshAfterLoad = () => refresh();
    window.addEventListener("orientationchange", refresh);
    window.addEventListener("load", refreshAfterLoad, { once: true });
    void document.fonts.ready.then(() => {
      if (root.isConnected) refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      window.removeEventListener("orientationchange", refresh);
      window.removeEventListener("load", refreshAfterLoad);
      root
        .querySelectorAll(".home-production-step.is-active")
        .forEach((element) => element.classList.remove("is-active"));
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <div className="home-page" ref={rootRef}>
      {children}
    </div>
  );
}
