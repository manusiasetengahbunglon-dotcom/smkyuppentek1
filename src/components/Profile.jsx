import React from "react";
import { Users, Layers3, GraduationCap, School, FileCog, Brush, Shield, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  const stats = [
    { label: "Guru", value: 39, icon: <Users size={36} className="text-blue-500" /> },
    { label: "Rombel", value: 21, icon: <Layers3 size={36} className="text-blue-500" /> },
    { label: "Peserta Didik", value: 447, icon: <GraduationCap size={36} className="text-blue-500" /> },
    { label: "Ruang Kelas", value: 15, icon: <School size={36} className="text-blue-500" /> },
    { label: "Pegawai TU", value: 6, icon: <FileCog size={36} className="text-blue-500" /> },
    { label: "Staf Kebersihan", value: 4, icon: <Brush size={36} className="text-blue-500" /> },
    { label: "Satpam", value: 2, icon: <Shield size={36} className="text-blue-500" /> },
    { label: "Teknisi / IT", value: 1, icon: <Cpu size={36} className="text-blue-500" /> },
  ];

  return (
    <section id="about" className="py-24 bg-white text-center text-gray-700">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900">PROFILE SEKOLAH</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }} className="max-w-5xl mx-auto px-6 text-left text-gray-700 leading-relaxed space-y-10">
        <p className="text-justify">
          <span className="font-semibold text-blue-800">SMK Yuppentek 1 Tangerang</span> adalah sekolah swasta yang berlokasi di Kota Tangerang, didirikan pada <span className="font-medium">16 Januari 1968</span> di bawah naungan <span className="font-medium text-blue-800">Yayasan Usaha Peningkatan Pendidikan Teknologi (Yuppentek)</span>. Visi sekolah ini adalah menjadi sekolah pilihan utama yang mencetak lulusan berkarakter, kompeten, dan literat, dengan akreditasi <span className="font-medium">“B”</span> berdasarkan <span className="font-medium">SK 1857/BAN-SM/SK/2022</span>.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 border border-blue-100 hover:scale-[1.03] text-center">
              <div className="flex justify-center mb-3">{s.icon}</div>
              <h4 className="text-lg font-bold text-blue-700">{s.value}</h4>
              <p className="text-sm text-gray-600 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
