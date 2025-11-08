import React from "react";

import img1 from "../assets/galeri1.jpg";
import img2 from "../assets/galeri2.jpg";
import img3 from "../assets/galeri3.jpg";
import img4 from "../assets/galeri4.jpg";
import img5 from "../assets/galeri5.jpg";
import img6 from "../assets/galeri6.jpg";

export default function GaleriSekolah() {
  const data = [
    { src: img1, title: "Tampak Depan SMK Yuppentek 1 Tangerang" },
    { src: img2, title: "Suasana Belajar di Kelas" },
    { src: img3, title: "Kegiatan Upacara Bendera" },
    { src: img4, title: "Fasilitas Bengkel Otomotif" },
    { src: img5, title: "Lab Komputer dan Jaringan" },
    { src: img6, title: "Ekstrakurikuler dan Kreativitas Siswa" },
  ];

  return (
    <section
      id="galeri"
      className="relative py-24 bg-gradient-to-b from-blue-100 via-blue-50 to-white text-gray-900 overflow-hidden"
    >
      {/* Background lembut tipis */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,197,253,0.2),transparent_70%)]"></div>

      {/* Judul dan Deskripsi */}
      <div className="relative text-center mb-14 px-6 z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
          Galeri Sekolah
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-4 rounded-full"></div>
        <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
          Sekilas potret lingkungan dan fasilitas SMK YUPENTEK 1 Tangerang —
          tempat siswa berkreasi, belajar, dan tumbuh menjadi generasi unggul.
        </p>
      </div>

      {/* Grid Galeri */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {data.map((item, i) => (
          <div
            key={i}
            className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 border border-blue-100 hover:scale-[1.02]"
          >
            {/* Gambar */}
            <div className="overflow-hidden">
              <img
                src={item.src}
                alt={item.title}
                className="object-cover w-full h-56 group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Teks Judul */}
            <div className="p-4 text-center">
              <h3 className="text-blue-800 font-semibold text-sm sm:text-base">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
