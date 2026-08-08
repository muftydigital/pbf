// React dibutuhkan untuk menjalankan komponen dan StrictMode.
import React from 'react'
// ReactDOM digunakan untuk memasang aplikasi React ke elemen HTML dengan id root.
import ReactDOM from 'react-dom/client'
// App adalah komponen utama yang akan ditampilkan.
import App from './App'
// Provider membuat Redux store dapat diakses oleh komponen React di dalamnya.
import { Provider } from "react-redux";
// store diambil dari file redux sebagai tempat penyimpanan state aplikasi.
import { store } from "./redux";

// createRoot memilih elemen root dari index.html lalu merender aplikasi React ke dalamnya.
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode membantu menemukan masalah pada kode saat proses pengembangan.
  <React.StrictMode>
    {/* Provider menghubungkan seluruh komponen di App dengan Redux store. */}
    <Provider store={store}>
      {/* App menjadi komponen utama yang dijalankan. */}
      <App />
    </Provider>
  </React.StrictMode>
)
