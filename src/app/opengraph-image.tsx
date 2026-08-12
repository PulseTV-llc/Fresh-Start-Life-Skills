import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.legalName} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, rendered on demand.
 *
 * Satori (what powers ImageResponse) supports flexbox and border-radius but not
 * the full CSS surface, so the hills are oversized circles clipped by the frame
 * rather than SVG paths — same silhouette, far fewer moving parts.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundImage:
            "linear-gradient(170deg, #a8ddff 0%, #d7eeff 30%, #ffeed4 66%, #ffd9ab 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Sun */}
        <div
          style={{
            position: "absolute",
            right: 120,
            top: 190,
            width: 260,
            height: 260,
            borderRadius: 999,
            backgroundImage:
              "radial-gradient(circle at 38% 32%, #fff4dc 0%, #ffcf85 34%, #ff9a3d 70%, #f97316 100%)",
            display: "flex",
          }}
        />

        {/* Back ridge */}
        <div
          style={{
            position: "absolute",
            left: -220,
            top: 380,
            width: 1700,
            height: 900,
            borderRadius: 999,
            background: "#63c088",
            display: "flex",
          }}
        />
        {/* Mid ridge */}
        <div
          style={{
            position: "absolute",
            left: -420,
            top: 452,
            width: 1900,
            height: 900,
            borderRadius: 999,
            background: "#22964c",
            display: "flex",
          }}
        />
        {/* Front ridge */}
        <div
          style={{
            position: "absolute",
            left: -160,
            top: 540,
            width: 2000,
            height: 900,
            borderRadius: 999,
            background: "#0e3a22",
            display: "flex",
          }}
        />

        {/* Copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 90px",
            width: 800,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#b84708",
            }}
          >
            501(c)(3) Nonprofit · Alexandria, LA
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 82,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              color: "#10201a",
            }}
          >
            Fresh Start Life Skills
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 32,
              lineHeight: 1.35,
              color: "#2c4139",
              maxWidth: 620,
            }}
          >
            Learn, Explore &amp; Grow — hands-on life and vocational skills for
            youth ages 8–17 across central Louisiana.
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontSize: 24,
              fontWeight: 700,
              color: "#b84708",
            }}
          >
            freshstartlifeskills.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
