"use client";

import { useEffect, useState } from "react";
import NMark from "@/components/NMark";
import { CRITICAL_IMAGES } from "@/data/scene.config";

const TIMEOUT_MS = 6000; // never hold the visitor longer than this
const MIN_SHOW_MS = 400; // avoids a one-frame flash when everything is cached

/** Resolves even if the image fails, so a missing file can't hang the page */
function decodeImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.src = src;
    img.decode().then(() => resolve()).catch(() => resolve());
  });
}

export default function Loader() {
  const [state, setState] = useState<"loading" | "leaving" | "done">("loading");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const assets = Promise.all([
      document.fonts.ready,
      ...CRITICAL_IMAGES.map(decodeImage),
    ]);
    const timeout = new Promise((r) => setTimeout(r, TIMEOUT_MS));
    const minimum = new Promise((r) => setTimeout(r, MIN_SHOW_MS));

    Promise.all([Promise.race([assets, timeout]), minimum]).then(() => {
      setState("leaving");
      timer = setTimeout(() => setState("done"), 800); // remove after the fade
    });

    return () => clearTimeout(timer);
  }, []);

  if (state === "done") return null;

  return (
    <div
      className="loader"
      data-state={state}
      role="status"
      aria-live="polite"
      aria-label="Loading NOVAIR"
    >
      <div className="loader__inner">
        <NMark size={40} />
        <span className="loader__word">NOVAIR</span>
        <span className="loader__bar" aria-hidden="true" />
      </div>
    </div>
  );
}