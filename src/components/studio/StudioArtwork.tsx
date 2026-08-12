import type { StudioCategory } from "@/lib/studio";
import { cn } from "@/lib/utils";

/**
 * Generated artwork for a Studio piece that has no photograph yet.
 *
 * Rather than grey boxes, each piece gets a composition built from its own
 * craft — woven thread for sewing, glow rings for candles, piped dots for cake,
 * a filmstrip for film. The wall reads as a finished gallery today and every
 * card swaps to a real photo the moment `image` is set on the piece.
 *
 * Everything is derived from a hash of the piece id, never `Math.random()`:
 * the server and the client must draw the identical composition or React will
 * throw a hydration mismatch.
 */

function hashSeed(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 — small, fast, and identical on both sides of hydration. */
function makeRandom(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Palette = { from: string; to: string; ink: string; accent: string; soft: string };

const palettes: Record<StudioCategory, Palette> = {
  sewing: { from: "#fff8e9", to: "#ffdd92", ink: "#85480f", accent: "#f2a629", soft: "#ffefc9" },
  "candle-making": { from: "#f4faea", to: "#cfe9a5", ink: "#37501f", accent: "#6ca02f", soft: "#e6f4cf" },
  "cake-decorating": { from: "#fff8e9", to: "#ffe6c9", ink: "#85480f", accent: "#f5b336", soft: "#ffefc9" },
  "t-shirt-design": { from: "#edfaf8", to: "#a6e5df", ink: "#0a5054", accent: "#0f9c96", soft: "#d2f2ee" },
  film: { from: "#eef7f9", to: "#a6d6e0", ink: "#013f4a", accent: "#06768c", soft: "#d3ebf0" },
  music: { from: "#f4faea", to: "#d7ecc2", ink: "#37501f", accent: "#6ca02f", soft: "#e6f4cf" },
};

export function StudioArtwork({
  category,
  seed,
  variant,
  className,
}: {
  category: StudioCategory;
  seed: string;
  /** Pin the composition; otherwise the seed picks one. */
  variant?: 0 | 1;
  className?: string;
}) {
  const p = palettes[category];
  const rng = makeRandom(hashSeed(seed));
  const uid = `art-${hashSeed(seed).toString(36)}`;

  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className={cn("size-full", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor={p.from} />
          <stop offset="100%" stopColor={p.to} />
        </linearGradient>
      </defs>

      <rect width="400" height="400" fill={`url(#${uid}-bg)`} />
      {renderMotif(category, p, rng, variant)}

      {/* Paper grain keeps the flat fills from banding on large cards */}
      <rect
        width="400"
        height="400"
        fill="url(#studio-grain)"
        opacity="0.5"
        style={{ mixBlendMode: "multiply" }}
      />
    </svg>
  );
}

/**
 * One shared grain tile for the whole gallery — defining it per card would put
 * a filter primitive in the DOM for every piece.
 */
export function StudioArtworkDefs() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute size-0">
      <defs>
        <filter id="studio-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
        </filter>
        <pattern
          id="studio-grain"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          <rect width="120" height="120" fill="#fff" />
          <rect width="120" height="120" filter="url(#studio-noise)" opacity="0.16" />
        </pattern>
      </defs>
    </svg>
  );
}

/**
 * Two compositions per craft, chosen by the seed.
 *
 * One motif per category made a wall of four sewing pieces look like four
 * copies of the same picture — so each craft gets an alternate arrangement and
 * the seed decides which a piece gets. Deterministic, so SSR and the client
 * always agree.
 */
function renderMotif(
  category: StudioCategory,
  p: Palette,
  rng: () => number,
  pinned?: 0 | 1,
) {
  const seeded = rng() > 0.5 ? 1 : 0;
  const variant = pinned ?? seeded;

  switch (category) {
    case "sewing":
      return variant === 0 ? sewingWeave(p, rng) : sewingPatchwork(p, rng);
    case "candle-making":
      return variant === 0 ? candleGlow(p, rng) : candleRow(p, rng);
    case "cake-decorating":
      return variant === 0 ? cakeTiers(p, rng) : cakeRosettes(p, rng);
    case "t-shirt-design":
      return variant === 0 ? shirtSilhouette(p, rng) : shirtEmblem(p, rng);
    case "film":
      return variant === 0 ? filmStrip(p, rng) : filmClapper(p, rng);
    case "music":
      return variant === 0 ? musicWaveform(p, rng) : musicRipple(p, rng);
  }
}

/* --- Sewing ---------------------------------------------------------------- */

/** Woven warp and weft with a running stitch travelling across it. */
function sewingWeave(p: Palette, rng: () => number) {
  const cols = 7 + Math.floor(rng() * 3);
  const gap = 400 / cols;
  const y = 120 + rng() * 150;
  return (
    <>
      {Array.from({ length: cols }, (_, i) => (
        <rect
          key={`w${i}`}
          x={i * gap + gap * 0.18}
          y={-10}
          width={gap * 0.42}
          height={420}
          fill={p.accent}
          opacity={0.1 + rng() * 0.18}
        />
      ))}
      {Array.from({ length: cols }, (_, i) => (
        <rect
          key={`f${i}`}
          x={-10}
          y={i * gap + gap * 0.4}
          width={420}
          height={gap * 0.3}
          fill={p.ink}
          opacity={0.05 + rng() * 0.12}
        />
      ))}
      <path
        d={`M-20 ${y} C 80 ${y - 60}, 150 ${y + 70}, 220 ${y + 5} S 350 ${y - 70}, 420 ${y - 10}`}
        fill="none"
        stroke={p.ink}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="20 16"
        opacity="0.75"
      />
      <circle cx={340} cy={y - 40} r="9" fill={p.ink} opacity="0.8" />
    </>
  );
}

/** Nine-patch quilt block with stitched seams and a threaded needle. */
function sewingPatchwork(p: Palette, rng: () => number) {
  const cell = 104;
  const originX = (400 - cell * 3) / 2;
  const originY = (400 - cell * 3) / 2;
  const tones = [p.accent, p.soft, p.ink];
  const opacities = [0.55, 0.9, 0.18];

  return (
    <>
      {Array.from({ length: 9 }, (_, i) => {
        const t = Math.floor(rng() * 3);
        return (
          <rect
            key={i}
            x={originX + (i % 3) * cell}
            y={originY + Math.floor(i / 3) * cell}
            width={cell - 6}
            height={cell - 6}
            rx="10"
            fill={tones[t]}
            opacity={opacities[t]}
          />
        );
      })}
      {/* Stitched seams between the patches */}
      {[1, 2].map((i) => (
        <g key={i} stroke={p.ink} strokeWidth="3" strokeDasharray="9 9" opacity="0.45">
          <line x1={originX + i * cell - 3} y1={originY} x2={originX + i * cell - 3} y2={originY + cell * 3 - 6} />
          <line x1={originX} y1={originY + i * cell - 3} x2={originX + cell * 3 - 6} y2={originY + i * cell - 3} />
        </g>
      ))}
      <path
        d="M64 344 C 130 300, 190 372, 262 322"
        fill="none"
        stroke={p.ink}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="16 12"
        opacity="0.7"
      />
      <circle cx="276" cy="314" r="8" fill={p.ink} opacity="0.75" />
    </>
  );
}

/* --- Candle making ---------------------------------------------------------- */

/** Concentric glow around a single flame. */
function candleGlow(p: Palette, rng: () => number) {
  const cx = 200;
  const cy = 210;
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={54 + i * 34}
          fill="none"
          stroke={p.accent}
          strokeWidth={2 + rng() * 3}
          opacity={0.34 - i * 0.05}
        />
      ))}
      <circle cx={cx} cy={cy} r="46" fill={p.soft} opacity="0.9" />
      <rect x={cx - 52} y={cy + 6} width="104" height="130" rx="16" fill={p.ink} opacity="0.14" />
      <path
        d={`M${cx} ${cy - 26} c 26 22 34 44 20 62 -10 13 -28 17 -42 9 -15 -9 -18 -28 -8 -43 6 -9 16 -19 30 -28 Z`}
        fill={p.accent}
      />
      <path
        d={`M${cx} ${cy - 4} c 12 12 15 24 7 33 -7 8 -19 7 -24 -2 -4 -8 2 -19 17 -31 Z`}
        fill={p.from}
        opacity="0.85"
      />
      <rect x={cx - 3} y={cy + 34} width="6" height="34" rx="3" fill={p.ink} opacity="0.5" />
    </>
  );
}

