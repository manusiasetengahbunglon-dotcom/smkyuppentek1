export default function Clients() {
  const logos = [
    "/assets/client-1.png",
    "/assets/client-2.png",
    "/assets/client-3.png",
    "/assets/client-4.png",
  ];
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h4 className="text-xl font-semibold text-gray-700 mb-6">Mitra & Sponsor</h4>
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {logos.map((l, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <img src={l} alt={`client-${i}`} className="h-10 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
