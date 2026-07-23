"use client";

import { useEffect, useState } from "react";

const SHOW_AFTER_PX = 560;

/** Tiny, isolated scroll-to-top control. No Motion/GSAP — plain scroll API only. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleClick() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <button
      aria-label="Наверх"
      aria-hidden={!visible}
      className="back-to-top"
      data-visible={visible}
      onClick={handleClick}
      tabIndex={visible ? 0 : -1}
      type="button"
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