/** A poured batch lined up on the bench. */
function candleRow(p: Palette, rng: () => number) {
  const jars = [
    { x: 58, w: 96, h: 150 },
    { x: 166, w: 108, h: 190 },
    { x: 286, w: 82, h: 130 },
  ];
  return (
    <>
      <rect x="0" y="318" width="400" height="8" fill={p.ink} opacity="0.2" />
      {jars.map((jar, i) => {
        const top = 318 - jar.h;
        const fill = top + 22 + rng() * 20;
        return (
          <g key={i}>
            <rect x={jar.x} y={top} width={jar.w} height={jar.h} rx="14" fill={p.ink} opacity="0.12" />
            <rect
              x={jar.x + 6}
              y={fill}
              width={jar.w - 12}
              height={318 - fill - 6}
              rx="10"
              fill={p.accent}
              opacity={0.42 + rng() * 0.2}
            />
            <rect x={jar.x + jar.w / 2 - 2.5} y={fill - 26} width="5" height="28" rx="2.5" fill={p.ink} opacity="0.55" />
            <path
              d={`M${jar.x + jar.w / 2} ${fill - 30} c 14 12 18 24 10 33 -7 8 -19 7 -24 -2 -4 -9 2 -19 14 -31 Z`}
              fill={p.accent}
            />
          </g>
        );
      })}
      {Array.from({ length: 3 }, (_, i) => (
        <circle
          key={i}
          cx={60 + i * 140}
          cy={70 + rng() * 40}
          r={30 + rng() * 22}
          fill={p.accent}
          opacity="0.12"
        />
      ))}
    </>
  );
}

