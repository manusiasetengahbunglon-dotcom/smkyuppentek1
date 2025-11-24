import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Kegiatan";
  const img = searchParams.get("img") || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px",
          fontSize: 48,
        }}
      >
        {img ? (
          <img
            src={img}
            style={{
              width: "100%",
              height: "70%",
              objectFit: "cover",
              borderRadius: "20px",
            }}
          />
        ) : null}

        <div style={{ marginTop: "30px", fontWeight: "bold" }}>{title}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
