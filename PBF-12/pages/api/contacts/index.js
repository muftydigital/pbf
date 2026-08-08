// Koneksi Prisma diimpor supaya endpoint ini bisa membaca dan menambah data Contact.
import prisma from '../../../lib/prisma'

// Handler ini melayani alamat /api/contacts.
export default async function handler(req, res) {
  // try-catch mencegah error database membuat request berhenti tanpa respons yang jelas.
  try {
    // GET dipakai saat halaman utama meminta seluruh daftar kontak.
    if (req.method === 'GET') {
      // findMany mengambil semua data dan saya urutkan dari id paling baru.
      const contacts = await prisma.contact.findMany({ orderBy: { id: 'desc' } })
      // Status 200 berarti request berhasil.
      return res.status(200).json(contacts)
    }

    // POST dipakai untuk membuat satu data kontak baru.
    if (req.method === 'POST') {
      // Hanya field yang memang dipakai aplikasi yang diambil dari body request.
      const { name, email, phone, address } = req.body
      // Validasi server tetap diperlukan walaupun form di browser sudah memiliki validasi.
      if (!name?.trim() || !email?.trim() || !phone?.trim() || !address?.trim()) {
        return res.status(400).json({ message: 'Semua data wajib diisi.' })
      }

      // create menyimpan data baru ke tabel Contact melalui Prisma.
      const contact = await prisma.contact.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
        },
      })

      // Status 201 digunakan karena server berhasil membuat resource baru.
      return res.status(201).json(contact)
    }

    // Header Allow menjelaskan method yang memang didukung endpoint ini.
    res.setHeader('Allow', ['GET', 'POST'])
    // Request selain GET dan POST ditolak dengan status 405.
    return res.status(405).json({ message: 'Method tidak diizinkan.' })
  } catch (error) {
    // Detail error dicatat di console server untuk membantu pengecekan saat development.
    console.error('API /contacts error:', error)
    // Pengguna cukup menerima pesan umum agar detail internal server tidak ikut terbuka.
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' })
  }
}
