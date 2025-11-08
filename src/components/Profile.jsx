import React from "react";
import {
  Users,
  Layers3,
  GraduationCap,
  School,
  FileCog,
  Brush,
  Shield,
  Cpu,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  const stats = [
    { label: "Guru", value: 39, icon: <Users size={34} className="text-blue-600" /> },
    { label: "Rombel", value: 21, icon: <Layers3 size={34} className="text-blue-600" /> },
    { label: "Peserta Didik", value: 447, icon: <GraduationCap size={34} className="text-blue-600" /> },
    { label: "Ruang Kelas", value: 15, icon: <School size={34} className="text-blue-600" /> },
    { label: "Pegawai TU", value: 6, icon: <FileCog size={34} className="text-blue-600" /> },
    { label: "Staf Kebersihan", value: 4, icon: <Brush size={34} className="text-blue-600" /> },
    { label: "Satpam", value: 2, icon: <Shield size={34} className="text-blue-600" /> },
    { label: "Teknisi / IT", value: 1, icon: <Cpu size={34} className="text-blue-600" /> },
  ];

  return (
    <section
      id="about"
      className="relative py-24 bg-gradient-to-b from-blue-100 via-blue-50 to-white text-gray-800 overflow-hidden"
    >
      {/* Efek cahaya halus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(96,165,250,0.2),transparent_70%)]"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Judul */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900">
            PROFIL SEKOLAH
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
        </motion.div>

        {/* Deskripsi */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-gray-700 text-justify leading-relaxed text-sm sm:text-base md:text-lg mb-16"
        >
          <p>
            <span className="font-semibold text-blue-800">
              SMK Yuppentek 1 Tangerang
            </span>{" "}
            adalah sekolah swasta yang berlokasi di Kota Tangerang, didirikan
            pada{" "}
            <span className="font-medium">16 Januari 1968</span> di bawah
            naungan{" "}
            <span className="font-medium text-blue-800">
              Yayasan Usaha Peningkatan Pendidikan Teknologi (Yuppentek)
            </span>
            . Visi sekolah ini adalah menjadi sekolah pilihan utama yang
            mencetak lulusan berkarakter, kompeten, dan literat, dengan
            akreditasi{" "}
            <span className="font-medium">“B”</span> berdasarkan{" "}
            <span className="font-medium">SK 1857/BAN-SM/SK/2022</span>.
          </p>
        </motion.div>

        {/* Statistik */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100 hover:scale-[1.03] text-center p-5 sm:p-6"
            >
              <div className="flex justify-center mb-3">{s.icon}</div>
              <h4 className="text-xl sm:text-2xl font-bold text-blue-700">{s.value}</h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
