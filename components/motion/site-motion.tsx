"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * The single GSAP/ScrollTrigger controller for every public page.
 *
 * Pages opt in with data attributes; nothing here knows about a specific
 * section. Hooks:
 *
 *   data-lines        heading whose `.cx-line > span` children rise from a mask
 *   data-fade         element fades up once
 *   data-stagger      direct children fade up one after another
 *   data-words        `span` children light up word by word while scrolling
 *   data-parallax     media inside a clipped frame drifts and settles
 *   data-drift="n"    element slides horizontally by n% across its pass
 *   data-rise="n"     element travels vertically by n% across its pass (depth)
 *   data-runway       pinned section whose `[data-runway-track]` moves sideways
 *
 * Wide screens get the scrubbed/pinned choreography; narrow screens get light
 * one-shot reveals only; reduced motion gets a fully static page. Native
 * scrolling is never intercepted — pins only hold a section while its own
 * content travels.
 */
export function SiteMotion({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      const q = gsap.utils.selector(root);

      const reveals = (distance: number) => {
        q("[data-lines]").forEach((heading) => {
          const lines = heading.querySelectorAll(".cx-line > span");
          if (!lines.length) return;
          gsap.from(lines, {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: { trigger: heading, start: "top 88%" },
          });
        });

        q("[data-fade]").forEach((element) => {
          gsap.from(element, {
            y: distance,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 92%" },
          });
        });

        q("[data-stagger]").forEach((group) => {
          gsap.from(group.children, {
            y: distance,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: { trigger: group, start: "top 88%" },
          });
        });
      };

      media.add("(prefers-reduced-motion: reduce)", () => {
        root.dataset.motion = "off";
      });

      media.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
        () => {
          root.dataset.motion = "full";

          /* Pins first, so every later trigger measures the final layout. */
          q("[data-runway]").forEach((section) => {
            const track = section.querySelector<HTMLElement>(
              "[data-runway-track]",
            );
            if (!track) return;
            const distance = () =>
              Math.max(0, track.scrollWidth - section.clientWidth);
            gsap.to(track, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${distance()}`,
                pin: true,
                scrub: 0.6,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });
          });

          reveals(40);

          q("[data-words]").forEach((block) => {
            const words = block.querySelectorAll("span");
            gsap.fromTo(
              words,
              { opacity: 0.16 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.05,
                scrollTrigger: {
                  trigger: block,
                  start: "top 82%",
                  end: "bottom 58%",
                  scrub: 0.4,
                },
              },
            );
          });

          q("[data-parallax]").forEach((frame) => {
            const target = frame.querySelector("img, video");
            if (!target) return;
            gsap.fromTo(
              target,
              { yPercent: -9, scale: 1.18 },
              {
                yPercent: 9,
                scale: 1.04,
                ease: "none",
                scrollTrigger: {
                  trigger: frame,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          });

          q("[data-drift]").forEach((element) => {
            const amount = Number(element.dataset.drift) || 10;
            gsap.fromTo(
              element,
              { xPercent: amount },
              {
                xPercent: -amount,
                ease: "none",
                scrollTrigger: {
                  trigger: element.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.5,
                },
              },
            );
          });

          q("[data-rise]").forEach((element) => {
            const amount = Number(element.dataset.rise) || 10;
            gsap.fromTo(
              element,
              { yPercent: amount },
              {
                yPercent: -amount,
                ease: "none",
                scrollTrigger: {
                  trigger: element.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.5,
                },
              },
            );
          });

          ScrollTrigger.sort();
          ScrollTrigger.refresh();

          return () => {
            delete root.dataset.motion;
          };
        },
      );

      /* Narrow screens: lighter one-shot reveals, no pins, no scrubbing. */
      media.add(
        "(prefers-reduced-motion: no-preference) and (max-width: 1023px)",
        () => {
          root.dataset.motion = "lite";
          reveals(20);
          return () => {
            delete root.dataset.motion;
          };
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
    window.addEventListener("load", refresh, { once: true });
    void document.fonts.ready.then(() => {
      if (root.isConnected) refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      window.removeEventListener("orientationchange", refresh);
      window.removeEventListener("load", refresh);
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <div className={`cx-page ${className}`.trim()} ref={rootRef}>
      {children}
    </div>
  );
}
