import { useId } from "react";

export default function NMark({ size = 28 }: { size?: number }) {
  // Unique gradient id, since the mark can appear twice in the DOM
  const gid = `nv-gold-${useId().replace(/:/g, "")}`;
  return (
    <svg
      className="brand__mark"
      viewBox="0 0 48 56"
      width={size}
      height={Math.round(size * 1.15)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6cf9f" />
          <stop offset="0.5" stopColor="#c9a56a" />
          <stop offset="1" stopColor="#9a7a43" />
        </linearGradient>
      </defs>
      <path
        d="M8 52 V12 C8 6 13 5 16 10 L33 42 C36 47 40 46 40 41 V16"
        fill="none"
        stroke={`url(#${gid})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 16 C40 8 34 4 29 3"
        fill="none"
        stroke={`url(#${gid})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}