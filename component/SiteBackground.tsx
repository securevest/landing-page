import type { CSSProperties } from "react";
import "./site-background.css";

// Tiny seeded PRNG: the particles come out identical on server and client,
// so there is no hydration mismatch (Math.random() would cause one).
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(2026);
const range = (min: number, max: number) =>
  Number((min + rand() * (max - min)).toFixed(2));

const PARTICLES = Array.from({ length: 26 }, (_, id) => ({
  id,
  left: range(0, 100),
  bottom: range(0, 20),
  size: range(1.5, 3),
  duration: range(9, 24),
  delay: range(0, 14),
  opacity: range(0.25, 0.6),
}));

// Rendered once in the root layout, so it persists across route changes.
export const SiteBackground = () => {
  return (
    <div aria-hidden="true" className="sv-bg">
      <div className="sv-bg-glow sv-bg-glow-gold" />
      <div className="sv-bg-glow sv-bg-glow-mint" />
      <div className="sv-bg-glow sv-bg-glow-soft" />
      <div className="sv-bg-grid" />
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="sv-bg-particle"
          style={
            {
              left: `${p.left}%`,
              bottom: `${p.bottom}%`,
              width: p.size,
              height: p.size,
              "--dur": `${p.duration}s`,
              "--delay": `${p.delay}s`,
              "--op": p.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
};
