import { ImageResponse } from "next/og";
import { budgetArticleMeta } from "@/lib/content/budgetArticle";

export const alt = budgetArticleMeta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px", backgroundColor: "#0B4D2C", color: "#F7F4EC", border: "18px solid #C8850A" }}>
      <div style={{ fontSize: 24, color: "#E5A93B", letterSpacing: 5, fontWeight: 700 }}>CORRECT MARKETER NG · PAID ADS</div>
      <div style={{ fontSize: 66, lineHeight: 1.08, fontWeight: 800, maxWidth: "1000px" }}>{budgetArticleMeta.title}</div>
      <div style={{ fontSize: 25, color: "#F7F4EC" }}>Attract · Nurture · Convert · Scale</div>
    </div>,
    { ...size },
  );
}
