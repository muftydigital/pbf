// hooks/useDebounce.js
// ----------------------------------------------------------------------
// Custom React Hook untuk melakukan "debounce" terhadap sebuah nilai.
// Debounce berarti nilai baru hanya akan dipakai/di-update setelah
// pengguna berhenti mengetik selama `delay` milidetik. Ini mencegah
// aplikasi mengirim request pencarian ke server di SETIAP ketukan
// keyboard (yang boros dan bisa membuat UI terasa lambat).
//
// Contoh pemakaian:
//   const debouncedSearch = useDebounce(searchTerm, 400);
// ----------------------------------------------------------------------

import { useEffect, useState } from "react";

export function useDebounce(value, delay = 400) {
  // debouncedValue adalah nilai yang sudah "ditunda" dan akan dipakai
  // oleh komponen pemanggil (misalnya untuk trigger pencarian API)
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Setiap kali `value` berubah, atur ulang timer.
    // Timer ini akan mengupdate debouncedValue setelah `delay` ms
    // TANPA ada perubahan nilai lagi di antara waktu tersebut.
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Fungsi cleanup: dijalankan setiap kali `value` berubah lagi
    // sebelum delay selesai, sehingga timer sebelumnya dibatalkan.
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
