# Praktikum Pertemuan 8 & 9

Project ini saya gunakan untuk mempraktikkan kembali penggunaan **React, Redux, dan Hooks** melalui contoh Todo List sederhana. Kode dasar mengacu pada materi PBF-8-9 yang ada pada repository yang diberikan, lalu saya tambahkan komentar pada bagian-bagian program sesuai pemahaman saya.

## Pemahaman yang saya dapat

Pada project ini, React dipakai untuk membagi tampilan menjadi beberapa komponen. `TodoInput` menangani proses memasukkan data, sedangkan `TodoList` menampilkan data yang sudah tersimpan. State utama todo disimpan di Redux sehingga datanya dapat dipakai oleh beberapa komponen tanpa harus dikirim melalui props satu per satu.

`useSelector` digunakan untuk membaca data dari Redux store, sementara `useDispatch` digunakan untuk mengirim action. Reducer kemudian menentukan perubahan state berdasarkan action seperti `ADD_TODO`, `TOGGLE_TODO`, dan `DELETE_TODO`.

Dari praktikum ini saya memahami bahwa alurnya secara sederhana adalah **komponen mengirim action -> reducer memproses action -> state di store berubah -> tampilan React ikut diperbarui**.

## Cara menjalankan

1. Jalankan `npm install` jika dependency belum terpasang.
2. Jalankan `npm run dev`.
3. Buka Preview di Replit.
4. Tambahkan todo, centang todo untuk menandai selesai, dan tekan `X` untuk menghapusnya.

## Catatan komentar

Komentar ditambahkan pada file source utama seperti `App.jsx`, `TodoInput.jsx`, `TodoList.jsx`, `index.jsx`, `redux.js`, `App.css`, `index.html`, dan `vite.config.js`. File JSON tetap dibuat tanpa komentar supaya formatnya tidak rusak; penjelasannya ada pada `CATATAN-KONFIGURASI.md`.
