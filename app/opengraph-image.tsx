import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", color: "#f7f3e8", background: "#071d1a", padding: "84px 90px", fontFamily: "Arial" }}>
      <div style={{ position: "absolute", inset: 24, display: "flex", border: "2px solid rgba(217,170,85,.32)", borderRadius: "70px 20px 70px 20px" }} />
      <div style={{ position: "absolute", width: 220, height: 220, right: 70, top: 50, display: "flex", border: "5px solid #df745d", borderRadius: "50% 10% 50% 10%", transform: "rotate(24deg)", opacity: .8 }} />
      <div style={{ position: "absolute", width: 160, height: 160, right: 210, bottom: 50, display: "flex", border: "4px solid #b7d9c9", borderRadius: "10% 50% 10% 50%", transform: "rotate(-18deg)", opacity: .7 }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 760 }}>
        <div style={{ display: "flex", color: "#df745d", fontSize: 25, letterSpacing: 7, textTransform: "uppercase", fontWeight: 700, marginBottom: 28 }}>Zeenat.js</div>
        <div style={{ display: "flex", fontFamily: "Georgia", fontSize: 100, lineHeight: .95, letterSpacing: -5 }}>Adorn the web.</div>
        <div style={{ display: "flex", color: "#b7c8c2", fontSize: 26, lineHeight: 1.45, marginTop: 32 }}>Website decorations and seasonal effects for React, Next.js and JavaScript.</div>
      </div>
    </div>,
    size,
  );
}
