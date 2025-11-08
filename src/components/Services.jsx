import React from "react";
import s1 from "../assets/service-1.jpg";
import s2 from "../assets/service-2.jpg";
import s3 from "../assets/service-3.jpg";

export default function Services() {
  const services = [
    { title: "Project & Event Design", desc: "Rencana acara & project kerja OSIS", img: s1 },
    { title: "Pelatihan Kepemimpinan", desc: "LDK, workshop, dan mentoring", img: s2 },
    { title: "Manajemen Acara", desc: "Pendanaan, logistik, dan pelaporan", img: s3 },
  ];
  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold text-primary mb-3">Layanan & Program</h3>
        <p className="text-gray-600 mb-8">Program OSIS untuk pengembangan siswa dan sekolah.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
              <img src={s.img} alt={s.title} className="h-48 w-full object-cover" />
              <div className="p-5">
                <h4 className="font-semibold text-lg text-primary">{s.title}</h4>
                <p className="text-gray-600 mt-2 text-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
