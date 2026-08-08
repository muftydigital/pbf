// Prisma dipakai pada endpoint detail untuk membaca, mengubah, dan menghapus satu kontak.
import prisma from '../../../lib/prisma'

// Handler ini melayani /api/contacts/:id sesuai method HTTP yang dikirim.
export default async function handler(req, res) {
  // Query dari URL masih berupa string sehingga saya ubah menjadi number.
  const id = Number(req.query.id)
  // id harus bilangan bulat positif karena primary key Contact menggunakan integer autoincrement.
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: 'ID kontak tidak valid.' })
  }

  try {
    // GET mengambil satu kontak untuk halaman edit.
    if (req.method === 'GET') {
      const contact = await prisma.contact.findUnique({ where: { id } })
      // Jika record tidak ada, API mengembalikan status 404.
      if (!contact) return res.status(404).json({ message: 'Kontak tidak ditemukan.' })
      return res.status(200).json(contact)
    }

    // PUT memperbarui record yang sudah ada.
    if (req.method === 'PUT') {
      const { name, email, phone, address } = req.body
      // Data kosong ditolak sebelum query update dijalankan.
      if (!name?.trim() || !email?.trim() || !phone?.trim() || !address?.trim()) {
        return res.status(400).json({ message: 'Semua data wajib diisi.' })
      }

      // update mengganti data pada record yang memiliki id sesuai URL.
      const contact = await prisma.contact.update({
        where: { id },
        data: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
        },
      })
      return res.status(200).json(contact)
    }

    // DELETE menghapus satu record berdasarkan id.
    if (req.method === 'DELETE') {
      await prisma.contact.delete({ where: { id } })
      return res.status(200).json({ message: 'Kontak berhasil dihapus.' })
    }

    // Method selain tiga method di atas tidak digunakan pada endpoint detail.
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    return res.status(405).json({ message: 'Method tidak diizinkan.' })
  } catch (error) {
    // Prisma memakai kode P2025 saat proses update/delete mencari record yang sudah tidak ada.
    if (error?.code === 'P2025') {
      return res.status(404).json({ message: 'Kontak tidak ditemukan.' })
    }
    // Error lain dicatat untuk pengecekan server.
    console.error('API /contacts/[id] error:', error)
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' })
  }
}
