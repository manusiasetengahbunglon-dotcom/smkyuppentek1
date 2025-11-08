import React, { useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import bgImage from "../assets/bg.jpg";
import schoolVideo from "../assets/sma.mp4";

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  // 🔹 Animasi gerak background pelan
  useEffect(() => {
    let x = 50,
      y = 50;
    let dirX = 1,
      dirY = 1;

    const move = setInterval(() => {
      x += 0.1 * dirX;
      y += 0.07 * dirY;
      if (x >= 55 || x <= 45) dirX *= -1;
      if (y >= 55 || y <= 45) dirY *= -1;
      setPos({ x, y });
    }, 50);

    return () => clearInterval(move);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-28"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: `${pos.x}% ${pos.y}%`,
        transition: "background-position 0.2s linear",
      }}
    >
      {/* Overlay agar teks terbaca */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Konten utama */}
      <div className="relative z-10 px-6 sm:px-10 md:px-20 text-center md:text-left max-w-5xl text-white drop-shadow-lg animate-fadeIn">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-snug sm:leading-tight break-words">
          <span className="bg-gradient-to-r from-blue-400 via-yellow-300 to-red-400 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
            SMK&nbsp;YUPENTEK&nbsp;1&nbsp;TANGERANG
          </span>
        </h1>

        <p className="text-gray-100/90 text-sm sm:text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
          Tempat generasi muda mengasah keterampilan, mengembangkan ide, dan
          menjadi pemimpin masa depan dengan semangat OSIS yang kreatif dan
          kolaboratif.
        </p>

        <button
          onClick={() => setShowVideo(true)}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 hover:opacity-90 px-6 sm:px-7 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
        >
          <Play size={20} className="text-white" />
          <span className="text-white">Watch Video</span>
        </button>
      </div>

      {/* Modal video */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn px-3"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-[900px] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={schoolVideo}
              controls
              autoPlay
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white hover:text-red-400 transition duration-200"
            >
              <X size={28} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
