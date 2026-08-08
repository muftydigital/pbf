// Ambil CSS utama agar tampilan komponen ini tetap rapi.
import './App.css';
// useState dipakai untuk menyimpan nama acak yang sudah dibuat.
import { useState } from 'react';
// Library ini menyediakan kumpulan kata untuk membuat nama secara acak.
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

// Atur bentuk nama acak yang ingin dihasilkan.
const customConfig = {
  // Nama akan mengambil kata sifat, warna, dan nama hewan.
  dictionaries: [adjectives, colors, animals],
  // Setiap kata dipisahkan dengan spasi.
  separator: ' ',
  // Jumlah kata yang dipakai sebanyak tiga kata.
  length: 3,
};

// Komponen ini menjadi contoh sederhana penggunaan useState.
export default function AppState() {
  // randomName menyimpan nama, sedangkan setRandomName mengubah nilainya.
  const [randomName, setRandomName] = useState();

  // Fungsi ini dijalankan saat tombol diklik.
  function generateRandomName() {
    // Buat nama baru berdasarkan konfigurasi di atas.
    const generatedName = uniqueNamesGenerator(customConfig);
    // Simpan nama baru ke state supaya tampilannya ikut berubah.
    setRandomName(generatedName);
  }

  // Bagian berikut merupakan tampilan yang dikirim oleh komponen.
  return (
    <main>
      {/* Judul halaman latihan React Hook. */}
      <h1>Belajar React Hook</h1>
      {/* Keterangan singkat fungsi aplikasi. */}
      <p>Random Name Generator</p>

      {/* Nama baru ditampilkan kalau randomName sudah mempunyai nilai. */}
      {randomName && <h3>{randomName}</h3>}

      {/* Tombol diletakkan di tengah dan menjalankan fungsi pembuat nama. */}
      <button
        style={{ alignSelf: 'center' }}
        onClick={generateRandomName}
      >
        Generate Random Name
      </button>
    </main>
  );
}
