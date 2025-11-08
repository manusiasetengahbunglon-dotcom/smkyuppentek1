export default function Footer() {
  return (
    <footer className="relative bg-blue-900 text-gray-100 text-center py-6 overflow-hidden">
      {/* Background gradient gelap */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900"></div>
      {/* Opsional: radial glow halus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_70%)]"></div>

      <div className="relative z-10 text-sm">
        © 2025 OSIS SMK YUPENTEK 1 Tangerang. All rights reserved.
      </div>
    </footer>
  );
}
