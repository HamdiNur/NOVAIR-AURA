export const clamp = (v: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Smooth ease: 0 → 1 with soft start and end */
export const smoothstep = (t: number) => {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
};

/** Where is p inside [start, end]? Returns 0..1 (clamped) */
export const rangeProgress = (p: number, start: number, end: number) =>
  clamp((p - start) / (end - start));

/** Fade in over [inStart, inEnd], hold, fade out over [outStart, outEnd] */
export const segmentInOut = (
  p: number,
  inStart: number,
  inEnd: number,
  outStart: number,
  outEnd: number
) =>
  smoothstep(rangeProgress(p, inStart, inEnd)) *
  (1 - smoothstep(rangeProgress(p, outStart, outEnd)));