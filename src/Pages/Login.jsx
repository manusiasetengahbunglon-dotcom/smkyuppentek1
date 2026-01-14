import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // pastikan ini ada export auth
import batik from "../assets/washi.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Cek UID admin
      if (user.uid === "jRAB9eA5ZEVGPRAueBftOnJMc7y1") {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("uid", user.uid);
  navigate("/dashboard");
} else {
  setError("❌ Akses ditolak: akun ini bukan admin.");
}
    } catch (err) {
      console.error(err);
      setError("Email atau password salah!");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${batik})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

      {/* Card utama */}
      <div className="relative bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-[90%] max-w-md text-center z-10">
        {/* ✅ Logo ambil dari public */}
        <img
          src="/logo.jpg"
          alt="Logo EMS"
          className="w-20 h-20 mx-auto mb-3 rounded-full shadow-lg"
        />

        <h1
          className="text-5xl font-extrabold tracking-widest mb-1"
          style={{
            background: "linear-gradient(90deg, #2563eb, #7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "'Orbitron', sans-serif",
            textShadow: "0 2px 4px rgba(0,0,0,0.15)",
          }}
        >
          EMS
        </h1>

        <h2 className="text-sm font-semibold tracking-wide mb-2 text-gray-700">
          Event Management System
        </h2>

        <p className="text-gray-600 mb-8 text-sm font-medium">
          SMK YUPPENTEK 1 TANGERANG
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Masukkan Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
            required
          />
          <input
            type="password"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
            required
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md"
          >
            Masuk Sekarang
          </button>
        </form>

        <p className="mt-8 text-gray-500 text-xs">
          © 2025 OSIS SMK YUPPENTEK 1 TANGERANG
        </p>
      </div>
    </div>
  );
}
