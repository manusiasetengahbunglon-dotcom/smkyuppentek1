import React from "react";

export default function Stats() {
  const stats = [
    { label: "Tahun Pengalaman", value: "—" },
    { label: "Program Kerja", value: "24+" },
    { label: "Anggota", value: "120" },
    { label: "Support 24/7", value: "Ya" },
  ];
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">
            <div className="text-3xl font-bold text-primary">{s.value}</div>
            <div className="text-sm text-gray-500 mt-2">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
