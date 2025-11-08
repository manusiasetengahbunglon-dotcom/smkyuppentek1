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
    <>
      <section
        id="hero"
        className="relative w-full min-h-[80vh] flex flex-col justify-center items-center overflow-hidden text-center md:text-left md:items-start px-4 sm:px-8 md:px-16"
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
        <div className="relative z-10 flex flex-col items-center md:items-start mt-6 sm:mt-10 w-full max-w-full sm:max-w-xl md:max-w-3xl text-center md:text-left px-2 sm:px-0">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-snug sm:leading-tight md:leading-tight mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-yellow-300 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
              SMK&nbsp;YUPENTEK&nbsp;1&nbsp;TANGERANG
            </span>
          </h1>

          <p className="text-gray-100/90 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed max-w-full sm:max-w-xl md:max-w-2xl">
            Tempat generasi muda mengasah keterampilan, mengembangkan ide, dan
            menjadi pemimpin masa depan dengan semangat OSIS yang kreatif dan
            kolaboratif.
          </p>

          <button
            onClick={() => setShowVideo(true)}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 hover:opacity-90 px-5 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base"
          >
            <Play size={20} />
            <span>Tonton Video</span>
          </button>
        </div>

        {/* Modal Video */}
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
                className="absolute top-3 right-3 text-white hover:text-red-400 transition duration-200"
              >
                <X size={28} />
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
