// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import VisiMisi from "./components/VisiMisi";
import Jurusan from "./components/Jurusan";
import Galeri from "./components/Galeri";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import DetailEvent from "./Pages/DetailEvent"; // ✅ sudah diimport
import bg from "./assets/bg.jpg";

export default function App() {
  return (
    <Routes>
      {/* 🏠 Halaman Utama (Landing Page) */}
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
            <section id="hero" className="relative min-h-screen">
              <Hero />
            </section>

            <section
              id="profile"
              className="py-20 bg-gradient-to-b from-blue-50/70 via-white/90 to-blue-100/60 text-gray-900"
            >
              <Profile />
            </section>

            <section
              id="visimisi"
              className="py-20 bg-gradient-to-b from-blue-100/80 via-blue-200/60 to-blue-100/70 text-gray-900"
            >
              <VisiMisi />
            </section>

            <section
              id="jurusan"
              className="py-20 bg-gradient-to-b from-blue-50/70 via-white/90 to-blue-100/70 text-gray-900"
            >
              <Jurusan />
            </section>

            <section
              id="galeri"
              className="py-20 bg-gradient-to-b from-blue-100/70 via-blue-50/90 to-white/80 text-gray-900"
            >
              <Galeri />
            </section>

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

      {/* 📊 Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* 📅 Detail Event — ✅ route sudah benar */}
      <Route path="/detail/:id" element={<DetailEvent />} />
    </Routes>
  );
}
