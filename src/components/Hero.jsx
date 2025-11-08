import React, { useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import bgImage from "../assets/bg.jpg";
import schoolVideo from "../assets/sma.mp4";

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  // Animasi background halus
  useEffect(() => {
    let x = 50,
      y = 50,
      dirX = 1,
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
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden text-center md:text-left md:items-start px-4 sm:px-6 lg:px-12"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: `${pos.x}% ${pos.y}%`,
        transition: "background-position 0.2s linear",
      }}
    >
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Konten utama */}
      <div className="relative z-10 flex flex-col items-center md:items-start mt-6 sm:mt-12 w-full max-w-full sm:max-w-lg md:max-w-3xl text-center md:text-left px-2 sm:px-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug sm:leading-tight md:leading-tight mb-4 sm:mb-6">
          <span className="bg-gradient-to-r from-blue-400 via-yellow-300 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
            SMK&nbsp;YUPENTEK&nbsp;1&nbsp;TANGERANG
          </span>
        </h1>

        <p className="text-gray-100/90 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed max-w-full sm:max-w-xl md:max-w-2xl">
          Tempat generasi muda mengasah keterampilan, mengembangkan ide, dan menjadi pemimpin masa depan
          dengan semangat OSIS yang kreatif dan kolaboratif.
        </p>

        <button
          onClick={() => setShowVideo(true)}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 hover:opacity-90 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300 text-base sm:text-lg"
        >
          <Play size={22} />
          <span>Tonton Video</span>
        </button>
      </div>

      {/* Modal Video */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 px-4 sm:px-6"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl sm:max-w-3xl md:max-w-2xl lg:max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={schoolVideo}
              controls
              autoPlay
              className="w-full h-full object-cover rounded-xl"
            />
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-3 right-3 text-white hover:text-red-400 transition duration-200"
            >
              <X size={28} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
