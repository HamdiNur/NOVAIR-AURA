"use client";

import { NAV } from "@/data/scene.config";
import NMark from "@/components/NMark";


/** Scroll to a point on the cinematic timeline */
/** Motion mode: scroll to a timeline position. Reduced motion: jump to the real section. */
function goToBeat(p: number, id?: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce && id) {
    document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "auto" });
    return;
  }

  const section = document.querySelector<HTMLElement>(".cinematic-scroll");
  if (!section) return;
  const travel = section.offsetHeight - window.innerHeight;
  const top = section.getBoundingClientRect().top + window.scrollY + p * travel;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}

export default function Header() {
  return (
    <header className="site-header">
      <a
        href="#top"
        className="brand"
        aria-label="NOVAIR, back to the top"
        onClick={(e) => {
          e.preventDefault();
          goToBeat(0);
        }}
      >
        <NMark />
        <span className="brand__word">NOVAIR</span>
      </a>

      <nav aria-label="Primary">
        <ul className="site-nav">
          {NAV.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                className="site-nav__link"
onClick={() => goToBeat(item.p, item.id)}              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}