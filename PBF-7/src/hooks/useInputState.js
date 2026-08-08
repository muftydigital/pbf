// useState digunakan untuk menyimpan teks yang sedang diketik.
import { useState } from 'react';

// Custom hook ini mengatur seluruh kebutuhan kolom input todo.
export default function useInputState() {
  // value menyimpan teks, sedangkan setValue mengubah isinya.
  const [value, setValue] = useState('');

  // Fungsi ini mengambil nilai terbaru setiap kali pengguna mengetik.
  const onChange = (event) => {
    // Simpan teks dari elemen input ke dalam state.
    setValue(event.target.value);
  };

  // Fungsi reset digunakan untuk mengosongkan input.
  const reset = () => {
    // Kembalikan isi state menjadi string kosong.
    setValue('');
  };

  // Kembalikan nilai dan fungsi agar dapat dipakai TodoForm.
  return {
    value,
    onChange,
    reset,
  };
}
