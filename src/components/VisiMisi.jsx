import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 bg-gradient-to-b from-blue-100 via-blue-50 to-white text-gray-700"
    >
      {/* Efek lembut di background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(96,165,250,0.15),transparent_70%)]"></div>

      {/* Judul Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-14 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900">
          About Us
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
      </motion.div>

      {/* Konten Utama */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 text-left"
      >
        {/* VISI */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8"
        >
          <h3 className="text-2xl font-bold text-blue-800 mb-4 border-l-4 border-blue-500 pl-3">
            VISI
          </h3>
          <p className="text-gray-700 leading-relaxed text-justify">
            Menjadi SMK pilihan utama yang mampu mencetak lulusan berkarakter,
            kompeten, dan literat.
          </p>
        </motion.div>

        {/* MISI */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8"
        >
          <h3 className="text-2xl font-bold text-blue-800 mb-4 border-l-4 border-blue-500 pl-3">
            MISI
          </h3>
          <ul className="list-decimal pl-5 space-y-3 text-gray-700 leading-relaxed">
            <li>
              Menyelenggarakan pendidikan kejuruan/vokasi yang profesional dan
              memiliki keunggulan merata pada semua program keahlian.
            </li>
            <li>
              Membekali peserta didik sehingga:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Beriman dan bertaqwa terhadap Tuhan Yang Maha Esa</li>
                <li>Berjiwa Pancasila dan cinta terhadap NKRI</li>
                <li>Cakap berkomunikasi dan adaptif terhadap lingkungan</li>
                <li>Kompeten di bidangnya sesuai standar industri</li>
                <li>Memiliki jiwa entrepreneurship dan keterampilan sosial</li>
                <li>Mampu memobilisasi inovasi dan iptek</li>
                <li>Terampil menyelesaikan tugas dan pekerjaan</li>
              </ul>
            </li>
            <li>Menyelenggarakan pembelajaran berbasis teknologi informasi.</li>
            <li>
              Menjadi pusat informasi lowongan kerja, pelaksana pemasaran, dan
              penyaluran tenaga kerja.
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
