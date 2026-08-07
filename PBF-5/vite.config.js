// defineConfig membantu penulisan konfigurasi Vite agar lebih jelas.
import { defineConfig } from 'vite';
// Plugin React membuat Vite dapat membaca JSX dan fitur React.
import react from '@vitejs/plugin-react';

// Ekspor pengaturan yang dipakai saat aplikasi dijalankan dan dibangun.
export default defineConfig({
  // Aktifkan dukungan React di dalam proyek Vite.
  plugins: [react()],
  // Pengaturan berikut dipakai oleh server pengembangan.
  server: {
    // Izinkan server dibuka melalui jaringan Replit.
    host: '0.0.0.0',
    // Gunakan port 3000 agar sama dengan konfigurasi Replit.
    port: 3000,
    // Jangan berpindah ke port lain kalau port 3000 sedang dipakai.
    strictPort: true,
  },
  // Pengaturan berikut digunakan saat membuat versi produksi.
  build: {
    // Bersihkan hasil build lama supaya folder dist tidak berisi file sisa.
    emptyOutDir: true,
  },
});
