// components/StatCard.js
// ----------------------------------------------------------------------
// Komponen kartu kecil untuk menampilkan satu angka statistik di
// Dashboard, contoh: "Total Aset: 120". Dibuat generic (menerima props)
// supaya bisa dipakai berulang kali dengan data & warna berbeda.
// ----------------------------------------------------------------------

export default function StatCard({ label, value, icon, color = "indigo" }) {
  // Peta warna Tailwind. Ditulis eksplisit (bukan template string dinamis)
  // karena Tailwind men-scan class secara statis saat build.
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    rose: "bg-rose-50 text-rose-700 border-rose-100",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl border ${colorMap[color]}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
