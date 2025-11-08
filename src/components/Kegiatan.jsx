import React from "react";

import img1 from "../assets/kegiatan1.jpg";
import img2 from "../assets/kegiatan2.jpg";
import img3 from "../assets/kegiatan3.jpg";
import img4 from "../assets/kegiatan4.jpg";

export default function Galeri() {
  const images = [img1, img2, img3, img4];

  return (
    <section id="galeri" className="py-20 bg-gray-900 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-10">
        Galeri Kegiatan
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 max-w-4xl mx-auto">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Galeri ${i + 1}`}
            className="rounded-xl shadow-md hover:scale-105 transition duration-300 object-cover w-full h-56"
          />
        ))}
      </div>
    </section>
  );
}
