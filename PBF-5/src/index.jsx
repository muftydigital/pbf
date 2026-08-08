// React digunakan untuk mengaktifkan StrictMode saat proses pengembangan.
import React from 'react';
// ReactDOM memasang komponen React ke halaman HTML.
import ReactDOM from 'react-dom/client';
// Contoh komponen untuk latihan useState.
import AppState from './AppState';
// Contoh komponen untuk latihan useEffect.
import AppEffect from './AppEffect';
// Contoh komponen yang memakai custom hook.
import AppCustomHook from './AppCustomHook';

// Cari elemen HTML yang memiliki id root.
const rootElement = document.getElementById('root');

// Buat root React lalu tampilkan aplikasi di dalamnya.
ReactDOM.createRoot(rootElement).render(
  // StrictMode membantu menemukan masalah saat aplikasi dikembangkan.
  <React.StrictMode>
    {/* Komponen yang diaktifkan saat ini adalah materi custom hook. */}
    <AppCustomHook />

    {/* Ganti komponen di atas dengan AppState untuk mencoba useState. */}
    {/* <AppState /> */}

    {/* Ganti komponen di atas dengan AppEffect untuk mencoba useEffect. */}
    {/* <AppEffect /> */}
  </React.StrictMode>,
);
