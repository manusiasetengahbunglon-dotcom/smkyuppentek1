import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { CalendarDays } from "lucide-react";

export default function Event() {
  const [items, setItems] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const dbRef = ref(db, "items");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allItems = Object.entries(data)
          .map(([id, val]) => ({ id, ...val }))
          .filter((item) => item.type === "event");
        setItems(allItems.reverse());
      } else {
        setItems([]);
      }
    });
  }, []);

  return (
    <section
      id="event"
      className="py-20 bg-gradient-to-b from-blue-50/70 via-white to-blue-100/70"
    >
      {/* Header */}
      <div className="text-center mb-14 px-6">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-3 flex justify-center items-center gap-2">
          <CalendarDays size={34} />
          Event Sekolah
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Informasi kegiatan dan event terbaru yang diselenggarakan
          oleh SMK YUPPENTEK 1 Tangerang.
        </p>
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <p className="text-gray-500 text-center italic text-lg">
          Belum ada event yang dipublikasikan.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 px-6 max-w-7xl mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100 flex flex-col"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* JUDUL */}
                <h3 className="text-lg font-bold text-blue-700 leading-snug mb-2">
                  {item.title}
                </h3>

                {/* TANGGAL & TEMPAT */}
                <div className="text-sm text-gray-600 mb-3 space-y-1">
                  <p>
                    <span className="font-medium text-gray-800">
                      Tanggal:
                    </span>{" "}
                    {item.date}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      Tempat:
                    </span>{" "}
                    {item.location}
                  </p>
                </div>

                {/* DESKRIPSI */}
                <p
                  className={`text-gray-700 text-sm leading-relaxed ${
                    expandedId === item.id ? "" : "line-clamp-3"
                  }`}
                >
                  {item.description}
                </p>

                {/* LIHAT SELENGKAPNYA */}
                {item.description.length > 120 && (
                  <button
                    onClick={() =>
                      setExpandedId(
                        expandedId === item.id ? null : item.id
                      )
                    }
                    className="text-blue-600 text-xs font-medium mt-2 hover:underline self-start"
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
