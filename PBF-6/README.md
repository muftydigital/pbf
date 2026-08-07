# PBF Pertemuan 6

Praktikum ini membahas cara mengambil data API menggunakan Axios dan membuat perpindahan halaman menggunakan React Router. Komentar pada kode ditulis berdasarkan pemahaman saya agar setiap bagian lebih mudah dipelajari kembali.

## Isi Praktikum

- `App.jsx` mengambil data foto dari JSONPlaceholder menggunakan Axios.
- `PhotoList` mengubah data API menjadi kumpulan kartu foto.
- `AppRouter.jsx` mengatur menu Beranda, Berita, Tentang, dan Profile menggunakan `Switch` serta `Route`.
- Halaman Profile mempunyai rute turunan untuk CV dan Contacts.
- `index.jsx` menentukan contoh praktikum yang sedang ditampilkan.
- `scripts/clean-dist.js` membersihkan hasil lama sebelum proses build dijalankan.

Pada kondisi awal, aplikasi menampilkan contoh React Router. Untuk mencoba contoh API, komponen pada `src/index.jsx` dapat diganti dari `AppRouter` menjadi `App`.

## Menjalankan Proyek

```bash
npm install
npm run dev
```

Untuk membuat dan menjalankan versi produksi:

```bash
npm run build
npm run start
```

Proyek sudah dilengkapi `.replit`, `server.js`, dan hasil build di folder `dist` agar dapat dijalankan serta dipublikasikan melalui Replit pada port 3000.
