"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { computeFrame } from "@/lib/frame";
import "./cinematic.css";
import CatalogRail from "./CatalogRail";
import Header from "@/components/Header";
import { usePointerParallax } from "@/lib/usePointerParallax";
import { ASSETS, RAW_PREVIEW } from "@/data/scene.config";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CinematicScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  usePointerParallax(stageRef);
  useGSAP(
    () => {
      const stage = stageRef.current!;
      const section = sectionRef.current!;

      // Panels that fade in and out, and the frame value that drives each one
      const panels = [
        [".copy--intro", "intro"],
        [".copy--a", "a"],
        [".copy--b", "b"],
      ] as const;

      // JS only writes numbers; CSS owns every transform
      const render = (p: number, motion: boolean) => {
        const f = computeFrame(p);
        for (const [key, value] of Object.entries(f)) {
          stage.style.setProperty(`--${key}`, value.toFixed(4));
        }
        stage.dataset.catalogLive = f.catalog > 0.6 ? "true" : "false";

        // Invisible panel = hidden from screen readers and the tab order.
        // In reduced motion every panel is a normal section, so never hide.
        for (const [selector, key] of panels) {
          const el = stage.querySelector<HTMLElement>(selector);
          if (!el) continue;
          const hidden = motion && f[key] < 0.05;
          el.toggleAttribute("inert", hidden);
          if (hidden) el.setAttribute("aria-hidden", "true");
          else el.removeAttribute("aria-hidden");
        }
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        render(0, true);
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => render(self.progress, true),
          onRefresh: (self) => render(self.progress, true),
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        render(0, false);
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="cinematic-scroll"
      aria-label="NOVAIR Aura"
    >
      <div ref={stageRef} className="cinematic-stage">
        {/* z 0-9: world (placeholders, swapped for real images later) */}
    <div className="world" aria-hidden="true" data-raw={RAW_PREVIEW}>
  <div className="layer layer--sky" style={{ ["--d" as string]: 0.1 }}>
    <img className="fill" src={ASSETS.plate} alt="" />
  </div>
  <div className="layer layer--hero">
    <img className="fill" src={ASSETS.hero} alt="" />
  </div>
  <div className="layer layer--fg layer--fg-left">
    <img className="fill" src={ASSETS.fgLeft} alt="" />
  </div>
  <div className="layer layer--fg layer--fg-right">
    <img className="fill" src={ASSETS.fgRight} alt="" />
  </div>
</div>
        {/* z 10-19: tint */}
        <div className="tint" aria-hidden="true" />
         <Header />
        {/* z 20-29: copy */}
        <div className="copy copy--intro">
          <p className="eyebrow">NOVAIR</p>
          <h1>AURA</h1>
          <p className="lede">Fresh. Modern. Yours.</p>
        </div>
        <div className="copy copy--a" id="story">
          <h2>Fresh. Modern. Yours.</h2>
          <p>
            Sunlit bergamot and mandarin open the scent, a clean first breath of
            morning air.
          </p>
        </div>
        <div className="copy copy--b" id="notes">
          {" "}
          <h2>Citrus, jasmine, musk.</h2>
          <p>
            Bergamot and mandarin on top, jasmine at the heart, musk and cedar
            softly underneath.
          </p>
        </div>
        {/* final catalog placeholder: the real rail comes next */}
        <div className="catalog" id="collection">
          {" "}
          <CatalogRail />
        </div>
      </div>
    </section>
  );
}
