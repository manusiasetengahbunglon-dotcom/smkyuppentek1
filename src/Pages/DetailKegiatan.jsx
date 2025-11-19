import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { db } from "../firebase";

export default function DetailKegiatan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    const dbRef = ref(db, `items/${id}`);
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData("NOT_FOUND");
      }
    });
  }, [id]);

  if (data === null) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (data === "NOT_FOUND") {
    return (
      <div className="p-10 text-center text-xl text-red-500">
        Data tidak ditemukan!
        <button
          onClick={() => navigate("/dashboard")}
          className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 bg-gray-100 text-gray-900">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Kembali
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-md max-w-4xl mx-auto">
        <img
          src={data.image}
          alt="Kegiatan"
          className="rounded-xl w-full mb-6 shadow"
        />
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <p className="text-lg leading-relaxed">{data.description}</p>
      </div>
    </div>
  );
}
