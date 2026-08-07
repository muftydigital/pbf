// Import defineConfig untuk membuat konfigurasi Vite.
import { defineConfig } from 'vite';
// Import plugin React supaya Vite bisa membaca JSX.
import react from '@vitejs/plugin-react';

// Konfigurasi yang dipakai oleh Vite.
export default defineConfig({
  // Aktifkan plugin React.
  plugins: [react()],
  // Pengaturan server saat proyek dijalankan.
  server: {
    // 0.0.0.0 supaya halaman bisa dibuka melalui preview Replit.
    host: '0.0.0.0',
  }
})
