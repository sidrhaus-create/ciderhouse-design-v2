"use client";

import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

export type HeroSlide = {
  id: string;
  /** Short name shown on the slide's tab. */
  label: string;
  tone: "ink" | "paper" | "brand";
  content: ReactNode;
};

const DURATION = 7000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

type State = { index: number; previous: number | null };

/**
 * Campaign poster slider for the homepage hero. Slides are server-rendered
 * and passed in as nodes; this component only decides which one is on stage.
 * It auto-advances, but pauses on hover, focus, when off-screen, when the tab
 * is hidden, on request (pause button) and entirely under reduced motion.
 * All transitions are CSS — GSAP never touches these elements.
 */
export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const count = slides.length;
  const [state, dispatch] = useReducer(
    (current: State, next: number): State => {
      const index = ((next % count) + count) % count;
      return index === current.index
        ? current
        : { index, previous: current.index };
    },
    { index: 0, previous: null },
  );
  const [userPaused, setUserPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(true);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const rootRef = useRef<HTMLElement>(null);
  const swipeStart = useRef<number | null>(null);

  const running = !reducedMotion && !userPaused && !held && visible;
  const { index, previous } = state;

  const go = useCallback((next: number) => dispatch(next), []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => go(index + 1), DURATION);
    return () => window.clearTimeout(timer);
  }, [running, index, go]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting && !document.hidden),
      { threshold: 0.35 },
    );
    observer.observe(root);
    const onVisibility = () => {
      if (document.hidden) setVisible(false);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") swipeStart.current = event.clientX;
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (swipeStart.current === null) return;
    const delta = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(delta) > 56) go(index + (delta < 0 ? 1 : -1));
  }

  return (
    <section
      aria-label="Главное: Cider House и направления"
      aria-roledescription="карусель"
      className="hs"
      data-initial={previous === null ? "" : undefined}
      data-tone={slides[index].tone}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false);
      }}
      onFocus={() => setHeld(true)}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      ref={rootRef}
    >
      <div
        aria-live={running ? "off" : "polite"}
        className="hs__stage"
        onPointerCancel={() => (swipeStart.current = null)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {slides.map((slide, slideIndex) => {
          const stateName =
            slideIndex === index
              ? "active"
              : slideIndex === previous
                ? "previous"
                : "idle";
          return (
            <div
              aria-label={`${slideIndex + 1} из ${count}: ${slide.label}`}
              aria-roledescription="слайд"
              className={`hs-slide cx-tone-${slide.tone}`}
              data-state={stateName}
              inert={stateName !== "active"}
              key={slide.id}
              role="group"
            >
              {slide.content}
            </div>
          );
        })}
      </div>

      <div className="hs__bar">
        <div className="cx-wrap hs__bar-inner">
          <div
            aria-label="Выбор слайда"
            className="hs__tabs"
            onKeyDown={onKeyDown}
            role="group"
          >
            {slides.map((slide, slideIndex) => {
              const isActive = slideIndex === index;
              return (
                <button
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`Слайд ${slideIndex + 1}: ${slide.label}`}
                  className="hs-tab"
                  key={slide.id}
                  onClick={() => go(slideIndex)}
                  type="button"
                >
                  <span aria-hidden="true" className="hs-tab__bar">
                    {isActive ? (
                      <i
                        key={`${slide.id}-${index}`}
                        style={
                          {
                            animationDuration: `${DURATION}ms`,
                            animationPlayState: running ? "running" : "paused",
                          } as CSSProperties
                        }
                      />
                    ) : null}
                  </span>
                  <span aria-hidden="true" className="hs-tab__num">
                    {String(slideIndex + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="hs-tab__label">
                    {slide.label}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="hs__controls">
            {reducedMotion ? null : (
              <button
                aria-label={
                  userPaused
                    ? "Включить автопрокрутку"
                    : "Остановить автопрокрутку"
                }
                className="hs__control"
                onClick={() => setUserPaused((value) => !value)}
                type="button"
              >
                <span aria-hidden="true">{userPaused ? "▶" : "❙❙"}</span>
              </button>
            )}
            <button
              aria-label="Предыдущий слайд"
              className="hs__control"
              onClick={() => go(index - 1)}
              type="button"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              aria-label="Следующий слайд"
              className="hs__control"
              onClick={() => go(index + 1)}
              type="button"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
