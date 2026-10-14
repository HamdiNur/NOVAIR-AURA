import { BEATS as b } from "@/data/scene.config";
import { rangeProgress, smoothstep, segmentInOut } from "@/lib/timeline";

export function computeFrame(p: number) {
  const ease = (r: readonly [number, number]) =>
    smoothstep(rangeProgress(p, r[0], r[1]));

  const blurIn = ease(b.blurIn);
  const refocus = ease(b.refocus);
  const blur = blurIn * (1 - refocus);

  const a = segmentInOut(p, ...b.narrativeAIn, ...b.narrativeAOut);
  const bb = segmentInOut(p, ...b.narrativeBIn, ...b.narrativeBOut);

  return {
    p,
    push: ease(b.push),
    intro: 1 - ease(b.introExit),
    fgOpen: ease(b.foregroundOpen),
    fgExit: ease(b.foregroundExit),
    heroExit: ease(b.heroExit),
    blur,
    tint: Math.max(a * 0.35, blur * 0.55),
    a,
    b: bb,
    catalog: ease(b.catalogIn),
    controls: ease(b.controlsIn),
  };
}