/** Normalized scroll ranges [start, end], from 0 to 1 */
export const BEATS = {
  push: [0.0, 0.25],            // slow camera push-in
  introExit: [0.03, 0.18],      // hero title and copy leave
  foregroundOpen: [0.15, 0.25], // leaves part around the viewer
  narrativeAIn: [0.2, 0.27],
  narrativeAOut: [0.35, 0.44],
  foregroundExit: [0.35, 0.44], // leaves leave the frame
  heroExit: [0.35, 0.44],       // bottle leaves, clean panorama appears
  blurIn: [0.44, 0.5],          // soft focus for narrative B
  narrativeBIn: [0.48, 0.58],
  narrativeBOut: [0.69, 0.74],
  refocus: [0.69, 0.74],        // world returns to focus
  catalogIn: [0.75, 0.96],
  controlsIn: [0.91, 1.0],
} as const;

/** Header links jump to these points on the timeline (0..1) */
/** Header links: p = timeline position (motion mode), id = section (reduced motion) */
export const NAV = [
  { label: "Story", p: 0.29, id: "story" },
  { label: "Notes", p: 0.63, id: "notes" },
  { label: "Collection", p: 1.0, id: "collection" },
] as const;
/** Images that must be decoded before the stage is revealed.
/** TEMPORARY: true = use the raw .jfif images with a white-hiding blend.
 *  When the real cutouts are ready, set this to false. Nothing else changes. */
export const RAW_PREVIEW = true;

export const ASSETS = RAW_PREVIEW
  ? {
      plate: "/assets/plate-raw.jfif",
      hero: "/assets/hero-raw.jfif",
      fgLeft: "/assets/fg-left-raw.jfif",
      fgRight: "/assets/fg-right-raw.jfif",
    }
  : {
      plate: "/assets/00-plate.webp",
      hero: "/assets/30-hero.png",
      fgLeft: "/assets/40-foreground-left.png",
      fgRight: "/assets/41-foreground-right.png",
    };

/** Images decoded by the loader before the stage is revealed */
export const CRITICAL_IMAGES: string[] = Object.values(ASSETS);