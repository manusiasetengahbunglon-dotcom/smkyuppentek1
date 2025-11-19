import React, { useState, useEffect } from "react";
import { ref, set, push, onValue, remove, update } from "firebase/database";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";

// Toast sederhana
function Toast({ message, type = "success", onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white z-50 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
      onClick={onClose}
    >
      {message}
    </motion.div>
  );
}

export default function Dashboard() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image: "",
    type: "event",
  });

  const [editingId, setEditingId] = useState(null);
  const [items, setItems] = useState([]);
  const [toast, setToast] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [filter, setFilter] = useState("all");

  const imgbbKey = "47cfc4db6ef42daf9655c9c014f574f8";

  // Ambil data realtime
  useEffect(() => {
    const dbRef = ref(db, "items");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loaded = Object.entries(data)
          .map(([id, val]) => ({ id, ...val }))
          .reverse();
        setItems(loaded);
      } else {
        setItems([]);
      }
    });
  }, []);

  // Upload gambar ke ImgBB
  const uploadImage = async (file) => {
    try {
      const form = new FormData();
      form.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (!data.success) throw new Error("Upload gagal");

      const rawUrl = data.data.image.url;
      const safeUrl = `https://images.weserv.nl/?url=${encodeURIComponent(
        rawUrl
      )}`;

      return safeUrl;
    } catch (err) {
      console.error("Upload gagal:", err);
      setToast({ message: "❌ Upload gambar gagal!", type: "error" });
      return "";
    }
  };

  // Input handler
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      if (files[0].size > 5 * 1024 * 1024) {
        setToast({ message: "File max 5MB!", type: "error" });
        return;
      }
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = formData.image;

      if (formData.image instanceof File) {
        imageUrl = await uploadImage(formData.image);
        if (!imageUrl) throw new Error("Upload gagal");
      }

      const itemData = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        location: formData.location,
        image: imageUrl,
        type: formData.type,
        timestamp: Date.now(),
      };

      if (editingId) {
        await update(ref(db, `items/${editingId}`), itemData);
        setToast({ message: "✅ Data berhasil diupdate!" });
        setEditingId(null);
      } else {
        const newRef = push(ref(db, "items"));
        await set(newRef, itemData);
        setToast({ message: "✅ Data berhasil ditambahkan!" });
      }

      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        image: "",
        type: "event",
      });
    } catch (err) {
      console.error(err);
      setToast({ message: "❌ Gagal menyimpan data!", type: "error" });
    } finally {
      setIsUploading(false);
    }
  };

  // Edit data
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      description: item.description,
      date: item.date,
      location: item.location,
      image: item.image,
      type: item.type,
    });
  };

  // Delete data
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      await remove(ref(db, `items/${id}`));
      setToast({ message: "🗑️ Data berhasil dihapus!" });
    }
  };

  // -----------------------------
  // 🔹 SHARE WHATSAPP FIX GAMBAR
  // -----------------------------
const shareToWhatsApp = (item) => {
  const detailUrl = `${window.location.origin}/detail/${item.id}`;

  const text = `
📌 *${item.title}*

📅 Tanggal: ${item.date || "-"}
📍 Lokasi: ${item.location || "-"}

${item.description}

Klik untuk lihat gambar & detail:
${detailUrl}
  `;

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;

  window.open(waUrl, "_blank");
};


  // Filter
  const filteredItems =
    filter === "all" ? items : items.filter((i) => i.type === filter);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 via-white to-blue-100 font-[Poppins,sans-serif]">
      
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#111827] text-white flex-col shadow-xl">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-12 h-12 rounded-full border border-white/20"
          />
          <div>
            <h1 className="text-xl font-bold text-blue-400">Dashboard</h1>
            <p className="text-[11px] text-gray-400">SMK YUPENTEK 1</p>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`text-left px-3 py-2 rounded ${
              filter === "all" ? "bg-blue-600" : "hover:bg-blue-500"
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setFilter("event")}
            className={`text-left px-3 py-2 rounded ${
              filter === "event" ? "bg-blue-600" : "hover:bg-blue-500"
            }`}
          >
            Event
          </button>
          <button
            onClick={() => setFilter("kegiatan")}
            className={`text-left px-3 py-2 rounded ${
              filter === "kegiatan" ? "bg-blue-600" : "hover:bg-blue-500"
            }`}
          >
            Kegiatan
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-5 md:p-10">
        
        {/* Form */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {editingId ? "✏️ Edit Data" : "📝 Tambah Data Baru"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-6 mb-8 border border-gray-100"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Judul
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Jenis
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg text-gray-700"
              >
                <option value="event">Event</option>
                <option value="kegiatan">Kegiatan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tanggal
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tempat
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg text-gray-700"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Deskripsi
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg text-gray-700 h-24 resize-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Gambar
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
              />

              {formData.image && (
                <img
                  src={
                    formData.image instanceof File
                      ? URL.createObjectURL(formData.image)
                      : formData.image
                  }
                  alt="Preview"
                  className="mt-3 w-40 h-28 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            disabled={isUploading}
          >
            {editingId ? "Simpan Perubahan" : "Tambah"}{" "}
            {isUploading && "(Uploading...)"} 
          </button>
        </form>

        {/* List */}
        <h2 className="text-xl font-bold text-gray-800 mb-3">📋 Data Tersimpan</h2>

        {filteredItems.length === 0 ? (
          <p className="text-gray-500 italic">Belum ada data</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-white rounded-xl shadow border p-4 flex flex-col"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-36 object-cover rounded-md mb-3"
                  />
                )}

                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-1">{item.date}</p>
                <p className="text-sm text-gray-500 mb-2">{item.location}</p>
                <p className="text-xs text-gray-600 line-clamp-3 mb-3">
                  {item.description}
                </p>

                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md w-fit mb-2">
                  {item.type}
                </span>

                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 bg-yellow-400 text-sm text-black py-1 rounded-lg hover:bg-yellow-300 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 bg-red-500 text-sm text-white py-1 rounded-lg hover:bg-red-400 transition"
                  >
                    Hapus
                  </button>
                </div>

                <button
                  onClick={() => shareToWhatsApp(item)}
                  className="mt-3 w-full bg-green-500 text-white text-sm py-2 rounded-lg hover:bg-green-600"
                >
                  Share ke WhatsApp
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
