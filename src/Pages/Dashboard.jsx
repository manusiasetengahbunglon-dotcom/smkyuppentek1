import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { events } from "../data/event.js";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil data user dari localStorage atau state
  const savedUser = localStorage.getItem("user");
  let parsedUser = null;
  try {
    parsedUser = savedUser ? JSON.parse(savedUser) : null;
  } catch (err) {
    console.error("Invalid user data in localStorage:", err);
  }
  const user = location.state?.user || parsedUser;

  useEffect(() => {
    if (!user) navigate("/login");
    else localStorage.setItem("user", JSON.stringify(user));
  }, [user, navigate]);

  // 🔹 Logout: arahkan ke Hero section (halaman utama)
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/#hero"); // ✅ langsung ke Hero di halaman utama
  };

  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 font-[Poppins,sans-serif]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111827] text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <img
            src={logo}
            alt="Logo Event Management System"
            title="Event Management System"
            className="w-12 h-12 rounded-full shadow-md border border-white/20"
          />
          <div>
            <h1 className="text-xl font-bold text-blue-400 leading-tight tracking-wide">
              EMS
            </h1>
            <p className="text-[11px] text-gray-400">Event Management System</p>
          </div>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 p-5 space-y-4 text-[15px]">
          <button
            onClick={() => navigate("/")}
            className={`block w-full text-left font-semibold transition-all duration-200 ${
              location.pathname === "/"
                ? "text-blue-400"
                : "text-gray-300 hover:text-white"
            }`}
          >
            📊 Dashboard
          </button>

          <button
            onClick={() => navigate("/pembayaran")}
            className="block w-full text-left font-semibold text-gray-300 hover:text-blue-300 transition-all duration-200"
          >
            💳 Pembayaran
          </button>

          <button
            onClick={() => navigate("/vote")}
            className="block w-full text-left font-semibold text-gray-300 hover:text-blue-300 transition-all duration-200"
          >
            🗳️ Vote
          </button>
        </nav>

        {/* Footer Sidebar */}
        <div className="p-5 border-t border-white/10 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} EMS
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 relative overflow-y-auto">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-8">
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-full shadow px-4 py-2 w-80 border border-gray-200">
            <input
              type="text"
              placeholder="Cari event..."
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            />
            <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
          </div>

          {/* Avatar dan Profile Menu */}
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 cursor-pointer flex items-center justify-center text-white font-bold shadow-md hover:scale-105 transition-transform"
              onClick={() => setShowProfile(!showProfile)}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-2xl rounded-xl border border-gray-100 p-4 z-50">
                <p className="font-semibold text-gray-800 uppercase text-sm mb-1">
                  {user?.name || "Guest"}
                </p>
                <p className="text-gray-500 text-xs mb-3">{user?.nis}</p>
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="text-red-500 text-sm font-medium hover:underline"
                >
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Judul Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 tracking-tight">
          📅 Daftar Event Sekolah
        </h2>

        {/* Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((ev) => (
              <div
                key={ev.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition-all overflow-hidden border border-gray-100 group"
              >
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-2">
                    {ev.title}
                  </h3>
                  <p className="text-sm text-gray-500">{ev.date}</p>
                  <p className="text-xs text-gray-400 mb-3">{ev.location}</p>
                  <Link
                    to={`/detail/${ev.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
                  >
                    Lihat Detail →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm italic">
              Tidak ada event tersedia saat ini.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
