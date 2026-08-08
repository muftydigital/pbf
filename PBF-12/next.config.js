// Tipe NextConfig membantu editor mengenali pilihan konfigurasi Next.js.
/** @type {import('next').NextConfig} */
// Konfigurasi ini dibuat sederhana supaya project praktikum stabil saat development maupun production build.
const nextConfig = {
  // Strict Mode membantu mendeteksi pola React yang kurang aman ketika development.
  reactStrictMode: true,
  // Pemeriksaan ESLint tetap bisa dilakukan manual, tetapi tidak dibuat sebagai penyebab deployment gagal saat build.
  eslint: {
    ignoreDuringBuilds: true,
  },
}

// Object konfigurasi diekspor supaya otomatis dibaca oleh Next.js.
module.exports = nextConfig
