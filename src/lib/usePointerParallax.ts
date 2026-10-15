import { useEffect, type RefObject } from "react";
import { clamp, lerp } from "@/lib/timeline";

/**
 * Writes --mx and --my (range -1..1) onto the stage.
 * CSS decides how far each layer moves; this only smooths the pointer.
 */
export function usePointerParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const stage = ref.current;
    if (!stage) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduce.matches) return;

    let tx = 0, ty = 0; // target
    let cx = 0, cy = 0; // smoothed current
    let raf = 0;
    let visible = true;

    const write = () => {
      stage.style.setProperty("--mx", cx.toFixed(4));
      stage.style.setProperty("--my", cy.toFixed(4));
    };

    const tick = () => {
      cx = lerp(cx, tx, 0.08);
      cy = lerp(cy, ty, 0.08);
      write();
      const settled = Math.abs(tx - cx) < 0.001 && Math.abs(ty - cy) < 0.001;
      if (settled) {
        cx = tx;
        cy = ty;
        write();
        raf = 0; // converged: stop requesting frames
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    const request = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = clamp((e.clientX / window.innerWidth) * 2 - 1, -1, 1);
      ty = clamp((e.clientY / window.innerHeight) * 2 - 1, -1, 1);
      request();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      request();
    };

    // No work while the stage is off-screen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(stage);

    stage.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerleave", onLeave);

    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref]);
}