# PBF Pertemuan 3 — React JSX dan Component

Proyek ini berisi praktik ulang materi pertemuan ke-3 Pemrograman Berbasis Framework. Saya menambahkan komentar berbahasa Indonesia pada bagian-bagian kode untuk menjelaskan fungsi yang saya pahami.

## Materi yang dipraktikkan

1. Menulis elemen antarmuka menggunakan JSX.
2. Membuat komponen menggunakan function component.
3. Membuat komponen menggunakan class component.
4. Mengirim data dari komponen induk ke komponen anak melalui props.
5. Merender aplikasi React ke elemen `root` pada halaman HTML.
6. Mengatur tampilan sederhana menggunakan CSS.

## File utama

- `src/App.jsx` berisi contoh dasar penulisan JSX.
- `src/AppFunc.jsx` berisi contoh function component dan penggunaan props.
- `src/AppClass.jsx` berisi contoh class component dan penggunaan props.
- `src/index.jsx` menjadi titik masuk aplikasi dan menentukan komponen yang ditampilkan.
- `src/App.css` berisi aturan tampilan.
- `index.html` menyediakan elemen `root` sebagai tempat aplikasi React dirender.
- `vite.config.js` berisi konfigurasi Vite dan plugin React.
- `public/favicon.svg` dan `vite.config.js.timestamp-1664574717106.mjs` merupakan file aset/hasil proses otomatis, sehingga bukan bagian utama yang perlu diubah saat mempelajari komponen.

## Mencoba setiap contoh

Buka `src/index.jsx`, lalu gunakan salah satu komponen berikut di dalam `React.StrictMode`:

```jsx
<App />
```

atau:

```jsx
<AppFunc />
```

atau:

```jsx
<AppClass />
```

Secara default, proyek menampilkan `<AppClass />` seperti materi sumber.

## Menjalankan proyek

Klik tombol **Run** di Replit. Jika perlu menjalankannya melalui Shell, gunakan:

```bash
npm install
npm run dev
```

## Catatan tentang file JSON

File seperti `package.json`, `package-lock.json`, `tsconfig.json`, dan `tsconfig.node.json` tidak bisa diberi komentar langsung karena format JSON memang tidak mendukung komentar. Berikut fungsi singkatnya:

- `package.json` menyimpan identitas proyek, daftar perintah npm, dan dependensi.
- `package-lock.json` mengunci versi pasti seluruh dependensi agar instalasi konsisten.
- `tsconfig.json` mengatur pemeriksaan TypeScript dan dukungan JSX.
- `tsconfig.node.json` mengatur pemeriksaan file konfigurasi yang berjalan pada lingkungan Node.js.

File hasil build (`dist`) dan dependensi hasil instalasi (`node_modules`) tidak perlu diunggah karena dapat dibuat kembali dari kode dan `package.json`.
