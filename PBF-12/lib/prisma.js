// PrismaClient dipakai untuk menghubungkan kode JavaScript dengan database.
import { PrismaClient } from '@prisma/client'

// Saat development Next.js bisa melakukan reload berkali-kali, jadi koneksi disimpan di object global.
const globalForPrisma = global

// Kalau koneksi lama sudah ada saya pakai lagi, kalau belum maka dibuat PrismaClient baru.
const prisma = globalForPrisma.prisma || new PrismaClient()

// Penyimpanan ke global hanya diperlukan saat bukan mode production supaya tidak membuat banyak koneksi saat hot reload.
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Object prisma diekspor supaya bisa dipakai oleh file API.
export default prisma
