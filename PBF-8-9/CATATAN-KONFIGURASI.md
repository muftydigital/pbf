# Catatan File Konfigurasi

Saya tidak menambahkan komentar langsung ke `package.json`, `tsconfig.json`, dan `tsconfig.node.json` karena format JSON standar tidak menerima komentar dan bisa membuat project gagal dijalankan. Penjelasannya saya tulis di sini supaya file konfigurasi tetap valid.

## package.json
- `name`: nama project.
- `version`: versi project.
- `type: module`: membuat JavaScript memakai sistem ES Module (`import` dan `export`).
- `scripts.dev`: menjalankan server development Vite.
- `scripts.build`: membuat hasil build production.
- `scripts.preview`: melihat hasil build secara lokal.
- `dependencies`: library yang dipakai aplikasi, yaitu React, React DOM, React Redux, Redux, dan UUID.
- `devDependencies`: alat bantu development berupa Vite dan plugin React.

## tsconfig.json
File ini berisi pengaturan TypeScript/JSX untuk editor dan proses development. Walaupun source utama memakai `.jsx`, konfigurasi ini membantu tooling mengenali sintaks JSX dan module yang digunakan.

## tsconfig.node.json
File ini berisi konfigurasi yang berkaitan dengan file konfigurasi Vite pada lingkungan Node.js.

## .replit
File ini khusus untuk versi Replit. Perintah `run` menjalankan Vite pada port 5000 agar Preview Replit dapat membukanya dengan stabil.
