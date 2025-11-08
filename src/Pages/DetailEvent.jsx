import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { events } from "../data/event";

export default function DetailEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find((ev) => ev.id === parseInt(id));

  if (!event)
    return (
      <div className="p-6 text-center">
        <p>Event tidak ditemukan.</p>
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline mt-2"
        >
          Kembali
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-[Poppins,sans-serif]">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 text-sm mb-4 hover:underline"
      >
        ← Kembali ke daftar event
      </button>

      <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {event.date} | {event.location}
        </p>

        {event.type === "seminar" && (
          <>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700 mb-6">
              <div>
                <p><b>Kuota:</b> {event.quota}</p>
                <p><b>Kuota Saat Ini:</b> {event.current}</p>
                <p><b>Sisa Kuota:</b> {event.quota - event.current}</p>
                <p className="mt-3"><b>Jadwal:</b> {event.schedule}</p>
                <p><b>Batas Daftar & Bayar:</b> {event.registerDeadline}</p>
              </div>
              <div>
                <p><b>Narasumber:</b></p>
                <ul className="list-disc list-inside">
                  {event.speakers?.map((sp, i) => (
                    <li key={i}>{sp}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t pt-6 mb-6">
              <h2 className="text-lg font-semibold mb-2">Deskripsi</h2>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Harga Tiket</h2>
              <div className="grid grid-cols-3 gap-4">
                {event.prices?.map((p, i) => (
                  <div key={i} className="border rounded-xl p-4 text-center">
                    <h3 className="font-bold">{p.category}</h3>
                    <p>{p.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {event.type !== "seminar" && (
          <p className="text-gray-700 leading-relaxed mb-6">
            {event.description}
          </p>
        )}

        <div className="text-right mt-8">
          <button
            onClick={() => navigate("/pembayaran", { state: { event } })}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Daftar Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
