// Mengambil file CSS global supaya gaya dasar berlaku di semua halaman.
import '../styles/globals.css'

// Fungsi MyApp ini menjadi pembungkus utama untuk setiap halaman Next.js.
function MyApp({ Component, pageProps }) {
  // Component adalah halaman yang sedang dibuka, sedangkan pageProps berisi data untuk halaman tersebut.
  return <Component {...pageProps} />
}

// Mengekspor MyApp agar bisa dipakai otomatis oleh Next.js.
export default MyApp
