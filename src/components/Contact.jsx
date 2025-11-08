import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-6 space-y-10">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-400">
          Hubungi Kami
        </h2>

        {/* Info */}
        <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-200">
          <div className="flex flex-col items-center">
            <Phone className="w-6 h-6 text-yellow-400 mb-2" />
            <h4 className="font-semibold">Telp</h4>
            <p>021-5524518</p>
          </div>

          <div className="flex flex-col items-center">
            <Mail className="w-6 h-6 text-yellow-400 mb-2" />
            <h4 className="font-semibold">Email</h4>
            <p>smkyuppentek1vtr@gmail.com</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <MapPin className="w-6 h-6 text-yellow-400 mb-2" />
            <h4 className="font-semibold">Alamat</h4>
            <p>
              Jl. Veteran No.1 Kel. Babakan Kec. Tangerang<br />
              Kota Tangerang, Banten 15118
            </p>
          </div>
        </div>

        {/* MAP */}
        <div className="rounded-xl overflow-hidden border border-gray-700 shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d6538.627329501783!2d106.63410808605258!3d-6.189496526562202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sJl.%20Veteran%20No.1%20Kel.%20Babakan%20Kec.%20Tangerang!5e1!3m2!1sen!2sid!4v1761468373425!5m2!1sen!2sid"
            width="100%"
            height="350"
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
