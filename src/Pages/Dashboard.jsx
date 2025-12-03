import React, { useState, useEffect } from "react";
import { ref, set, push, onValue, remove, update } from "firebase/database";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";

/* ================================
   ⚡ TOAST COMPONENT
================================ */
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

/* ================================
   ⚡ DASHBOARD MAIN
================================ */
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

  /* ================================
     🔥 LOAD DATA REALTIME
  ================================= */
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

  /* ================================
     🔥 IMAGE UPLOAD IMGBB
  ================================= */
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

      return data.data.image.url; // Direct JPG — WA friendly
    } catch (err) {
      setToast({ message: "❌ Upload gagal!", type: "error" });
      return "";
    }
  };

  /* ================================
     🔥 FORM HANDLER
  ================================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      if (files[0].size > 5 * 1024 * 1024) {
        return setToast({ message: "❌ Max 5MB!", type: "error" });
      }
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /* ================================
     🔥 SUBMIT (ADD / UPDATE)
  ================================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = formData.image;

      // Jika gambar baru diupload
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
      setToast({ message: "❌ Gagal menyimpan!", type: "error" });
    } finally {
      setIsUploading(false);
    }
  };

  /* ================================
     🔥 EDIT
  ================================= */
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

  /* ================================
     🔥 DELETE
  ================================= */
  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus data ini?")) {
      await remove(ref(db, `items/${id}`));
      setToast({ message: "🗑️ Data berhasil dihapus!" });
    }
  };

  /* ================================
     🔥 SHARE TO WHATSAPP — 100% WORKING
  ================================= */
 const shareToWhatsApp = (item) => {
  const text =
`📢 *${item.title}*
📆 ${item.date}
📍 ${item.location}

${item.description}

🔗 Lihat Gambar:
${item.image}`;

  window.open(
    `https://wa.me/?text=${encodeURIComponent(text)}`,
    "_blank"
  );
};


  const filteredItems =
    filter === "all" ? items : items.filter((i) => i.type === filter);

  /* ================================
     🔥 RENDER
  ================================= */
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">

      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-gray-900 text-white flex-col shadow-xl">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold text-blue-400">Dashboard OSIS</h1>
          <p className="text-xs text-gray-400">SMK YUPENTEK 1</p>
        </div>

        <div className="p-6 flex flex-col gap-3">
          <button onClick={() => setFilter("all")} className="px-3 py-2 rounded hover:bg-blue-600">Semua</button>
          <button onClick={() => setFilter("event")} className="px-3 py-2 rounded hover:bg-blue-600">Event</button>
          <button onClick={() => setFilter("kegiatan")} className="px-3 py-2 rounded hover:bg-blue-600">Kegiatan</button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {editingId ? "✏️ Edit Data" : "📝 Tambah Data baru"}
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-xl mb-8">
          <div className="grid sm:grid-cols-2 gap-4">

            <input className="border p-2 rounded" placeholder="Judul" name="title" required value={formData.title} onChange={handleChange} />

            <select name="type" className="border p-2 rounded" value={formData.type} onChange={handleChange}>
              <option value="event">Event</option>
              <option value="kegiatan">Kegiatan</option>
            </select>

            <input type="date" className="border p-2 rounded" name="date" required value={formData.date} onChange={handleChange} />

            <input className="border p-2 rounded" placeholder="Lokasi" name="location" required value={formData.location} onChange={handleChange} />

            <textarea className="border p-2 rounded col-span-2" name="description" placeholder="Deskripsi" required value={formData.description} onChange={handleChange} />

            <input type="file" accept="image/*" name="image" onChange={handleChange} className="col-span-2" />

            {formData.image && (
              <img
                src={formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image}
                className="w-32 h-24 object-cover rounded"
              />
            )}
          </div>

          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" disabled={isUploading}>
            {editingId ? "Simpan" : "Tambah"} {isUploading && "..." }
          </button>
        </form>

        {/* LIST DATA */}
        <h2 className="text-xl font-bold mb-3 text-gray-700">📋 Data Tersimpan</h2>

        {filteredItems.length === 0 ? (
          <p className="text-gray-500">Belum ada data</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <motion.div key={item.id} className="bg-white shadow rounded-xl p-4 flex flex-col">

                <img src={item.image} className="w-full h-40 object-cover rounded mb-3" />

                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm">{item.date}</p>
                <p className="text-sm">{item.location}</p>

                <div className="mt-3 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="flex-1 bg-yellow-400 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="flex-1 bg-red-500 py-1 rounded text-white">Hapus</button>
                </div>

                <button onClick={() => shareToWhatsApp(item)} className="mt-2 bg-green-600 text-white py-2 rounded">
                  Share WhatsApp
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Toast */}
      <AnimatePresence>{toast && <Toast {...toast} onClose={() => setToast(null)} />}</AnimatePresence>
    </div>
  );
}
