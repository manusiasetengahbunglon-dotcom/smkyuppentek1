import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-sm z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo & Judul */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-yellow-400 font-bold text-lg">
            SMK YUPENTEK 1 TANGERANG
          </h1>
        </div>

        {/* Menu Navigasi */}
        <div className="hidden md:flex gap-6 text-sm">
          <a href="#hero" className="hover:text-yellow-400 transition-colors">Home</a>
          <a href="#profile" className="hover:text-yellow-400 transition-colors">Profile</a>
          <a href="#visimisi" className="hover:text-yellow-400 transition-colors">Visi Misi</a>
          <a href="#jurusan" className="hover:text-yellow-400 transition-colors">Jurusan</a>
          <a href="#galeri" className="hover:text-yellow-400 transition-colors">Galeri</a>
          <a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a>
        </div>

        {/* Tombol Login */}
        <button
          onClick={() => navigate("/login")}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
        >
          Login
        </button>
      </div>
    </nav>
  );
}
