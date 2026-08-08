// Head dipakai untuk mengatur informasi di bagian head HTML seperti judul halaman.
import Head from 'next/head'
// Image adalah komponen bawaan Next.js untuk menampilkan gambar dengan lebih teratur.
import Image from 'next/image'
// File CSS Module ini dipakai khusus untuk mengatur tampilan halaman utama.
import styles from '../styles/Home.module.css'

// Home merupakan komponen utama yang tampil saat pengguna membuka alamat root website.
const Home = () => {
  // Return berisi susunan tampilan halaman utama menggunakan JSX.
  return (
    // Container menjadi pembungkus seluruh isi halaman utama.
    <div className={styles.container}>
      {/* Head tidak tampil sebagai konten, tetapi mengatur metadata halaman pada browser. */}
      <Head>
        {/* Title menentukan teks yang muncul pada tab browser. */}
        <title>Praktikum PBF 10-11</title>
        {/* Meta description memberi penjelasan singkat mengenai isi halaman. */}
        <meta name="description" content="Praktikum PBF pertemuan 10 dan 11" />
        {/* Favicon digunakan sebagai ikon kecil pada tab browser. */}
        <link rel="icon" href="/favicon.svg" />
      {/* Menutup bagian Head. */}
      </Head>

      {/* Main merupakan bagian utama dari halaman. */}
      <main className={styles.main}>
        {/* Judul utama memberi informasi sederhana tentang halaman praktikum. */}
        <h1 className={styles.title}>
          {/* Teks ini menjadi judul yang terlihat oleh pengguna. */}
          Praktikum PBF Pertemuan 10 &amp; 11
        {/* Menutup judul utama. */}
        </h1>
        {/* Grid dipakai untuk menata beberapa kartu menu agar lebih rapi. */}
        <div className={styles.grid}>
          {/* Link ini membuka Demo 1 yang mengambil data dari sisi server. */}
          <a href="/demo1" className={styles.card}>
            {/* Nama menu untuk Demo 1. */}
            <h2>Demo 1 &rarr;</h2>
            {/* Keterangan singkat bahwa data diambil dari sisi server. */}
            <p>Fetch data from server.</p>
          {/* Menutup kartu Demo 1. */}
          </a>

          {/* Link ini membuka Demo 2 yang mengambil data setelah halaman tampil di browser. */}
          <a href="/demo2" className={styles.card}>
            {/* Nama menu untuk Demo 2. */}
            <h2>Demo 2 &rarr;</h2>
            {/* Keterangan singkat bahwa proses fetch dilakukan dari sisi client. */}
            <p>Fetch data from client.</p>
          {/* Menutup kartu Demo 2. */}
          </a>

          {/* Kartu ini mengarah ke dokumentasi Next.js sebagai bahan tambahan untuk belajar. */}
          <a href="https://nextjs.org/docs" className={styles.card} target="_blank" rel="noopener noreferrer">
            {/* Judul kartu dokumentasi. */}
            <h2>Next.js Docs &rarr;</h2>
            {/* Teks penjelasan untuk kartu dokumentasi. */}
            <p>Dokumentasi Next.js.</p>
          {/* Menutup kartu dokumentasi. */}
          </a>
        {/* Menutup grid yang berisi seluruh menu. */}
        </div>
      {/* Menutup bagian main. */}
      </main>

      {/* Footer menjadi bagian penutup di bawah halaman. */}
      <footer className={styles.footer}>
        {/* Link ini hanya digunakan sebagai penanda bahwa project dijalankan melalui Replit. */}
        <a href="https://replit.com" target="_blank" rel="noopener noreferrer">
          {/* Teks awal pada footer. */}
          Built on
          {/* Span membungkus logo agar ukuran dan jaraknya bisa diatur lewat CSS. */}
          <span className={styles.logo}>
            {/* Image menampilkan logo sederhana dari folder public. */}
            <Image src="/replit.svg" alt="Replit Logo" width={20} height={18} />
          {/* Menutup pembungkus logo. */}
          </span>
          {/* Teks ini melengkapi tulisan pada footer. */}
          Replit
        {/* Menutup link footer. */}
        </a>
      {/* Menutup bagian footer. */}
      </footer>
    {/* Menutup container utama. */}
    </div>
  // Menutup bagian return.
  )
// Menutup fungsi komponen Home.
}

// Mengekspor Home agar dikenali Next.js sebagai halaman index.
export default Home
