// useState diperlukan untuk menyimpan isi dari sebuah input.
import { useState } from 'react';

// Custom hook ini menerima nilai awal untuk input.
export default function useInput(initialValue) {
  // value berisi teks input, sedangkan setValue dipakai untuk mengubahnya.
  const [value, setValue] = useState(initialValue);

  // Fungsi reset mengembalikan isi input ke nilai awal.
  const reset = () => {
    // Masukkan kembali initialValue ke dalam state.
    setValue(initialValue);
  };

  // Objek bind berisi atribut yang nantinya dipasang pada elemen input.
  const bind = {
    // Tampilkan isi state sebagai nilai input.
    value,
    // Perbarui state setiap kali pengguna mengetik.
    onChange: (event) => {
      // Ambil teks terbaru dari input yang sedang digunakan.
      setValue(event.target.value);
    },
  };

  // Kembalikan nilai, atribut pengikat, dan fungsi reset untuk komponen pemakai.
  return [value, bind, reset];
}
