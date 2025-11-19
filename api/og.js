/** @jsxImportSource react */
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") || "Kegiatan OSIS";
  const date = searchParams.get("date") || "-";
  const location = searchParams.get("location") || "-";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px",
          background: "#0b3d2e",
          color: "white",
          fontFamily: "Arial",
        }}
      >
        <h1 style={{ fontSize: 60, fontWeight: 700 }}>{title}</h1>

        <p style={{ fontSize: 36, marginTop: 30 }}>📅 {date}</p>
        <p style={{ fontSize: 36 }}>📍 {location}</p>

        <p
          style={{
            position: "absolute",
            bottom: 40,
            right: 50,
            opacity: 0.35,
            fontSize: 28,
          }}
        >
          OSIS SMK Yuppentek 1
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
