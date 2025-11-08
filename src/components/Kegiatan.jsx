import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { Activity } from "lucide-react";

export default function Kegiatan() {
  const [kegiatanList, setKegiatanList] = useState([]);

  useEffect(() => {
    const dbRef = ref(db, "items");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loaded = Object.entries(data)
          .map(([id, val]) => ({ id, ...val }))
          .filter((item) => item.type === "kegiatan");
        setKegiatanList(loaded.reverse());
      } else {
        setKegiatanList([]);
      }
    });
  }, []);

  return (
    <section
      id="kegiatan"
      className="py-20 bg-gradient-to-b from-blue-50/70 via-white/90 to-blue-100/70 text-gray-900"
    >
      {/* Header */}
      <div className="text-center mb-14 px-6">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-4 flex justify-center items-center gap-2">
          <Activity size={36} className="text-blue-600" />
          Kegiatan Sekolah
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Dokumentasi berbagai kegiatan siswa dan sekolah dalam membangun
          semangat belajar, kreativitas, dan kebersamaan.
        </p>
      </div>

      {/* Isi */}
      {kegiatanList.length === 0 ? (
        <div className="flex justify-center items-center h-60">
          <p className="text-gray-500 text-lg italic">
            Belum ada kegiatan terbaru...
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 max-w-7xl mx-auto px-6">
          {kegiatanList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:scale-[1.03] overflow-hidden flex flex-col"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-blue-700 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-1">📅 {item.date}</p>
                <p className="text-gray-500 text-sm mb-3">📍 {item.location}</p>

                <p className="text-gray-700 text-sm flex-grow leading-relaxed line-clamp-3 mb-2">
                  {item.description}
                </p>

                <button className="mt-auto bg-blue-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                  Lihat Selengkapnya
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
