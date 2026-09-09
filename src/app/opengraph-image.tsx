import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#fbfaf8",
          color: "#14171a",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 4, color: "#6b7482", textTransform: "uppercase" }}>
          Senior Software Engineer · Applied AI &amp; Agents
        </div>
        <div style={{ fontSize: 76, marginTop: 24, lineHeight: 1.05 }}>Gustavo Berny</div>
        <div style={{ fontSize: 32, marginTop: 20, color: "#4a5560" }}>
          I build AI agent systems that run in production.
        </div>
        <div style={{ display: "flex", gap: 48, marginTop: 56, fontSize: 28 }}>
          <span>85% autonomous</span>
          <span>4.7s response</span>
          <span>153k msgs/mo</span>
          <span>$0.12 per conversation</span>
        </div>
      </div>
    ),
    size
  );
}
