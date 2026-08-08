// Pakai style yang ada di App.css.
import './App.css'

// Komponen App ini dipakai untuk contoh penulisan JSX dasar.
export default function App() {
  // JSX juga bisa disimpan ke dalam variabel seperti nilai JavaScript biasa.
  // Variabel ini cuma contoh, jadi belum dipanggil di bagian return.
  const element = <h1>Hello, world</h1>;

  // Bagian ini adalah tampilan yang dikembalikan oleh komponen App.
  return (
    // main menjadi pembungkus utama.
    <main>
      {/* Judul materi JSX. */}
      <h2>Belajar menggunakan JSX pada React</h2>
      {/* header dipakai untuk mengelompokkan judul dan keterangannya. */}
      <header>
        {/* Judul utama halaman. */}
        <h1>Belajar menggunakan JSX pada React</h1>
        {/* Keterangan singkat isi tutorial. */}
        <p>Tutorial Reactjs untuk Pemula</p>
      </header>
    </main>
  )
}
