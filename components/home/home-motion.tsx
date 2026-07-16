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
          "[data-home-reveal], [data-home-hero-bottle], [data-production-step]",
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
              yPercent: -10,
              opacity: 0.72,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 0.35,
                invalidateOnRefresh: true,
              },
            });

            gsap.utils
              .toArray<HTMLElement>("[data-home-hero-bottle]")
              .forEach((element, index) => {
                gsap.to(element, {
                  yPercent: index === 1 ? 9 : 15,
                  rotate: index === 0 ? -1.5 : index === 2 ? 1.5 : 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: hero,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.45,
                    invalidateOnRefresh: true,
                  },
                });
              });
          }

          gsap.utils
            .toArray<HTMLElement>("[data-home-reveal]")
            .forEach((element) => {
              gsap.fromTo(
                element,
                { y: 54, opacity: 0.28 },
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

          const production = root.querySelector<HTMLElement>(
            "[data-production-story]",
          );
          if (production) {
            gsap.to("[data-production-bottle]", {
              yPercent: 14,
              rotate: 2.5,
              ease: "none",
              scrollTrigger: {
                trigger: production,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.4,
                invalidateOnRefresh: true,
              },
            });

            gsap.utils
              .toArray<HTMLElement>("[data-production-step]")
              .forEach((element) => {
                gsap.fromTo(
                  element,
                  { x: 34, opacity: 0.32 },
                  {
                    x: 0,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                      trigger: element,
                      start: "top 86%",
                      end: "top 60%",
                      scrub: 0.25,
                      invalidateOnRefresh: true,
                    },
                  },
                );
              });
          }
        },
      );

      media.add(
        "(prefers-reduced-motion: no-preference) and (max-width: 768px)",
        () => {
          gsap.utils
            .toArray<HTMLElement>("[data-home-reveal]")
            .forEach((element) => {
              gsap.fromTo(
                element,
                { y: 24, opacity: 0.45 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.55,
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
    window.addEventListener("orientationchange", refresh);

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      window.removeEventListener("orientationchange", refresh);
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
