import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-sm z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo & Judul */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-yellow-400 font-bold text-lg">
            SMK YUPENTEK 1 TANGERANG
          </h1>
        </div>

        {/* Menu Navigasi - tampil di desktop */}
        <div className="hidden md:flex gap-6 text-sm text-white">
          <a href="#hero" className="hover:text-yellow-400 transition-colors">
            Home
          </a>
          <a href="#profile" className="hover:text-yellow-400 transition-colors">
            Profile
          </a>
          <a href="#visimisi" className="hover:text-yellow-400 transition-colors">
            Visi Misi
          </a>
          <a href="#jurusan" className="hover:text-yellow-400 transition-colors">
            Jurusan
          </a>
          <a href="#galeri" className="hover:text-yellow-400 transition-colors">
            Galeri
          </a>
          <a href="#contact" className="hover:text-yellow-400 transition-colors">
            Contact
          </a>
        </div>

        {/* Tombol Login - Desktop */}
        <button
          onClick={() => navigate("/login")}
          className="hidden md:block bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
        >
          Login
        </button>

        {/* Tombol titik tiga (burger menu) untuk mobile */}
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
          <a
            href="#hero"
            className="block hover:text-yellow-400"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#profile"
            className="block hover:text-yellow-400"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </a>
          <a
            href="#visimisi"
            className="block hover:text-yellow-400"
            onClick={() => setMenuOpen(false)}
          >
            Visi Misi
          </a>
          <a
            href="#jurusan"
            className="block hover:text-yellow-400"
            onClick={() => setMenuOpen(false)}
          >
            Jurusan
          </a>
          <a
            href="#galeri"
            className="block hover:text-yellow-400"
            onClick={() => setMenuOpen(false)}
          >
            Galeri
          </a>
          <a
            href="#contact"
            className="block hover:text-yellow-400"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>

          {/* Tombol login di dalam menu mobile */}
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
