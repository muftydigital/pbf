// defineConfig membantu penulisan konfigurasi Vite agar lebih jelas.
import { defineConfig } from 'vite';
// Plugin React membuat Vite dapat memproses file JSX.
import react from '@vitejs/plugin-react';

// Ekspor konfigurasi untuk proses pengembangan dan build.
export default defineConfig({
  // Aktifkan dukungan React pada proyek Vite.
  plugins: [react()],
  // Pengaturan ini digunakan saat server pengembangan dijalankan.
  server: {
    // Izinkan server diakses melalui jaringan Replit.
    host: '0.0.0.0',
    // Gunakan port 3000 agar sama dengan pengaturan Replit.
    port: 3000,
    // Jangan berpindah otomatis ke port lain.
    strictPort: true,
  },
  // Pengaturan ini digunakan saat membuat versi produksi.
  build: {
    // Bersihkan hasil lama sebelum membuat isi folder dist yang baru.
    emptyOutDir: true,
  },
});
