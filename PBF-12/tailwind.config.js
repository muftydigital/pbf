// Konfigurasi Tailwind menentukan file mana yang diperiksa untuk mencari class utility.
module.exports = {
  // Semua file halaman dan komponen JavaScript/JSX ikut diperiksa.
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  // Theme bawaan sudah cukup untuk praktikum ini sehingga bagian extend belum ditambah.
  theme: {
    extend: {},
  },
  // Praktikum ini tidak membutuhkan plugin Tailwind tambahan.
  plugins: [],
}
