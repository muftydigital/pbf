// defineConfig membantu penulisan konfigurasi Vite agar lebih jelas.
import { defineConfig } from 'vite';
// Plugin React membuat Vite dapat memproses file JSX.
import react from '@vitejs/plugin-react';

// Ekspor konfigurasi untuk proses pengembangan dan build.
export default defineConfig({
  // Aktifkan dukungan React pada proyek Vite.
  plugins: [react()],
  // Pengaturan berikut dipakai saat server pengembangan berjalan.
  server: {
    // Izinkan server dibuka melalui jaringan Replit.
    host: '0.0.0.0',
    // Gunakan port 3000 agar sama dengan pengaturan Replit.
    port: 3000,
    // Jangan berpindah otomatis ke port yang berbeda.
    strictPort: true,
  },
  // Pengaturan berikut dipakai saat membuat versi produksi.
  build: {
    // Bersihkan hasil lama sebelum membuat isi dist yang baru.
    emptyOutDir: true,
  },
});
