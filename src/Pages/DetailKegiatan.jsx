// src/Pages/DetailKegiatan.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { db } from "../firebase";
import { Helmet } from "react-helmet"; // ← aman untuk React 19

export default function DetailKegiatan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [ogImageUrl, setOgImageUrl] = useState("");

  // Normalizer biar field nama bebas (judul/deskripsi/date dll)
  const normalize = (raw) => ({
    title: raw?.title || raw?.judul || "Kegiatan",
    description: raw?.description || raw?.deskripsi || "-",
    date: raw?.date || raw?.tanggal || "-",
    location: raw?.location || raw?.lokasi || "-",
    image: raw?.image || raw?.img || raw?.imageUrl || "",
  });

  // Ambil data Firebase
  useEffect(() => {
    const dbRef = ref(db, `items/${id}`);

    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(normalize(snapshot.val()));
        } else {
          setError("NOT_FOUND");
        }
      })
      .catch(() => setError("ERROR"));
  }, [id]);

  // Siapkan URL OG image
  useEffect(() => {
    if (!data) return;
    const origin = window.location.origin;
    const url = `${origin}/api/og?id=${id}&title=${encodeURIComponent(
      data.title
    )}&img=${encodeURIComponent(data.image)}`;
    setOgImageUrl(url);
  }, [data, id]);

  if (!data && !error)
    return <div className="p-10 text-center">Loading...</div>;

  if (error === "NOT_FOUND")
    return (
      <div className="p-10 text-center text-red-500">
        Data tidak ditemukan!
        <button
          onClick={() => navigate("/dashboard")}
          className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Kembali
        </button>
      </div>
    );

  if (error === "ERROR")
    return (
      <div className="p-10 text-center text-red-500">
        Terjadi kesalahan saat mengambil data
      </div>
    );

  // Text WA untuk share
  const shareText = `
📌 *${data.title}*

📅 Tanggal: ${data.date}
📍 Lokasi: ${data.location}

${data.description}

Klik untuk detail & gambar:
${window.location.origin}/detail/${id}
`.trim();

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    shareText
  )}`;

  return (
    <>
      {/* =============== HELMET UNTUK META + OG TAGS =============== */}
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />

        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${window.location.origin}/detail/${id}`}
        />
      </Helmet>
      {/* =========================================================== */}

      <div className="min-h-screen p-10 bg-gray-100 text-gray-900">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Kembali
        </button>

        <div className="bg-white p-8 rounded-2xl shadow-md max-w-4xl mx-auto">
          {data.image ? (
            <img
              src={data.image}
              alt={data.title}
              className="rounded-xl w-full mb-6 shadow"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/1200x630.png?text=Gambar+Tidak+Tersedia";
              }}
            />
          ) : (
            <div className="text-red-500">Gambar tidak tersedia</div>
          )}

          <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
          <p className="text-sm text-gray-500 mb-2">
            📅 {data.date} • 📍 {data.location}
          </p>
          <p className="text-lg leading-relaxed mb-6">{data.description}</p>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block px-5 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700"
          >
            Share WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
