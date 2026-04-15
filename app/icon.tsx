import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F1117",
          borderRadius: "6px",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#6C63FF",
            letterSpacing: "-0.5px",
            fontFamily: "sans-serif",
          }}
        >
          AK
        </span>
      </div>
    ),
    { ...size }
  );
}