/* --- Cake decorating -------------------------------------------------------- */

/** Two tiers, piped border, one candle. */
function cakeTiers(p: Palette, rng: () => number) {
  return (
    <>
      <rect x="46" y="250" width="308" height="96" rx="24" fill={p.ink} opacity="0.16" />
      <rect x="76" y="176" width="248" height="88" rx="22" fill={p.accent} opacity="0.34" />
      <rect x="106" y="120" width="188" height="70" rx="20" fill={p.ink} opacity="0.24" />
      {Array.from({ length: 9 }, (_, i) => (
        <circle
          key={i}
          cx={70 + i * 33}
          cy={150 + (rng() - 0.5) * 8}
          r={9 + rng() * 4}
          fill={p.accent}
          opacity="0.85"
        />
      ))}
      <rect x="196" y="72" width="8" height="42" rx="4" fill={p.ink} opacity="0.6" />
      <path d="M200 72c9-7 10-15 0-25-9 10-9 18 0 25Z" fill={p.accent} />
      <path
        d="M46 300c40 0 40 22 80 22s40-22 80-22 40 22 80 22 40-22 68-22"
        fill="none"
        stroke={p.from}
        strokeWidth="8"
        opacity="0.6"
      />
    </>
  );
}

/** Practice board seen from above — rows of piped rosettes. */
function cakeRosettes(p: Palette, rng: () => number) {
  const cols = 4;
  const rows = 4;
  const step = 90;
  const offset = (400 - step * (cols - 1)) / 2;
  return (
    <>
      <rect x="24" y="24" width="352" height="352" rx="28" fill={p.soft} opacity="0.65" />
      {Array.from({ length: cols * rows }, (_, i) => {
        const cx = offset + (i % cols) * step;
        const cy = offset + Math.floor(i / cols) * step;
        const r = 26 + rng() * 8;
        const turns = 2.4;
        // Archimedean spiral — a piped rosette really is one continuous line.
        const points: string[] = [];
        for (let t = 0; t <= turns * Math.PI * 2; t += 0.25) {
          const rr = (r * t) / (turns * Math.PI * 2);
          points.push(`${cx + rr * Math.cos(t)},${cy + rr * Math.sin(t)}`);
        }
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill={p.accent} opacity={0.28 + rng() * 0.2} />
            <polyline
              points={points.join(" ")}
              fill="none"
              stroke={p.ink}
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.45"
            />
          </g>
        );
      })}
    </>
  );
}

