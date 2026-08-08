// defineConfig membantu penulisan konfigurasi Vite agar lebih jelas.
import { defineConfig } from 'vite';
// Plugin React membuat Vite dapat memproses React dan JSX.
import react from '@vitejs/plugin-react';

// Konfigurasi utama Vite diekspor agar dipakai saat project dijalankan.
export default defineConfig({
  // Plugin React diaktifkan pada project ini.
  plugins: [react()],
  // Bagian server mengatur server development Vite.
  server: {
    // Host 0.0.0.0 diperlukan supaya server dapat diakses dari preview Replit.
    host: '0.0.0.0',
  }
})
