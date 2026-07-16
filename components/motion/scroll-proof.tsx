"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export function ScrollProof() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-scroll-orbit]",
        { yPercent: -10, rotate: -4 },
        {
          yPercent: 10,
          rotate: 4,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        "[data-scroll-copy]",
        { y: 26, opacity: 0.55 },
        {
          y: -18,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 82%",
            end: "bottom 36%",
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        },
      );
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div className="scroll-proof" ref={rootRef}>
      <div aria-hidden="true" className="scroll-proof__orbit" data-scroll-orbit>
        <span />
        <span />
        <span />
      </div>
      <div className="scroll-proof__copy" data-scroll-copy>
        <span className="status-chip status-chip--dark">
          ScrollTrigger proof
        </span>
        <h2 className="type-heading type-display-lg">
          Native scroll stays yours.
        </h2>
        <p className="type-text type-body-lg text--inverse">
          A short reversible scrub maps scroll progress to two restrained
          transforms. There is no pin, wheel interception, or smooth-scroll
          layer.
        </p>
      </div>
    </div>
  );
}
