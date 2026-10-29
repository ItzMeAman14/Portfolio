import { ImageResponse } from "next/og";

export const alt = "Aman Rehman | Salesforce Developer & Forward Deployed Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          background: "linear-gradient(135deg, #07080F 0%, #171B2E 100%)",
          color: "#F2F4FF",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#22D3EE", letterSpacing: 4 }}>
          SALESFORCE DEVELOPER • FORWARD DEPLOYED ENGINEER
        </div>
        <div style={{ display: "flex", fontSize: 120, fontWeight: 800, marginTop: 24 }}>
          AMAN REHMAN
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#8B92B5", marginTop: 24 }}>
          Apex • LWC • Agentforce • Data Cloud • Marketing Cloud Next
        </div>
      </div>
    ),
    { ...size }
  );
}