// React digunakan untuk mengaktifkan StrictMode saat pengembangan.
import React from 'react';
// ReactDOM memasang komponen React ke elemen root pada HTML.
import ReactDOM from 'react-dom/client';
// App berisi contoh mengambil dan menampilkan data dari API.
import App from './App';
// AppRouter berisi contoh perpindahan halaman dengan React Router.
import AppRouter from './AppRouter';

// Cari elemen HTML yang mempunyai id root.
const rootElement = document.getElementById('root');

// Buat root React lalu tampilkan aplikasi di dalamnya.
ReactDOM.createRoot(rootElement).render(
  // StrictMode membantu menemukan masalah saat proses pengembangan.
  <React.StrictMode>
    {/* Komponen yang aktif saat ini adalah latihan React Router. */}
    <AppRouter />

    {/* Ganti AppRouter dengan App untuk mencoba latihan API. */}
    {/* <App /> */}
  </React.StrictMode>,
);
