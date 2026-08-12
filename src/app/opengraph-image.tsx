import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.legalName} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card.
 *
 * Satori has no network access at render time, so the logo is read off disk and
 * inlined as a data URI. Layout is flexbox-only — the sunrise arc is an
 * oversized circle clipped by the frame rather than an SVG path.
 */
export default async function OpengraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public", "brand", "logo-og.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
            "linear-gradient(118deg, #0a5054 0%, #01414d 40%, #012f38 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Sunrise breaking over the navy — the mark's own gesture.
            Painted as full-canvas radial gradients: Satori does not clip a
            radial fill to border-radius, so an offset circle would show its
            bounding box as a hard seam — and its radial-gradient support is
            unreliable, so these are full-canvas linear gradients. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(28deg, rgba(242,166,41,0.72) 0%, rgba(242,166,41,0.22) 26%, rgba(242,166,41,0) 52%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(205deg, rgba(15,156,150,0.5) 0%, rgba(15,156,150,0) 44%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 80px",
            width: 760,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 21,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#f5b336",
            }}
          >
            501(c)(3) Nonprofit · Alexandria, LA
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: -2,
              color: "#ffffff",
            }}
          >
            Fresh Start Life Skills
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 30,
              lineHeight: 1.36,
              color: "#cfe6e6",
              maxWidth: 600,
            }}
          >
            Learn, Explore &amp; Grow — hands-on life and vocational skills for
            youth ages 8–17 across central Louisiana.
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 36,
              fontSize: 23,
              fontWeight: 700,
              color: "#f5b336",
            }}
          >
            freshstartlifeskills.org
          </div>
        </div>

        {/* The mark on its warm-white coin — the dark-ground treatment */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 88,
            top: 135,
            width: 360,
            height: 360,
            borderRadius: 999,
            background: "#ffffff",
          }}
        >
          <img src={logoSrc} width={246} height={246} alt="" />
        </div>
      </div>
    ),
    size,
  );
}
