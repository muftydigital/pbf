// React digunakan untuk mengaktifkan StrictMode.
import React from 'react';
// ReactDOM memasang aplikasi React ke dalam halaman HTML.
import ReactDOM from 'react-dom/client';
// App merupakan komponen utama Todo List.
import App from './App';

// Cari elemen HTML yang memiliki id root.
const rootElement = document.getElementById('root');

// Buat root React lalu tampilkan komponen App di dalamnya.
ReactDOM.createRoot(rootElement).render(
  // StrictMode membantu menemukan masalah saat proses pengembangan.
  <React.StrictMode>
    {/* Jalankan komponen utama aplikasi. */}
    <App />
  </React.StrictMode>,
);
