# PBF Pertemuan 7

Praktikum ini membahas pembuatan aplikasi Todo List menggunakan React, custom hook, dan komponen Material UI. Komentar pada kode ditulis berdasarkan pemahaman saya agar fungsi setiap bagian lebih mudah dipelajari kembali.

## Isi Praktikum

- `App.jsx` menggabungkan formulir dan daftar todo.
- `TodoForm.jsx` menerima teks todo dari pengguna.
- `TodoList.jsx` menampilkan todo menggunakan komponen Material UI.
- `useInputState.js` mengatur nilai dan reset kolom input.
- `useTodoState.js` menyimpan, menambahkan, dan menghapus todo.
- `scripts/clean-dist.js` membersihkan hasil lama sebelum build dijalankan.

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

Proyek sudah dilengkapi `.replit`, `server.js`, dan hasil build di folder `dist` agar dapat langsung dijalankan serta dipublikasikan melalui Replit pada port 3000.
