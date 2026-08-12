/**
 * A child mid-stride, drawn as a silhouette.
 *
 * Straight from the Fresh Start logo: children running over the hills toward
 * the rising sun. Four stride variants keep a group from looking cloned, and the
 * figure is drawn in a 24×32 box so callers can size it however they like.
 */

const strides = {
  // Full sprint — back leg extended, arms driving.
  sprint: {
    torso: "M12 9.5 L10 18",
    backLeg: "M10 18 L4.5 25 L5 30",
    frontLeg: "M10 18 L16 22 L17.5 29.5",
    frontArm: "M11.2 12 L17 9.5",
    backArm: "M11 12.5 L5 15.5",
    head: { cx: 12.8, cy: 5.6, r: 3.9 },
  },
  // Mid-stride, more upright.
  stride: {
    torso: "M12 9.5 L10.6 18",
    backLeg: "M10.6 18 L6.5 26 L5.5 30.5",
    frontLeg: "M10.6 18 L15.5 23.5 L16 30",
    frontArm: "M11.4 12 L16.5 13.5",
    backArm: "M11 12.5 L6 11",
    head: { cx: 12.6, cy: 5.6, r: 3.8 },
  },
  // Leaping — both feet off the ground.
  leap: {
    torso: "M12.5 9 L10 17",
    backLeg: "M10 17 L3.5 21.5 L2.5 26",
    frontLeg: "M10 17 L17 19.5 L20 24.5",
    frontArm: "M11.6 11.5 L18 8",
    backArm: "M11.2 12 L5 10",
    head: { cx: 13.2, cy: 5.2, r: 3.9 },
  },
  // Arms up, celebrating.
  cheer: {
    torso: "M12 9.5 L11 18.5",
    backLeg: "M11 18.5 L7 25.5 L6.5 30.5",
    frontLeg: "M11 18.5 L15 25 L15.5 30.5",
    frontArm: "M11.6 12 L16 6.5",
    backArm: "M11 12 L6.5 6.5",
    head: { cx: 12.4, cy: 5.6, r: 3.9 },
  },
} as const;

export type Stride = keyof typeof strides;

export function RunningChild({
  stride = "sprint",
  className,
  /** Flip to face left; the group in the hero all faces the sun. */
  facingLeft = false,
}: {
  stride?: Stride;
  className?: string;
  facingLeft?: boolean;
}) {
  const s = strides[stride];

  return (
    <svg
      viewBox="0 0 24 32"
      className={className}
      fill="none"
      aria-hidden="true"
      style={facingLeft ? { transform: "scaleX(-1)" } : undefined}
    >
      <g
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={s.torso} />
        <path d={s.backLeg} />
        <path d={s.frontLeg} />
        <path d={s.frontArm} />
        <path d={s.backArm} />
      </g>
      <circle cx={s.head.cx} cy={s.head.cy} r={s.head.r} fill="currentColor" />
    </svg>
  );
}

export const strideOrder: Stride[] = ["sprint", "stride", "leap", "cheer"];
