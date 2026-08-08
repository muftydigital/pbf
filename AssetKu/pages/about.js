// pages/about.js
// ----------------------------------------------------------------------
// Halaman "Tentang" ("/about"). Berisi penjelasan singkat tentang
// aplikasi AssetKu, teknologi yang digunakan, daftar fitur unggulan,
// serta tempat untuk menyematkan video demonstrasi UAS dari YouTube.
// ----------------------------------------------------------------------

// Setelah video UAS selesai diunggah ke YouTube, isi bagian ini dengan
// URL embed, contoh: "https://www.youtube.com/embed/AbCdEf12345".
// Sengaja dikosongkan dulu agar tidak menampilkan video tugas lain.
const VIDEO_EMBED_URL = "";

const TECH_STACK = [
  {
    name: "Next.js",
    desc: "Menangani routing antar halaman sekaligus API routes sebagai layer backend aplikasi.",
  },
  {
    name: "React Hooks",
    desc: "useState, useEffect, useMemo, serta custom hook useDebounce untuk logika antarmuka yang efisien.",
  },
  {
    name: "Redux Toolkit",
    desc: "Mengelola state global secara terpusat untuk data aset, kategori, dan interaksi antarmuka.",
  },
  {
    name: "Prisma ORM",
    desc: "Mengakses database secara aman dan terstruktur tanpa perlu menulis query SQL secara manual.",
  },
  {
    name: "SQLite",
    desc: "Basis data ringan berbasis file yang digunakan untuk menyimpan data inventaris pada tugas ini.",
  },
  {
    name: "Tailwind CSS",
    desc: "Membangun tampilan antarmuka yang rapi dan konsisten secara efisien.",
  },
];

const FEATURES = [
  "Dashboard ringkasan yang menampilkan total unit aset, total nilai aset, jumlah kategori, serta aset yang perlu perhatian.",
  "Manajemen aset lengkap (tambah, lihat, ubah, hapus) dengan kode aset yang dibuat secara otomatis.",
  "Pencarian aset secara real-time berdasarkan nama, kode, atau lokasi penyimpanan.",
  "Filter aset berdasarkan kategori dan kondisi barang.",
  "Manajemen kategori barang dengan validasi agar kategori yang masih memiliki aset tidak dapat dihapus.",
  "Notifikasi umpan balik untuk setiap aksi yang dilakukan pengguna.",
  "Tampilan responsif yang nyaman digunakan melalui desktop maupun perangkat mobile.",
];

export default function AboutPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Tentang AssetKu</h1>
        <p className="text-slate-500 text-sm mt-1">
          AssetKu adalah aplikasi manajemen inventaris barang yang membantu proses pencatatan,
          pemantauan, dan pengelolaan aset agar lebih rapi dan terpusat.
        </p>
      </div>

      {/* Bagian video digunakan sebagai evidence/demo tugas UAS. */}
      <section>
        <h2 className="font-semibold text-slate-800 mb-3">Video Demonstrasi Aplikasi</h2>
        {VIDEO_EMBED_URL ? (
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-sm border border-slate-100">
            <iframe
              src={VIDEO_EMBED_URL}
              title="Video Demonstrasi AssetKu"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="aspect-video w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-center p-6">
            <div>
              <p className="font-medium text-slate-700">Video UAS belum disematkan</p>
              <p className="text-sm text-slate-500 mt-1">
                Setelah video diunggah ke YouTube, masukkan URL embed pada VIDEO_EMBED_URL di pages/about.js.
              </p>
            </div>
          </div>
        )}
        <p className="text-xs text-slate-400 mt-2">
          Video menjelaskan fitur utama AssetKu sekaligus demonstrasi penggunaan aplikasinya.
        </p>
      </section>

      {/* Daftar teknologi yang digunakan sesuai ketentuan tugas. */}
      <section>
        <h2 className="font-semibold text-slate-800 mb-3">Teknologi yang Digunakan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className="bg-white rounded-lg border border-slate-100 shadow-sm p-4"
            >
              <p className="font-medium text-indigo-700">{tech.name}</p>
              <p className="text-sm text-slate-500 mt-1">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Daftar fitur utama aplikasi. */}
      <section>
        <h2 className="font-semibold text-slate-800 mb-3">Fitur Utama</h2>
        <ul className="space-y-2">
          {FEATURES.map((feature, index) => (
            <li key={index} className="flex gap-3 text-sm text-slate-600">
              <span className="text-indigo-500 font-bold">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
