import React from "react";

import img1 from "../assets/kegiatan1.jpg";
import img2 from "../assets/kegiatan2.jpg";
import img3 from "../assets/kegiatan3.jpg";
import img4 from "../assets/kegiatan4.jpg";

export default function Galeri() {
  const data = [
    {
      src: img1,
      title: "INTIGAMECOM AND ANIMATION EXPO",
      text: "INTI Gamecomm and Animation EXPO yang diselenggarakan di JI -EXPO Kemayoran jakarta, merupakan salah satu event terbesar di dunia game dan animasi",
    },
    {
      src: img2,
      title: "MPLS SMK YUPPENTEK 1 TANGERANG",
      text: "Masa Pengenalan Lingkungan Sekolah yang di selenggarakan SMK YUPPENTEK 1 TANGERANG Tahun Ajaran 2024/2025 Berjalan dengan kondusif",
    },
    {
      src: img3,
      title: "Penyuluhan Hukum Kepada Anak Sekolah Kota Tangerang",
      text:  " Penyuluhan Hukum Kepada Anak Sekolah Kota Tangerang yang disampaikan Langsung oleh Hukum Sekertariat Daerah Kota Tangerang di Aula SMK YUPPENTEK 1 TANGERANG",
    },
    {
      src: img4,
      title: "Judul kegiatan 4",
      text: "Deskripsi kegiatan 4...",
    },
  ];

  return (
    <section id="galeri" className="py-20 bg-gray-900 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-10">
        Galeri Kegiatan
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 max-w-4xl mx-auto">
        {data.map((item, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:scale-105 transition"
          >
            <img
              src={item.src}
              alt={item.title}
              className="object-cover w-full h-56"
            />
            <div className="p-4 text-left">
              <h3 className="text-yellow-400 font-semibold text-sm mb-1">
                {item.title}
              </h3>
              <p className="text-white text-xs leading-relaxed">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
