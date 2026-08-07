// Gunakan server HTTP bawaan Node.js untuk menampilkan hasil build React.
import { createServer } from 'node:http';
// readFile membaca file, sedangkan stat memeriksa file atau folder.
import { readFile, stat } from 'node:fs/promises';
// Fungsi path membantu mencari file di dalam folder dist dengan aman.
import { extname, join, relative } from 'node:path';
// Ubah alamat module menjadi lokasi folder yang dapat dibaca Node.js.
import { fileURLToPath } from 'node:url';

// Tentukan folder dist yang berisi hasil build dari Vite.
const distFolder = fileURLToPath(new URL('./dist/', import.meta.url));
// Gunakan port 3000 sesuai dengan pengaturan pada file .replit.
const port = 3000;

// Daftar ini menentukan tipe file yang dikirim kepada browser.
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
    // Ambil path dari alamat yang sedang dibuka.
    const pathname = new URL(request.url || '/', 'http://localhost').pathname;
    // Gunakan index.html ketika pengguna membuka halaman utama.
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
      // Kalau berupa folder, cari index.html di dalamnya.
      if (fileInfo.isDirectory()) {
        filePath = join(filePath, 'index.html');
      }
    } catch {
      // Rute React yang tidak berupa file diarahkan kembali ke index.html.
      filePath = join(distFolder, 'index.html');
    }

    // Baca isi file yang akan dikirim kepada browser.
    const fileContent = await readFile(filePath);
    // Pilih tipe konten sesuai ekstensi file.
    const contentType = contentTypes[extname(filePath)] || 'application/octet-stream';

    // Kirim status berhasil dan tipe kontennya.
    response.writeHead(200, { 'Content-Type': contentType });
    // Kirim isi file kemudian akhiri respons.
    response.end(fileContent);
  } catch {
    // Berikan status 404 apabila file tidak dapat dibaca.
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    // Tampilkan pesan yang mudah dipahami pengguna.
    response.end('File tidak ditemukan');
  }
});

// Jalankan server pada semua alamat jaringan di port 3000.
server.listen(port, '0.0.0.0', () => {
  // Tampilkan informasi port ketika server berhasil menyala.
  console.log(`Server berjalan pada port ${port}`);
});
