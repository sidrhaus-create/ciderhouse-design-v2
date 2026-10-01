"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type SliderProps = {
  children: ReactNode;
  /** Accessible name of the carousel region. */
  label: string;
  className?: string;
  /** Optional heading/intro rendered beside the controls. */
  header?: ReactNode;
};

/**
 * Native scroll-snap carousel: swipe, trackpad, keyboard and wheel all work
 * without JavaScript; the buttons and progress bar are an enhancement. No
 * animation library is involved, so it never competes with ScrollTrigger.
 */
export function Slider({
  children,
  label,
  className = "",
  header,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const position = max > 0 ? track.scrollLeft / max : 0;
    setProgress(position);
    setEdges({
      start: track.scrollLeft <= 2,
      end: track.scrollLeft >= max - 2,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  function move(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollBy({
      left: direction * track.clientWidth * 0.82,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <div className={`cx-slider ${className}`.trim()}>
      <div className="cx-slider__head">
        {header}
        <div className="cx-slider__controls">
          <button
            aria-label="Назад"
            className="cx-slider__button"
            disabled={edges.start}
            onClick={() => move(-1)}
            type="button"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            aria-label="Вперёд"
            className="cx-slider__button"
            disabled={edges.end}
            onClick={() => move(1)}
            type="button"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <div
        aria-label={label}
        className="cx-slider__track"
        ref={trackRef}
        role="region"
        tabIndex={0}
      >
        {children}
      </div>
      <div aria-hidden="true" className="cx-slider__progress">
        <span style={{ transform: `scaleX(${0.12 + progress * 0.88})` }} />
      </div>
    </div>
  );
}
