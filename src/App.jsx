import React from "react";
import { Routes, Route } from "react-router-dom";

// 🧩 Components utama
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import VisiMisi from "./components/VisiMisi";
import Jurusan from "./components/Jurusan";
import Galeri from "./components/Galeri";
import Event from "./components/Event";
import Kegiatan from "./components/Kegiatan";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// 📄 Pages
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import DetailKegiatan from "./Pages/DetailKegiatan"; // ⬅️ tambahkan ini

// 🖼️ Background utama
import bg from "./assets/bg.jpg";

export default function App() {
  return (
    <Routes>
      {/* 🏠 Halaman Utama */}
      <Route
        path="/"
        element={
          <div
            className="min-h-screen text-white font-poppins overflow-x-hidden"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Navbar />

            {/* 🏫 Hero */}
            <section id="hero" className="relative min-h-screen">
              <Hero />
            </section>

            {/* 👤 Profile */}
            <section
              id="profile"
              className="py-20 bg-gradient-to-b from-blue-50/70 via-white/90 to-blue-100/60 text-gray-900"
            >
              <Profile />
            </section>

            {/* 🎯 Visi Misi */}
            <section
              id="visimisi"
              className="py-20 bg-gradient-to-b from-blue-100/80 via-blue-200/60 to-blue-100/70 text-gray-900"
            >
              <VisiMisi />
            </section>

            {/* 🧰 Jurusan */}
            <section
              id="jurusan"
              className="py-20 bg-gradient-to-b from-blue-50/70 via-white/90 to-blue-100/70 text-gray-900"
            >
              <Jurusan />
            </section>

            {/* 🖼️ Galeri */}
            <section
              id="galeri"
              className="py-20 bg-gradient-to-b from-blue-100/70 via-blue-50/90 to-white/80 text-gray-900"
            >
              <Galeri />
            </section>

            {/* 📅 Event */}
            <section
              id="event"
              className="py-20 bg-gradient-to-b from-white/90 via-blue-50/80 to-blue-100/70 text-gray-900"
            >
              <Event />
            </section>

            {/* 🎉 Kegiatan */}
            <section
              id="kegiatan"
              className="py-20 bg-gradient-to-b from-blue-50/70 via-white/90 to-blue-100/60 text-gray-900"
            >
              <Kegiatan />
            </section>

            {/* ☎️ Contact */}
            <section
              id="contact"
              className="py-20 bg-gradient-to-b from-white/90 via-blue-50/80 to-blue-100/70 text-gray-900"
            >
              <Contact />
            </section>

            <Footer />
          </div>
        }
      />

      {/* 🔐 Halaman Login */}
      <Route path="/login" element={<Login />} />

      {/* 🧭 Dashboard Admin */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* 📄 Detail Kegiatan */}
      <Route path="/detail/:id" element={<DetailKegiatan />} />
    </Routes>
  );
}
