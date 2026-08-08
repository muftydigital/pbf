// Gunakan CSS utama untuk mengatur posisi isi halaman.
import './App.css';
// useState menyimpan data, sedangkan useEffect merespons perubahan data.
import { useEffect, useState } from 'react';
// Ambil fungsi dan kumpulan kata dari unique-names-generator.
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

// Konfigurasi ini menentukan susunan nama yang akan dibuat.
const customConfig = {
  // Kata dipilih dari kelompok kata sifat, warna, dan hewan.
  dictionaries: [adjectives, colors, animals],
  // Gunakan spasi sebagai pemisah antarkata.
  separator: ' ',
  // Hasil akhirnya terdiri dari tiga kata.
  length: 3,
};

// Komponen ini memperlihatkan penggunaan useState bersama useEffect.
export default function AppEffect() {
  // State pertama menyimpan nama acak yang terakhir dibuat.
  const [randomName, setRandomName] = useState();
  // State kedua menghitung berapa kali nama berhasil dibuat.
  const [generateCount, setGenerateCount] = useState(0);

  // Effect ini berjalan setiap kali isi randomName berubah.
  useEffect(() => {
    // Hitungan baru ditambah kalau nama memang sudah tersedia.
    if (randomName) {
      // Pakai nilai sebelumnya agar penambahan hitungan tetap aman.
      setGenerateCount((previousCount) => previousCount + 1);
    }
  }, [randomName]);

  // Fungsi berikut membuat nama ketika pengguna menekan tombol.
  function generateRandomName() {
    // Buat nama sesuai isi customConfig.
    const generatedName = uniqueNamesGenerator(customConfig);
    // Simpan hasilnya dan memicu useEffect di atas.
    setRandomName(generatedName);
  }

  // Tampilkan hasil nama beserta jumlah pembuatannya.
  return (
    <main>
      {/* Judul latihan React Hook. */}
      <h1>Belajar React Hook</h1>
      {/* Penjelasan singkat mengenai aplikasi. */}
      <p>Random Name Generator</p>

      {/* Elemen ini baru muncul setelah nama berhasil dibuat. */}
      {randomName && <h3>{randomName}</h3>}

      {/* Tombol diletakkan di tengah untuk menghasilkan nama acak berikutnya. */}
      <button
        style={{ alignSelf: 'center' }}
        onClick={generateRandomName}
      >
        Generate Random Name
      </button>

      {/* Tampilkan berapa kali nama sudah dibuat. */}
      <p>Digenerate sebanyak {generateCount} kali</p>
    </main>
  );
}
