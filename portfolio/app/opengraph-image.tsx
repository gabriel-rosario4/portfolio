import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social card for the site.
 *
 * Drawn with layout primitives only — no external fonts or images — so it
 * renders at build time without a network round trip. It echoes the hero:
 * dark navy, a low sun, a horizon, and the name.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #07111F 0%, #0F2138 55%, #12414A 100%)",
          padding: 72,
          position: "relative",
        }}
      >
        {/* Sun glow, top right. */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -80,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(255,209,102,0.30) 0%, rgba(255,209,102,0) 70%)",
          }}
        />

        {/* Horizon band. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 190,
            background: "linear-gradient(180deg, rgba(31,122,128,0.35) 0%, rgba(7,17,31,0) 100%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 34, fontWeight: 700, color: "#F5F7FA" }}>
            {site.initials}
          </span>
          <span style={{ fontSize: 34, fontWeight: 700, color: "#53D7B7" }}>
            .
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: "#F5F7FA",
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </div>

          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: "#6DB8FF",
              marginTop: 14,
              letterSpacing: -1,
            }}
          >
            {site.role}
          </div>

          <div
            style={{
              fontSize: 26,
              color: "#9AA6B2",
              marginTop: 26,
              maxWidth: 860,
              lineHeight: 1.45,
            }}
          >
            I build software that transforms complex ideas into products people
            love using.
          </div>

          {/* Accent rule, mint into blue, echoing the site's gradient text. */}
          <div
            style={{
              width: 180,
              height: 5,
              borderRadius: 999,
              marginTop: 36,
              background: "linear-gradient(90deg, #53D7B7 0%, #4F8CFF 100%)",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
