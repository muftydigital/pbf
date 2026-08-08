// lib/format.js
// ----------------------------------------------------------------------
// Kumpulan fungsi bantu (helper) untuk memformat data agar mudah dibaca
// di tampilan, seperti format Rupiah dan format tanggal Indonesia.
// Dipisah ke file sendiri supaya bisa dipakai ulang (reusable) di banyak
// komponen tanpa duplikasi kode.
// ----------------------------------------------------------------------

// Mengubah angka menjadi format mata uang Rupiah, contoh: 1500000 -> "Rp1.500.000"
export function formatRupiah(value) {
  const number = Number(value) || 0;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}

// Mengubah string tanggal ISO menjadi format tanggal Indonesia, contoh:
// "2026-08-08" -> "8 Agustus 2026"
export function formatTanggal(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// Mengubah string tanggal menjadi format "YYYY-MM-DD" yang dibutuhkan
// oleh elemen <input type="date">
export function toDateInputValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}