/* --- T-shirt design ---------------------------------------------------------- */

/** The garment, with the print laid on it. */
function shirtSilhouette(p: Palette, rng: () => number) {
  return (
    <>
      <path
        d="M150 92h100l84 42-26 66-34-14v148a8 8 0 0 1-8 8H134a8 8 0 0 1-8-8V186l-34 14-26-66Z"
        fill={p.soft}
        stroke={p.ink}
        strokeOpacity="0.35"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path
        d="M150 92c0 27 22 49 50 49s50-22 50-49"
        fill="none"
        stroke={p.ink}
        strokeOpacity="0.35"
        strokeWidth="6"
      />
      {Array.from({ length: 6 }, (_, i) => {
        const x = 150 + (i % 3) * 42;
        const y = 190 + Math.floor(i / 3) * 46;
        return rng() > 0.5 ? (
          <circle key={i} cx={x} cy={y} r={14 + rng() * 5} fill={p.accent} opacity="0.75" />
        ) : (
          <path key={i} d={`M${x} ${y - 16} l 17 30 h -34 Z`} fill={p.ink} opacity="0.6" />
        );
      })}
    </>
  );
}

/** The artwork itself, as it sits on the cutting mat before pressing. */
function shirtEmblem(p: Palette, rng: () => number) {
  const rings = 3 + Math.floor(rng() * 2);
  return (
    <>
      {/* Cutting-mat grid */}
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i} stroke={p.ink} strokeWidth="1.5" opacity="0.1">
          <line x1={i * 50} y1="0" x2={i * 50} y2="400" />
          <line x1="0" y1={i * 50} x2="400" y2={i * 50} />
        </g>
      ))}
      {Array.from({ length: rings }, (_, i) => (
        <circle
          key={i}
          cx="200"
          cy="196"
          r={62 + i * 30}
          fill="none"
          stroke={p.accent}
          strokeWidth={i === 0 ? 14 : 5}
          opacity={0.75 - i * 0.18}
        />
      ))}
      <path d="M200 138l46 82h-92Z" fill={p.ink} opacity="0.6" />
      <rect x="96" y="292" width="208" height="16" rx="8" fill={p.ink} opacity="0.4" />
      <rect x="136" y="322" width="128" height="12" rx="6" fill={p.ink} opacity="0.22" />
    </>
  );
}

/* --- Film -------------------------------------------------------------------- */

/** Filmstrip with a lens aperture. */
function filmStrip(p: Palette, rng: () => number) {
  return (
    <>
      <rect x="0" y="20" width="400" height="48" fill={p.ink} opacity="0.1" />
      <rect x="0" y="332" width="400" height="48" fill={p.ink} opacity="0.1" />
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i}>
          <rect x={22 + i * 42} y="34" width="24" height="20" rx="5" fill={p.ink} opacity="0.28" />
          <rect x={22 + i * 42} y="346" width="24" height="20" rx="5" fill={p.ink} opacity="0.28" />
        </g>
      ))}
      <circle cx="200" cy="200" r="86" fill={p.soft} opacity="0.85" />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i * Math.PI) / 3 + rng() * 0.02;
        return (
          <path
            key={i}
            d={`M200 200 L ${200 + 78 * Math.cos(a)} ${200 + 78 * Math.sin(a)} L ${200 + 78 * Math.cos(a + 1.05)} ${200 + 78 * Math.sin(a + 1.05)} Z`}
            fill={i % 2 ? p.accent : p.ink}
            opacity={i % 2 ? 0.5 : 0.28}
          />
        );
      })}
      <circle cx="200" cy="200" r="86" fill="none" stroke={p.ink} strokeOpacity="0.4" strokeWidth="7" />
    </>
  );
}

