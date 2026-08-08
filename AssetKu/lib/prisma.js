// lib/prisma.js
// ----------------------------------------------------------------------
// File ini bertugas membuat SATU instance (singleton) PrismaClient yang
// dipakai bersama oleh seluruh API routes di aplikasi.
//
// Kenapa perlu singleton? Saat development, Next.js melakukan hot-reload
// setiap kali ada perubahan file. Jika kita membuat "new PrismaClient()"
// di setiap request tanpa singleton, akan muncul banyak koneksi database
// baru setiap kali reload terjadi, yang akhirnya membuat error
// "too many connections". Dengan menyimpan instance di variabel global,
// instance yang sama akan dipakai ulang selama proses server hidup.
// ----------------------------------------------------------------------

import { PrismaClient } from "@prisma/client";

// Simpan Prisma Client di objek global (khusus untuk lingkungan development)
const globalForPrisma = globalThis;

// Jika sudah ada instance sebelumnya (misalnya karena hot-reload), pakai itu.
// Jika belum ada, buat instance PrismaClient yang baru.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // log: tampilkan query yang dijalankan di terminal saat development,
    // ini sangat membantu untuk debugging.
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

// Hanya simpan ke variabel global saat mode development, supaya di production
// (misalnya saat di-deploy sebagai serverless function) tidak menyimpan
// referensi yang tidak perlu di memory.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Export default juga disediakan supaya fleksibel saat di-import
export default prisma;
