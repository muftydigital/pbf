# PBF Pertemuan 5

Praktikum ini membahas penggunaan React Hook, yaitu `useState`, `useEffect`, dan custom hook. Komentar pada kode ditulis berdasarkan pemahaman saya supaya fungsi setiap bagian lebih mudah dipelajari kembali.

## Isi Praktikum

- `AppState.jsx` berisi contoh penggunaan `useState` untuk menyimpan nama acak.
- `AppEffect.jsx` berisi contoh `useEffect` untuk menghitung berapa kali nama dibuat.
- `AppCustomHook.jsx` menampilkan formulir yang menggunakan custom hook.
- `useInput.js` berisi custom hook untuk menangani nilai input dan fungsi reset.
- `UserForm.jsx` menggunakan `useInput` pada kolom nama depan dan nama belakang.

Komponen yang sedang ditampilkan dapat dipilih melalui file `src/index.jsx`. Pada kondisi awal, aplikasi menampilkan contoh custom hook.

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

Pada Replit, proyek sudah dilengkapi file `.replit`, `server.js`, dan folder `dist` supaya dapat langsung dijalankan pada port 3000.
