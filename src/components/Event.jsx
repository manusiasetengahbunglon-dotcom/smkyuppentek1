import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Event() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

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
      className="py-20 bg-gradient-to-b from-blue-50/70 via-white/90 to-blue-100/70 text-gray-900"
    >
      {/* Header */}
      <div className="text-center mb-14 px-6">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-4 flex justify-center items-center gap-2">
          <CalendarDays size={36} className="text-blue-600" />
          Event SMK YUPENTEK 1 Tangerang
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Temukan berbagai kegiatan menarik dan event terbaru yang berlangsung
          di SMK YUPENTEK 1 Tangerang.
        </p>
      </div>

      {/* Daftar Event */}
      {items.length === 0 ? (
        <p className="text-gray-500 text-center italic text-lg">
          Sedang tidak ada event.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 px-6 max-w-7xl mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/detail/${item.id}`)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 cursor-pointer flex flex-col border border-blue-100"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-blue-700 font-bold mb-1 text-lg">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-1">📅 {item.date}</p>
                <p className="text-gray-500 text-sm mb-3">📍 {item.location}</p>

                <p className="text-gray-700 text-sm flex-grow line-clamp-3 mb-3 leading-relaxed">
                  {item.description}
                </p>

                <button
                  onClick={() => navigate(`/detail/${item.id}`)}
                  className="mt-auto bg-blue-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
