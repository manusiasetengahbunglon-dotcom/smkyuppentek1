import { Wrench, Car, Cpu, Zap, Palette, Package } from "lucide-react";

export default function Jurusan() {
  const data = [
    {
      kategori: "Otomotif",
      icon: <Car size={36} className="text-blue-500" />,
      jurusan: [
        "Teknik Kendaraan Ringan Otomotif (TKRO)",
        "Teknik Bisnis Sepeda Motor (TBSM)",
      ],
    },
    {
      kategori: "Mesin dan Industri",
      icon: <Wrench size={36} className="text-blue-500" />,
      jurusan: [
        "Teknik Pemesinan (TP)",
        "Teknik Mekanik Industri (TMI)",
        "Teknik Pengelasan",
      ],
    },
    {
      kategori: "Listrik",
      icon: <Zap size={36} className="text-blue-500" />,
      jurusan: ["Teknik Instalasi Tenaga Listrik"],
    },
    {
      kategori: "Komputer dan Jaringan",
      icon: <Cpu size={36} className="text-blue-500" />,
      jurusan: ["Teknik Komputer dan Jaringan (TKJ)"],
    },
    {
      kategori: "Desain",
      icon: <Palette size={36} className="text-blue-500" />,
      jurusan: ["Desain Komunikasi Visual (DKV)"],
    },
    {
      kategori: "Logistik",
      icon: <Package size={36} className="text-blue-500" />,
      jurusan: ["Tata Kelola Logistik"],
    },
  ];

  return (
    <section
      id="jurusan"
      className="py-20 bg-gradient-to-b from-blue-50/70 via-white/90 to-blue-100/70 text-gray-900"
    >
      <div className="text-center mb-14 px-6">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-4">
          Jurusan di SMK YUPENTEK 1 Tangerang
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kami menyediakan berbagai program keahlian unggulan untuk menyiapkan
          siswa menghadapi dunia industri dan teknologi masa depan.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {data.map((bidang) => (
          <div
            key={bidang.kategori}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 border border-blue-100 hover:scale-[1.03]"
          >
            <div className="flex items-center justify-center mb-4">
              {bidang.icon}
            </div>
            <h3 className="text-xl font-bold text-blue-700 mb-3">
              {bidang.kategori}
            </h3>
            <ul className="text-gray-700 space-y-2">
              {bidang.jurusan.map((j, i) => (
                <li key={i} className="before:content-['•'] before:text-blue-500 before:mr-2">
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
