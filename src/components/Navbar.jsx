import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const logo = "/logo.jpg"; // pastikan logo ada di public/

  // Semua menu utama (Event & Kegiatan sekarang pakai href agar scroll di halaman yang sama)
  const menuItems = [
    { name: "Home", href: "#hero" },
    { name: "Profile", href: "#profile" },
    { name: "Visi Misi", href: "#visimisi" },
    { name: "Jurusan", href: "#jurusan" },
    { name: "Galeri", href: "#galeri" },
    { name: "Event", href: "#event" },       // 🔥 ubahan di sini
    { name: "Kegiatan", href: "#kegiatan" }, // 🔥 ubahan di sini
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (item) => {
    setMenuOpen(false);
    if (item.href) {
      const el = document.querySelector(item.href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-sm z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo & Judul */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
          <h1 className="text-yellow-400 font-bold text-lg">
            SMK YUPENTEK 1 TANGERANG
          </h1>
        </div>

        {/* Menu Navigasi - Desktop */}
        <div className="hidden md:flex gap-6 text-sm text-white">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => handleNavClick(item)}
              className="hover:text-yellow-400 transition-colors"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Tombol Login - Desktop */}
        <button
          onClick={() => navigate("/login")}
          className="hidden md:block bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
        >
          Login
        </button>

        {/* Tombol burger menu untuk mobile */}
        <button
          className="md:hidden text-yellow-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu dropdown versi mobile */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-sm text-white text-center py-4 space-y-3 animate-fadeIn">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => handleNavClick(item)}
              className="block w-full hover:text-yellow-400"
            >
              {item.name}
            </button>
          ))}

          {/* Tombol login di menu mobile */}
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/login");
            }}
            className="mt-3 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
