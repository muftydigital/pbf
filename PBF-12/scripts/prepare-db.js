// Modul fs dipakai untuk mengecek file, membuat folder, dan menyalin database template.
const fs = require('fs')
// Modul path membantu membentuk lokasi file yang aman di Linux maupun Windows.
const path = require('path')

// Fungsi ini membaca DATABASE_URL dari environment atau dari file .env project.
function readDatabaseUrl() {
  // Environment variable diprioritaskan jika sudah disediakan platform.
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL
  // Lokasi .env dihitung dari root project.
  const envPath = path.join(process.cwd(), '.env')
  // Kalau .env tidak ada, nilai default lokal digunakan.
  if (!fs.existsSync(envPath)) return 'file:./dev.db'
  // Isi .env dibaca sebagai teks biasa.
  const content = fs.readFileSync(envPath, 'utf8')
  // Baris DATABASE_URL dicari dengan pola sederhana.
  const match = content.match(/^DATABASE_URL\s*=\s*["']?([^"'\r\n]+)["']?/m)
  // Jika tidak ditemukan, kembali ke database lokal di folder prisma.
  return match ? match[1].trim() : 'file:./dev.db'
}

// URL SQLite milik Prisma harus diawali file:.
const databaseUrl = readDatabaseUrl()
if (!databaseUrl.startsWith('file:')) {
  throw new Error('Project praktikum ini membutuhkan DATABASE_URL SQLite yang diawali file:.')
}

// Bagian setelah file: merupakan lokasi database SQLite.
const rawTarget = databaseUrl.slice('file:'.length)
// Path absolut langsung dipakai, sedangkan path relatif Prisma dihitung dari folder prisma.
const target = path.isAbsolute(rawTarget)
  ? rawTarget
  : path.resolve(process.cwd(), 'prisma', rawTarget.replace(/^\.\//, ''))
// template.db sudah berisi struktur tabel dan dua data awal untuk memastikan aplikasi langsung bisa dipakai.
const template = path.resolve(process.cwd(), 'prisma', 'template.db')

// Folder tujuan dibuat jika belum tersedia, misalnya /tmp pada Replit deployment.
fs.mkdirSync(path.dirname(target), { recursive: true })
// Database hanya disalin jika file tujuan belum ada agar data yang ditambah selama server hidup tidak terhapus saat restart proses.
if (!fs.existsSync(target)) {
  fs.copyFileSync(template, target)
  console.log(`Database praktikum disiapkan di ${target}`)
} else {
  console.log(`Database praktikum sudah tersedia di ${target}`)
}
