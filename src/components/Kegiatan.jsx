import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { Activity } from "lucide-react";

export default function Kegiatan() {
  const [kegiatanList, setKegiatanList] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

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
      className="py-20 bg-gradient-to-b from-blue-50/70 via-white to-blue-100/70"
    >
      {/* Header */}
      <div className="text-center mb-14 px-6">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-4 flex justify-center items-center gap-2">
          <Activity size={36} />
          Kegiatan Sekolah
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Dokumentasi berbagai kegiatan sekolah yang melibatkan siswa dalam
          pembelajaran, kreativitas, dan kebersamaan.
        </p>
      </div>

      {/* Content */}
      {kegiatanList.length === 0 ? (
        <p className="text-gray-500 text-center italic text-lg">
          Belum ada kegiatan terbaru.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 px-6 max-w-7xl mx-auto">
          {kegiatanList.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100 flex flex-col"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Judul */}
                <h3 className="text-lg font-bold text-blue-700 mb-2 leading-snug">
                  {item.title}
                </h3>

                {/* Info */}
                <div className="text-sm text-gray-600 mb-3 space-y-0.5">
                  <p>
                    <span className="font-medium text-gray-700">
                      Tanggal:
                    </span>{" "}
                    {item.date}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">
                      Tempat:
                    </span>{" "}
                    {item.location}
                  </p>
                </div>

                {/* Deskripsi */}
                <p
                  className={`text-gray-700 text-sm leading-relaxed transition-all ${
                    expandedId === item.id ? "" : "line-clamp-3"
                  }`}
                >
                  {item.description}
                </p>

                {/* Expand */}
                {item.description.length > 120 && (
                  <button
                    onClick={() =>
                      setExpandedId(
                        expandedId === item.id ? null : item.id
                      )
                    }
                    className="text-blue-600 text-xs font-medium mt-1 hover:underline self-start"
                  >
                    {expandedId === item.id
                      ? "Tutup"
                      : "Lihat selengkapnya"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
