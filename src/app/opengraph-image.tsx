import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const runtime = "edge";
export const alt = "Hemant Patil — Senior Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          // Satori parses every comma-separated `background` layer as an IMAGE,
          // so a trailing solid colour ("…, #0C0A09") threw "Invalid background
          // image" and the route 500'd. Colour and gradients must be separate.
          backgroundColor: "#0C0A09",
          backgroundImage:
            "radial-gradient(60% 60% at 20% 10%, #F9731633 0%, transparent 60%), radial-gradient(50% 50% at 85% 90%, #FB923C2b 0%, transparent 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 900,
              color: "white",
              background: "linear-gradient(135deg, #F97316, #FB923C)",
            }}
          >
            HP
          </div>
          <div style={{ color: "#FB923C", fontSize: 24, letterSpacing: 4 }}>PORTFOLIO</div>
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, color: "#F5F0EB", lineHeight: 1.05 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 40, color: "#A89E94", marginTop: 16 }}>{profile.role}</div>
        {/* One interpolated string, not text + expression + text: satori requires
            an explicit `display: flex` on any div with more than one child. */}
        <div style={{ fontSize: 28, color: "#FB923C", marginTop: 32 }}>
          {`${profile.techLine} · ${profile.yearsExperience} years`}
        </div>
      </div>
    ),
    { ...size },
  );
}
