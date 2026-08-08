// Import React supaya fitur React bisa dipakai.
import React from 'react'
// ReactDOM dipakai untuk menampilkan aplikasi ke halaman browser.
import ReactDOM from 'react-dom/client'
// Import komponen utama dari file App.jsx.
import App from './App'

// Cari elemen dengan id root, lalu tampilkan aplikasi React di dalamnya.
ReactDOM.createRoot(document.getElementById('root')).render(
	// StrictMode membantu memberi peringatan kalau ada masalah saat pengembangan.
	<React.StrictMode>
		{/* Panggil komponen App sebagai tampilan utama. */}
		<App />
	</React.StrictMode>
)
