# PBF Pertemuan 4 — React

Proyek ini berisi praktik ulang materi pertemuan ke-4 Pemrograman Berbasis Framework. Saya menambahkan komentar pada bagian-bagian kode berdasarkan yang saya pahami.

## Materi yang dipraktikkan

1. Menangani event `onChange` dan `onClick`.
2. Membuat nama acak ketika tombol ditekan.
3. Menampilkan komponen berdasarkan kondisi.
4. Menampilkan data array menggunakan `map`.
5. Menggunakan `key` pada setiap item dalam list.
6. Mengirim data produk melalui props.
7. Menghitung dan menampilkan harga setelah diskon.

## Mencoba setiap contoh

Buka `src/App.jsx`. Hilangkan tanda komentar pada komponen yang ingin dicoba, lalu beri komentar pada komponen lainnya:

```jsx
<EventExample />
<GenerateRandomName />
<ConditionalExample isLoading={false} />
<ListKeyExample />
```

Secara default, proyek menampilkan contoh `<ListKeyExample />` seperti kode sumber awal.

## Menjalankan proyek

Klik tombol **Run** di Replit. Kalau ingin menjalankannya melalui Shell, gunakan:

```bash
npm install
npm run dev -- --host 0.0.0.0
```

File JSON tidak diberi komentar langsung karena format JSON memang tidak mendukung komentar. `package.json` berisi daftar package dan perintah untuk menjalankan proyek, sedangkan file `tsconfig` berisi pengaturan TypeScript dan JSX.

Folder `node_modules` dan `dist` tidak perlu diunggah karena bisa dibuat kembali menggunakan perintah npm.
