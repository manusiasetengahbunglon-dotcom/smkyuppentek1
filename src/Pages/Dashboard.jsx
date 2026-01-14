import React, { useState, useEffect } from "react";
import { ref, set, push, onValue, remove, update } from "firebase/database";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";

/* ================================
   TOAST
================================ */
function Toast({ message, type = "success", onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed top-5 right-5 px-4 py-2 rounded shadow text-white z-50 ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
      onClick={onClose}
    >
      {message}
    </motion.div>
  );
}

/* ================================
   DASHBOARD
================================ */
export default function Dashboard() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image: null,
    type: "event",
  });

  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const imgbbKey = "47cfc4db6ef42daf9655c9c014f574f8";

  /* ================================
     HANDLE CHANGE  ✅ FIX UTAMA
  ================================ */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  /* ================================
     AUTO CLOSE TOAST
  ================================ */
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  /* ================================
     LOAD DATA
  ================================ */
  useEffect(() => {
    const dbRef = ref(db, "items");

    return onValue(dbRef, (snap) => {
      const data = snap.val();
      if (!data) return setItems([]);

      const arr = Object.entries(data)
        .map(([id, val]) => ({ id, ...val }))
        .sort((a, b) => b.timestamp - a.timestamp);

      setItems(arr);
    });
  }, []);

  /* ================================
     RESIZE IMAGE
  ================================ */
  const resizeImage = (file, max = 1280) =>
    new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => (img.src = e.target.result);

      img.onload = () => {
        let { width, height } = img;
        if (width > max || height > max) {
          if (width > height) {
            height = (height * max) / width;
            width = max;
          } else {
            width = (width * max) / height;
            height = max;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) =>
            resolve(new File([blob], file.name, { type: "image/jpeg" })),
          "image/jpeg",
          0.8
        );
      };

      reader.readAsDataURL(file);
    });

  /* ================================
     UPLOAD IMAGE (FINAL)
  ================================ */
  const uploadImage = async (file) => {
    try {
      const resized = await resizeImage(file);
      const form = new FormData();
      form.append("image", resized);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        { method: "POST", body: form }
      );

      const json = await res.json();
      if (!json.success) throw new Error("Upload failed");

      const originalUrl = json.data.display_url;
      const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(
        originalUrl
      )}`;

      return proxyUrl;
    } catch (err) {
      console.error(err);
      setToast({ message: "❌ Upload gambar gagal", type: "error" });
      return "";
    }
  };

  /* ================================
     SUBMIT
  ================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl =
        typeof formData.image === "string" ? formData.image : "";

      if (!editingId && !(formData.image instanceof File)) {
        setToast({ message: "❌ Silakan upload gambar", type: "error" });
        setIsUploading(false);
        return;
      }

      if (formData.image instanceof File) {
        imageUrl = await uploadImage(formData.image);
        if (!imageUrl) return;
      }

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        date: formData.date,
        location: formData.location.trim(),
        image: imageUrl,
        type: formData.type,
        timestamp: Date.now(),
      };

      if (editingId) {
        await update(ref(db, `items/${editingId}`), payload);
        setToast({ message: "✅ Data berhasil diupdate" });
      } else {
        await set(push(ref(db, "items")), payload);
        setToast({ message: "✅ Data berhasil ditambahkan" });
      }

      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        image: null,
        type: "event",
      });
    } catch (err) {
      console.error(err);
      setToast({ message: "❌ Gagal menyimpan data", type: "error" });
    } finally {
      setIsUploading(false);
    }
  };

  /* ================================
     SHARE WHATSAPP
  ================================ */
 const cleanText = (t = "") =>
  t.replace(/https?:\/\/\S+/g, "").trim();

const shareToWhatsApp = (item) => {
  const message = `

PENGUMUMAN
 
Kepada Yth.
Siswa dan Siswi
SMK YUPENTEK 1 Tangerang


Kegiatan
${item.title}

Hari / Tanggal
${item.date}

Tempat
${item.location}

Deskripsi Kegiatan
${cleanText(item.description)}

--------------------------------
POSTER KEGIATAN

${item.image}

Demikian pengumuman ini disampaikan.
Atas perhatian dan partisipasinya,
kami ucapkan terima kasih.

Hormat kami,

SMK YUPENTEK 1 Tangerang
`;

  window.open(
    `https://wa.me/?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};


  /* ================================
     RENDER
  ================================ */
  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
    <div className="max-w-7xl mx-auto">

      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        {/* KIRI: LOGO + TITLE */}
        <div className="flex items-center gap-4">
          <img
            src="/logo.jpg"
            alt="Logo Sekolah"
            className="w-14 h-14 object-contain"
          />
          
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 leading-tight">
              {editingId ? "Edit Data Kegiatan" : "Event Management System"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Pengelolaan Kegiatan OSIS
            </p>
          </div>
        </div>

        {/* KANAN: IDENTITAS */}
        <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
          SMK YUPENTEK 1 Tangerang
        </div>
      </div>
      {/* =============== END HEADER =============== */}

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 mb-10"
      >
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm text-gray-600">Judul</label>
            <input
              className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Jenis</label>
            <select
              className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="event">Event</option>
              <option value="kegiatan">Kegiatan</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Tanggal</label>
            <input
              type="date"
              className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Lokasi</label>
            <input
              className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Deskripsi</label>
            <textarea
              rows="4"
              className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Poster</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-2"
            />
          </div>
        </div>

        {formData.image && (
          <img
            src={
              formData.image instanceof File
                ? URL.createObjectURL(formData.image)
                : formData.image
            }
            className="mt-4 w-48 h-32 object-cover rounded-lg border"
            alt="preview"
          />
        )}

        <button
          disabled={isUploading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-2 rounded-lg disabled:opacity-60"
        >
          {isUploading
            ? "Menyimpan..."
            : editingId
            ? "Update Data"
            : "Tambah Data"}
        </button>
      </form>

      {/* ================= LIST ================= */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={item.image}
              className="h-44 w-full object-cover"
              alt={item.title}
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {item.date} • {item.location}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setEditingId(item.id);
                    setFormData(item);
                  }}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 transition rounded-md py-1 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => remove(ref(db, `items/${item.id}`))}
                  className="flex-1 bg-red-500 hover:bg-red-600 transition text-white rounded-md py-1 text-sm"
                >
                  Hapus
                </button>
              </div>

              <button
                onClick={() => shareToWhatsApp(item)}
                className="mt-3 bg-green-600 hover:bg-green-700 transition text-white w-full py-2 rounded-md text-sm"
              >
                Share WhatsApp
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

    </div>
  </div>
);
}


