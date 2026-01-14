import { Wrench, Car, Cpu, Zap, Palette, Package } from "lucide-react";

export default function Jurusan() {
  const data = [
    {
      kategori: "Otomotif",
      icon: <Car size={36} className="text-blue-600" />,
      jurusan: [
        "Teknik Kendaraan Ringan Otomotif (TKRO)",
        "Teknik Bisnis Sepeda Motor (TBSM)",
      ],
    },
    {
      kategori: "Mesin dan Industri",
      icon: <Wrench size={36} className="text-blue-600" />,
      jurusan: [
        "Teknik Pemesinan (TP)",
        "Teknik Mekanik Industri (TMI)",
        "Teknik Pengelasan",
      ],
    },
    {
      kategori: "Listrik",
      icon: <Zap size={36} className="text-blue-600" />,
      jurusan: ["Teknik Instalasi Tenaga Listrik"],
    },
    {
      kategori: "Komputer dan Jaringan",
      icon: <Cpu size={36} className="text-blue-600" />,
      jurusan: ["Teknik Komputer dan Jaringan (TKJ)"],
    },
    {
      kategori: "Desain",
      icon: <Palette size={36} className="text-blue-600" />,
      jurusan: ["Desain Komunikasi Visual (DKV)"],
    },
    {
      kategori: "Logistik",
      icon: <Package size={36} className="text-blue-600" />,
      jurusan: ["Tata Kelola Logistik"],
    },
  ];

  return (
    <section
      id="jurusan"
      className="relative py-24 bg-gradient-to-b from-blue-100 via-blue-50 to-white text-gray-900 overflow-hidden"
    >
      {/* Background lembut dengan efek radial */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(147,197,253,0.2),transparent_70%)]"></div>

      {/* Judul */}
      <div className="relative text-center mb-14 px-6 z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
          Jurusan di SMK YUPPENTEK 1 Tangerang
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-4 rounded-full"></div>
        <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
          Kami menyediakan berbagai program keahlian unggulan untuk menyiapkan
          siswa menghadapi dunia industri dan teknologi masa depan.
        </p>
      </div>

      {/* Grid Jurusan */}
      <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {data.map((bidang) => (
          <div
            key={bidang.kategori}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl p-8 border border-blue-100 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center justify-center mb-5">
              {bidang.icon}
            </div>
            <h3 className="text-xl font-bold text-blue-800 mb-3 text-center">
              {bidang.kategori}
            </h3>
            <ul className="text-gray-700 space-y-2 text-center sm:text-left">
              {bidang.jurusan.map((j, i) => (
                <li
                  key={i}
                  className="before:content-['•'] before:text-blue-500 before:mr-2 inline-block sm:block"
                >
                  {j}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
