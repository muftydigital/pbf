# Catatan Konfigurasi

`package.json` sengaja tidak diberi komentar langsung karena format JSON tidak mendukung komentar. Penjelasan singkatnya:

- `dev`: menyiapkan database lalu menjalankan Next.js development pada port 5000.
- `build`: membuat Prisma Client lalu menjalankan production build Next.js. Proses build **tidak bergantung pada koneksi database eksternal**.
- `start`: menyiapkan database lokal lalu menjalankan hasil production build pada port 5000.
- `postinstall`: menjalankan `prisma generate` setelah dependency selesai di-install.
- `@prisma/client` dan `prisma`: dipakai untuk akses database.
- `react-hook-form`: dipakai untuk form dan validasi input.
- `tailwindcss`, `postcss`, dan `autoprefixer`: dipakai pada proses CSS sesuai struktur materi.

Untuk Replit, database runtime diletakkan di `/tmp/pbf12.db`. Database awal disalin dari `prisma/template.db`, jadi Publish tidak membutuhkan PostgreSQL, database eksternal, atau Secret tambahan.
