import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", color: "#f7f3e8", background: "#0d3b35", borderRadius: 9, fontFamily: "Georgia", fontSize: 22, fontWeight: 700 }}>Z</div>, size);
}
