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
  const [filter, setFilter] = useState("all");

  const imgbbKey = "47cfc4db6ef42daf9655c9c014f574f8";

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
     LOAD DATA REALTIME
  ================================ */
  useEffect(() => {
    const dbRef = ref(db, "items");

    const unsub = onValue(dbRef, (snap) => {
      const data = snap.val();
      if (!data) {
        setItems([]);
        return;
      }

      const arr = Object.entries(data)
        .map(([id, val]) => ({ id, ...val }))
        .sort((a, b) => b.timestamp - a.timestamp);

      setItems(arr);
    });

    return () => unsub();
  }, []);

  /* ================================
     UPLOAD IMAGE
  ================================ */
  const uploadImage = async (file) => {
    try {
      const form = new FormData();
      form.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        { method: "POST", body: form }
      );

      const json = await res.json();
      if (!json.success) throw new Error("Upload failed");

      return json.data.url;
    } catch (err) {
      console.error(err);
      setToast({ message: "❌ Upload gambar gagal", type: "error" });
      return "";
    }
  };

  /* ================================
     INPUT HANDLER
  ================================ */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files?.[0]) {
      if (files[0].size > 5 * 1024 * 1024) {
        setToast({ message: "❌ Maksimal 5MB", type: "error" });
        return;
      }
      setFormData((p) => ({ ...p, image: files[0] }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  /* ================================
     SUBMIT (ADD / EDIT)
  ================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = "";

      // ✔ edit tanpa upload gambar baru
      if (editingId && typeof formData.image === "string") {
        imageUrl = formData.image;
      }

      // ✔ upload jika file baru
      if (formData.image instanceof File) {
        imageUrl = await uploadImage(formData.image);
        if (!imageUrl) throw new Error("Upload error");
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
     EDIT & DELETE
  ================================ */
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

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus data?")) return;
    await remove(ref(db, `items/${id}`));
    setToast({ message: "🗑️ Data dihapus" });
  };

  /* ================================
     SHARE WHATSAPP
  ================================ */
 const shareToWhatsApp = (item) => {
  const text =
`📌 *${item.title}*

Halo teman-teman 👋  
Kami mengundang kalian untuk mengikuti kegiatan berikut:

Tanggal: ${item.date}
Lokasi: ${item.location}

Keterangan:
${item.description}

Yuk jangan sampai ketinggalan!

Poster kegiatan:
${item.image}`;

  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
};



  const filtered =
    filter === "all" ? items : items.filter((i) => i.type === filter);

  /* ================================
     RENDER
  ================================ */
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingId ? "✏️ Edit Data" : "📝 Tambah Data"}
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input className="border p-2 rounded" name="title" placeholder="Judul" required value={formData.title} onChange={handleChange} />
          <select className="border p-2 rounded" name="type" value={formData.type} onChange={handleChange}>
            <option value="event">Event</option>
            <option value="kegiatan">Kegiatan</option>
          </select>
          <input type="date" className="border p-2 rounded" name="date" required value={formData.date} onChange={handleChange} />
          <input className="border p-2 rounded" name="location" placeholder="Lokasi" required value={formData.location} onChange={handleChange} />
          <textarea className="border p-2 rounded md:col-span-2" name="description" placeholder="Deskripsi" required value={formData.description} onChange={handleChange} />
          <input type="file" name="image" accept="image/*" />
        </div>

        {formData.image && (
          <img
            src={formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image}
            className="mt-3 w-32 h-24 object-cover rounded"
          />
        )}

        <button disabled={isUploading} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">
          {isUploading ? "Menyimpan..." : editingId ? "Update" : "Tambah"}
        </button>
      </form>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow">
            <img src={item.image} className="h-40 w-full object-cover rounded mb-2" />
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-sm">{item.date} • {item.location}</p>

            <div className="flex gap-2 mt-3">
              <button onClick={() => handleEdit(item)} className="flex-1 bg-yellow-400 rounded py-1">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="flex-1 bg-red-500 text-white rounded py-1">Hapus</button>
            </div>

            <button onClick={() => shareToWhatsApp(item)} className="mt-2 bg-green-600 text-white w-full py-2 rounded">
              Share WhatsApp
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
