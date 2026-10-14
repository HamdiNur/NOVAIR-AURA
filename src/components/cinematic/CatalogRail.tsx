"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import fragrances from "@/data/fragrances.json";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function CatalogRail() {
  const railRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [announce, setAnnounce] = useState("");
  const total = fragrances.length;

  // One card width plus the gap = how far one "step" scrolls
  const getStep = useCallback(() => {
    const rail = railRef.current;
    const card = rail?.querySelector("li");
    if (!rail || !card) return 0;
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const rail = railRef.current;
      if (!rail) return;
      const next = Math.min(total - 1, Math.max(0, i));
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      rail.scrollTo({ left: next * getStep(), behavior: reduce ? "auto" : "smooth" });
    },
    [getStep, total]
  );

  // Work out the active card from the scroll position (throttled with rAF)
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const step = getStep();
        if (!step) return;
        setIndex(Math.min(total - 1, Math.round(rail.scrollLeft / step)));
      });
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      rail.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [getStep, total]);

  // Screen-reader announcement, debounced so it doesn't chatter while scrolling
  useEffect(() => {
    const t = setTimeout(
      () => setAnnounce(`${fragrances[index].name}, ${index + 1} of ${total}`),
      500
    );
    return () => clearTimeout(t);
  }, [index, total]);

  // Mouse drag (touch uses native swipe)
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });
  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse") return;
    const rail = railRef.current!;
    drag.current = { active: true, startX: e.clientX, startLeft: rail.scrollLeft };
    rail.dataset.dragging = "true";
    rail.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    if (!drag.current.active) return;
    railRef.current!.scrollLeft =
      drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const rail = railRef.current!;
    delete rail.dataset.dragging;
    goTo(Math.round(rail.scrollLeft / getStep())); // snap to nearest card
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); goTo(index - 1); }
    if (e.key === "Home")       { e.preventDefault(); goTo(0); }
    if (e.key === "End")        { e.preventDefault(); goTo(total - 1); }
  };

  return (
    <div className="catalog__inner">
      <div className="catalog__head">
        <h2 className="catalog__title">The Collection</h2>
        <div className="catalog__controls">
          <button
            type="button"
            className="ctrl"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous fragrance"
          >
            ←
          </button>
          <span className="catalog__count" aria-hidden="true">
            {index + 1} / {total}
          </span>
          <button
            type="button"
            className="ctrl"
            onClick={() => goTo(index + 1)}
            disabled={index === total - 1}
            aria-label="Next fragrance"
          >
            →
          </button>
        </div>
      </div>

      <ul
        ref={railRef}
        className="rail"
        role="region"
        aria-label="NOVAIR fragrances. Use left and right arrow keys to browse."
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {fragrances.map((f) => (
          <li key={f.id} className="card" data-featured={f.featured}>
            {/* Placeholder bottle. Swap for <img src={f.image}> when art exists */}
            <div className="card__art" aria-hidden="true">
              <span className="mini-bottle" />
            </div>
            <h3 className="card__name">{f.name}</h3>
            <p className="card__tagline">{f.tagline}</p>
            <p className="card__notes">{f.notes.join(" · ")}</p>
            <p className="card__price">{money.format(f.price)}</p>
          </li>
        ))}
      </ul>

      <p className="visually-hidden" aria-live="polite">{announce}</p>
    </div>
  );
}