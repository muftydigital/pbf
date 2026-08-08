# Praktikum PBF Pertemuan 10 & 11

Project ini merupakan praktik kembali materi pertemuan 10 dan 11 menggunakan **Next.js**. Fokus yang saya pahami dari praktikum ini adalah perbedaan pengambilan data dari sisi server dan sisi client.

- **Demo 1 (`/demo1`)** menggunakan `getServerSideProps()` untuk mengambil data sebelum halaman dikirim ke browser.
- **Demo 2 (`/demo2`)** menggunakan `useEffect()` dan `fetch()` untuk mengambil data setelah halaman tampil. Data tersebut melewati API route Next.js pada `/api/get-comment`.
- **API route** menggunakan Axios untuk mengambil contoh data komentar dari JSONPlaceholder.

Kode utama sudah diberi komentar menggunakan bahasa sederhana sesuai pemahaman saya saat mempelajari kembali alur program.

## Menjalankan project

```bash
npm install
npm run dev
```

Pada paket Replit, server development sudah disiapkan agar berjalan pada host `0.0.0.0` dan port `5000` supaya Preview dapat terbaca dengan benar.