/** Clapperboard and framing marks. */
function filmClapper(p: Palette, rng: () => number) {
  return (
    <>
      {/* Framing brackets */}
      {[
        "M40 96V52h48", "M360 96V52h-48", "M40 304v44h48", "M360 304v44h-48",
      ].map((d, i) => (
        <path key={i} d={d} fill="none" stroke={p.ink} strokeWidth="6" opacity="0.28" strokeLinecap="round" />
      ))}
      <rect x="78" y="176" width="244" height="140" rx="14" fill={p.ink} opacity="0.22" />
      <g transform="rotate(-9 200 168)">
        <rect x="78" y="132" width="244" height="46" rx="10" fill={p.ink} opacity="0.55" />
        {Array.from({ length: 6 }, (_, i) => (
          <path
            key={i}
            d={`M${92 + i * 40} 132 l 22 0 l -14 46 l -22 0 Z`}
            fill={p.from}
            opacity="0.85"
          />
        ))}
      </g>
      {Array.from({ length: 3 }, (_, i) => (
        <rect
          key={i}
          x="108"
          y={214 + i * 30}
          width={60 + rng() * 130}
          height="12"
          rx="6"
          fill={p.from}
          opacity="0.5"
        />
      ))}
      <circle cx="300" cy="270" r="22" fill={p.accent} opacity="0.85" />
    </>
  );
}

/* --- Music ------------------------------------------------------------------- */

/** Waveform over a stave, with a note. */
function musicWaveform(p: Palette, rng: () => number) {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="0" y={96 + i * 22} width="400" height="3" fill={p.ink} opacity="0.14" />
      ))}
      {Array.from({ length: 22 }, (_, i) => {
        const h = 24 + rng() * 150;
        return (
          <rect
            key={i}
            x={18 + i * 17}
            y={230 - h / 2}
            width="9"
            height={h}
            rx="4.5"
            fill={i % 3 === 0 ? p.accent : p.ink}
            opacity={i % 3 === 0 ? 0.75 : 0.28}
          />
        );
      })}
      <g opacity="0.9">
        <circle cx="286" cy="126" r="20" fill={p.ink} opacity="0.75" />
        <rect x="302" y="58" width="7" height="70" rx="3.5" fill={p.ink} opacity="0.75" />
        <path d="M309 58c22 6 30 14 30 30-8-12-16-16-30-18Z" fill={p.accent} />
      </g>
    </>
  );
}

/** Sound moving out into a room. */
function musicRipple(p: Palette, rng: () => number) {
  return (
    <>
      {Array.from({ length: 6 }, (_, i) => (
        <circle
          key={i}
          cx="120"
          cy="220"
          r={48 + i * 46}
          fill="none"
          stroke={p.accent}
          strokeWidth={3 + rng() * 3}
          opacity={0.42 - i * 0.055}
        />
      ))}
      <circle cx="120" cy="220" r="40" fill={p.ink} opacity="0.65" />
      <circle cx="120" cy="220" r="16" fill={p.from} opacity="0.9" />
      {Array.from({ length: 3 }, (_, i) => {
        const x = 250 + i * 44;
        const y = 120 + rng() * 60;
        return (
          <g key={i} opacity={0.75 - i * 0.14}>
            <circle cx={x} cy={y + 62} r="15" fill={p.ink} />
            <rect x={x + 12} y={y} width="6" height="64" rx="3" fill={p.ink} />
            <path d={`M${x + 18} ${y} c 18 5 24 12 24 25 -7 -10 -13 -13 -24 -15 Z`} fill={p.accent} />
          </g>
        );
      })}
    </>
  );
}
