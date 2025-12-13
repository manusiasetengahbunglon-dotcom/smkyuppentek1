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
 ===============

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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingId ? "Edit Data" : "Tambah Data"}
      </h1>

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

          <input type="file" name="image" accept="image/*" onChange={handleChange} />
        </div>

        {formData.image && (
          <img
            src={
              formData.image instanceof File
                ? URL.createObjectURL(formData.image)
                : formData.image
            }
            className="mt-3 w-40 h-28 object-cover rounded"
            alt="preview"
          />
        )}

        <button disabled={isUploading} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-60">
          {isUploading ? "Menyimpan..." : editingId ? "Update" : "Tambah"}
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow">
            <img src={item.image} className="h-40 w-full object-cover rounded mb-2" alt={item.title} />
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-sm">{item.date} • {item.location}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => {
                  setEditingId(item.id);
                  setFormData(item);
                }}
                className="flex-1 bg-yellow-400 rounded py-1"
              >
                Edit
              </button>

              <button
                onClick={() => remove(ref(db, `items/${item.id}`))}
                className="flex-1 bg-red-500 text-white rounded py-1"
              >
                Hapus
              </button>
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
