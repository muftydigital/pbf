// Import defineConfig untuk membuat konfigurasi Vite.
import { defineConfig } from 'vite';
// Import plugin React supaya Vite bisa membaca JSX.
import react from '@vitejs/plugin-react';

// Konfigurasi yang dipakai saat Vite dijalankan.
export default defineConfig({
  // Aktifkan plugin React.
  plugins: [react()],
  // Pengaturan server untuk npm run dev.
  server: {
    // 0.0.0.0 supaya halaman bisa dibuka lewat preview Replit.
    host: '0.0.0.0',
  }
})
