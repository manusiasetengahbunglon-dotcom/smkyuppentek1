// src/data/event.js
import event1 from "../assets/event1.png";
import event2 from "../assets/event2.jpg";
import event3 from "../assets/event3.jpeg";

export const events = [
  {
    id: 1,
    title:
      "SEMINAR BEYOND TECHNICAL SKILLS: LEADERSHIP, CREATIVITY, AND DIGITAL PERSONAL BRANDING IN THE ERA OF ARTIFICIAL INTELLIGENCE",
    date: "Kamis, 18 Desember 2025",
    location: "Auditorium Darsono Unpam Viktor",
    image: event1,
    type: "seminar",
    quota: 10000,
    current: 5342,
    schedule: "18-Desember-2025",
    registerDeadline: "30-November-2025",
    speakers: [
      "Faqihza Mukhlish (Kang Pukis – Kelas Terbuka)",
      "Yan Mitha Djaksana, S.Kom., M.Kom.",
    ],
    description: `
      📢 [SEMINAR NASIONAL TEKNIK INFORMATIKA]
      ✨ BEYOND TECHNICAL SKILLS: Leadership, Creativity, and Digital Personal Branding in the Era of Artificial Intelligence ✨
      💡 Belajar skill kepemimpinan & kreativitas di era AI, membangun personal branding, dan dapat insight langsung dari praktisi.`,
    prices: [
      { category: "Online", price: "Rp 50.000" },
      { category: "Offline", price: "Rp 75.000" },
      { category: "Pemakalah", price: "Gratis" },
    ],
  },
  {
    id: 2,
    title: "The 2nd International Conference on Religion",
    date: "Sabtu, 21 Desember 2025",
    location: "Aula Utama SMK YUPENTEK 1",
    image: event2,
    type: "konferensi",
    description:
      "Konferensi internasional yang membahas peran agama dalam membangun peradaban global yang berkelanjutan.",
  },
  {
    id: 3,
    title: "Workshop Data Analyst dan AI",
    date: "Rabu, 10 Januari 2026",
    location: "Lab Komputer 1",
    image: event3,
    type: "workshop",
    description:
      "Workshop eksklusif untuk mempelajari dasar-dasar Data Analyst dan penerapan Artificial Intelligence dalam industri modern.",
  },
];
console.log("✅ event.js loaded, exports:", { events });
