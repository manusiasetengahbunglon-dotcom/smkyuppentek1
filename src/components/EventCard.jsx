import React from "react";

export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200">
      <img
        src={event.img}
        alt={event.title}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h4 className="text-lg font-bold text-gray-800">{event.title}</h4>
        <p className="text-sm text-gray-500 mb-2">{event.date}</p>
        <p className="text-sm text-gray-600">{event.desc}</p>
        <button className="mt-3 w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">
          Detail
        </button>
      </div>
    </div>
  );
}
