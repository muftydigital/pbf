// PrismaClient diperlukan untuk memasukkan contoh data ke database melalui kode JavaScript.
const { PrismaClient } = require('@prisma/client')

// Satu object Prisma dibuat khusus untuk proses seed.
const prisma = new PrismaClient()

// main berisi proses membersihkan tabel lalu menambahkan data contoh.
async function main() {
  // Data lama dihapus agar hasil seed selalu konsisten dan tidak menggandakan contoh kontak.
  await prisma.contact.deleteMany()
  // createMany memasukkan dua data contoh sekaligus.
  await prisma.contact.createMany({
    data: [
      { name: 'Andi Pratama', email: 'andi@example.com', phone: '081234567890', address: 'Serang' },
      { name: 'Siti Rahma', email: 'siti@example.com', phone: '089876543210', address: 'Cilegon' },
    ],
  })
}

// Fungsi seed mulai dijalankan dari sini.
main()
  // Jika terjadi error, pesannya dicetak dan exit code dibuat gagal.
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  // Koneksi selalu ditutup setelah proses selesai.
  .finally(async () => {
    await prisma.$disconnect()
  })
