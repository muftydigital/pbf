// CSS global saya panggil di sini supaya semua halaman memakai tampilan yang sama.
import '../styles/globals.css'

// MyApp adalah pembungkus utama semua halaman pada Next.js versi pages router.
export default function MyApp({ Component, pageProps }) {
  // Component berisi halaman yang sedang dibuka, sedangkan pageProps berisi data untuk halaman tersebut.
  return <Component {...pageProps} />
}
