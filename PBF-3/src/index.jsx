// Import React supaya StrictMode bisa dipakai.
import React from 'react'
// Import ReactDOM untuk menampilkan aplikasi React ke browser.
import ReactDOM from 'react-dom/client'
// Import App yang berisi contoh JSX dasar.
import App from './App'
// Import contoh function component.
import AppFunc from './AppFunc'
// Import contoh class component.
import AppClass from './AppClass'

// Cari elemen dengan id root, lalu jadikan tempat tampilnya aplikasi React.
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode membantu memberi peringatan kalau ada masalah saat pengembangan.
  <React.StrictMode>
    {/* Saat ini yang ditampilkan AppClass. Bisa diganti App atau AppFunc untuk mencoba contoh lain. */}
    <AppClass />
  </React.StrictMode>
)
