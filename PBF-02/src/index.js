// Mengimpor React agar fitur React dapat digunakan di dalam project
import React from 'react';

// Mengimpor ReactDOM untuk menampilkan komponen React ke halaman browser
import ReactDOM from 'react-dom/client';

// Mengimpor komponen utama App dari file App.js
import App from './App';

// Mengambil elemen HTML dengan id root sebagai tempat aplikasi React ditampilkan
const container = document.getElementById('root');

// Membuat root React dari elemen container yang sudah diambil sebelumnya
const root = ReactDOM.createRoot(container);

// Menampilkan komponen App ke dalam root pada halaman
root.render(
  // StrictMode membantu mendeteksi masalah pada kode saat proses development
  <React.StrictMode>
    {/* Memanggil komponen utama App agar tampil di halaman */}
    <App />
  </React.StrictMode>
);
