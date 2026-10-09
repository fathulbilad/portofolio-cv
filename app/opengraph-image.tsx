import { ImageResponse } from "next/og";

export const alt = "Fathul Bilad — Full Stack Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", padding: 54, background: "#FDFBF4", color: "#1A2533" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", padding: 62, background: "#FFF9D2", border: "1px solid #EAE5C2", borderRadius: 24 }}>
        <div style={{ display: "flex", fontSize: 22, color: "#665E43", letterSpacing: 3 }}>FULL STACK · DEVOPS · ENTERPRISE</div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 86, fontWeight: 800 }}>Hi, I’m Fathul Bilad.</div>
        <div style={{ display: "flex", marginTop: 28, color: "#34628F", fontSize: 28 }}>Enterprise work. Personal projects. Always learning.</div>
      </div>
    </div>, size,
  );
}
