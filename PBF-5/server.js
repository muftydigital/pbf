// Gunakan server HTTP bawaan Node.js untuk menampilkan hasil build React.
import { createServer } from 'node:http';
// readFile membaca isi file, sedangkan stat memeriksa jenis path.
import { readFile, stat } from 'node:fs/promises';
// Fungsi path membantu mencari file di dalam folder dist dengan aman.
import { extname, join, relative } from 'node:path';
// Ubah alamat file module menjadi lokasi folder yang dapat dibaca Node.js.
import { fileURLToPath } from 'node:url';

// Tentukan lokasi folder dist yang berisi hasil build dari Vite.
const distFolder = fileURLToPath(new URL('./dist/', import.meta.url));
// Gunakan port 3000 sesuai pengaturan port di file .replit.
const port = 3000;

// Daftar ini menentukan tipe konten yang dikirim kepada browser.
const contentTypes = {
  // File HTML dibaca sebagai halaman web dengan karakter UTF-8.
  '.html': 'text/html; charset=utf-8',
  // File JavaScript dibaca sebagai script oleh browser.
  '.js': 'text/javascript; charset=utf-8',
  // File CSS dibaca sebagai aturan tampilan.
  '.css': 'text/css; charset=utf-8',
  // File SVG dibaca sebagai gambar vektor.
  '.svg': 'image/svg+xml',
  // File JSON dibaca sebagai data berformat JSON.
  '.json': 'application/json; charset=utf-8',
};

// Buat server yang menangani permintaan dari browser.
const server = createServer(async (request, response) => {
  try {
    // Ambil bagian path dari alamat yang sedang dibuka.
    const pathname = new URL(request.url || '/', 'http://localhost').pathname;
    // Saat halaman utama dibuka, arahkan permintaan ke index.html.
    const requestedFile = pathname === '/' ? 'index.html' : pathname.slice(1);
    // Gabungkan lokasi dist dengan nama file yang diminta.
    let filePath = join(distFolder, requestedFile);

    // Tolak permintaan yang mencoba keluar dari folder dist.
    if (relative(distFolder, filePath).startsWith('..')) {
      throw new Error('Path tidak valid');
    }

    try {
      // Periksa apakah path yang ditemukan merupakan sebuah folder.
      const fileInfo = await stat(filePath);
      // Kalau berupa folder, cari index.html di dalam folder tersebut.
      if (fileInfo.isDirectory()) {
        filePath = join(filePath, 'index.html');
      }
    } catch {
      // Kalau file tidak ada, kembali ke halaman utama aplikasi React.
      filePath = join(distFolder, 'index.html');
    }

    // Baca isi file yang akan diberikan kepada browser.
    const fileContent = await readFile(filePath);
    // Tentukan tipe file dari ekstensi atau gunakan tipe umum sebagai cadangan.
    const contentType = contentTypes[extname(filePath)] || 'application/octet-stream';

    // Kirim status berhasil beserta tipe kontennya.
    response.writeHead(200, { 'Content-Type': contentType });
    // Kirim isi file lalu akhiri respons.
    response.end(fileContent);
  } catch {
    // Berikan status 404 kalau file benar-benar tidak dapat dibaca.
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    // Tampilkan pesan sederhana kepada pengguna.
    response.end('File tidak ditemukan');
  }
});

// Dengarkan port 3000 dari semua alamat agar dapat diakses Replit.
server.listen(port, '0.0.0.0', () => {
  // Tampilkan informasi port pada log ketika server berhasil menyala.
  console.log(`Server berjalan pada port ${port}`);
});
