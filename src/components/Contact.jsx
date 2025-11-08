import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-b from-blue-100 via-blue-50 to-white text-gray-900 overflow-hidden"
    >
      {/* Background radial lembut */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,197,253,0.2),transparent_70%)]"></div>

      <div className="relative max-w-6xl mx-auto px-6 space-y-12 z-10">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-blue-900 mb-4">
            Hubungi Kami
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Kami siap membantu menjawab pertanyaan Anda mengenai SMK YUPPENTEK 1 Tangerang.
          </p>
        </div>

        {/* Info */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-8 border border-blue-100 hover:scale-[1.03] hover:shadow-xl transition-all duration-300">
            <Phone className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
            <h4 className="font-bold text-blue-800 text-lg mb-1">Telepon</h4>
            <p className="text-gray-700">021-5524518</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-8 border border-blue-100 hover:scale-[1.03] hover:shadow-xl transition-all duration-300">
            <Mail className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
            <h4 className="font-bold text-blue-800 text-lg mb-1">Email</h4>
            <p className="text-gray-700">smkyuppentek1vtr@gmail.com</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-8 border border-blue-100 hover:scale-[1.03] hover:shadow-xl transition-all duration-300">
            <MapPin className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
            <h4 className="font-bold text-blue-800 text-lg mb-1">Alamat</h4>
            <p className="text-gray-700">
              Jl. Veteran No.1 Kel. Babakan Kec. Tangerang<br />
              Kota Tangerang, Banten 15118
            </p>
          </div>
        </div>

        {/* MAP */}
        <div className="rounded-2xl overflow-hidden shadow-md border border-blue-100 hover:shadow-xl transition-all duration-300">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d6538.627329501783!2d106.63410808605258!3d-6.189496526562202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sJl.%20Veteran%20No.1%20Kel.%20Babakan%20Kec.%20Tangerang!5e1!3m2!1sen!2sid!4v1761468373425!5m2!1sen!2sid"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
