# AssetKu — Aplikasi Manajemen Inventaris Barang

AssetKu adalah aplikasi web sederhana untuk mencatat dan mengelola inventaris barang. Project ini dibuat untuk memenuhi tugas UAS dengan ketentuan Next.js, React Hooks, Redux, Prisma ORM, dan database SQLite.

## Fitur

- Dashboard ringkasan inventaris.
- CRUD data aset: tambah, lihat, ubah, dan hapus.
- CRUD kategori barang.
- Pencarian dan filter aset.
- Informasi stok, kondisi, lokasi, harga, dan tanggal perolehan.
- Redux Toolkit untuk state global.
- React Hooks untuk pengelolaan state dan proses data pada komponen.
- Prisma ORM dengan SQLite.
- Halaman `/about` untuk menyematkan video demo UAS dari YouTube.

## Menjalankan Project

Project membutuhkan Node.js 20.9 atau yang lebih baru.

```bash
npm install
npm run dev
```

Saat `npm run dev` dijalankan, script `prepare-db` otomatis menyinkronkan schema Prisma. Jika database masih kosong, data contoh akan dimasukkan otomatis. Setelah itu aplikasi dapat dibuka pada port 3000.

## Script Penting

```bash
npm run dev       # menyiapkan database lalu menjalankan Next.js development server
npm run build     # membuat production build
npm run start     # menyiapkan database lalu menjalankan production server
npm run db:push   # menyinkronkan schema Prisma ke SQLite
npm run db:seed   # mengisi ulang data contoh
npm run db:studio # membuka Prisma Studio
```

## CodeSandbox

Project sudah disiapkan untuk di-import dari GitHub ke CodeSandbox sebagai project Node/Devbox. `sandbox.config.json` menggunakan Node.js 22 dan port 3000 agar kompatibel dengan Next.js 16.

Setelah repository di-import, tunggu proses instalasi dependency dan jalankan `npm run dev` bila task development belum berjalan otomatis.

## Video UAS

Setelah video demo maksimal 5 menit diunggah ke YouTube, buka `pages/about.js` lalu isi konstanta `VIDEO_EMBED_URL` dengan URL embed YouTube, misalnya:

```js
const VIDEO_EMBED_URL = "https://www.youtube.com/embed/ID_VIDEO";
```

Jangan gunakan link `watch?v=` langsung pada `iframe`; gunakan format `/embed/ID_VIDEO`.
