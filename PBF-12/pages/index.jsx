// Head dipakai untuk mengatur judul tab browser dan meta description.
import Head from 'next/head'
// Link dipakai untuk pindah halaman tanpa reload penuh seperti link HTML biasa.
import Link from 'next/link'
// Hook React ini saya pakai untuk menyimpan data dan menjalankan proses saat halaman dibuka.
import { useCallback, useEffect, useState } from 'react'

// Home adalah halaman utama yang menampilkan seluruh data kontak.
export default function Home() {
  // contacts menyimpan daftar kontak hasil request ke API.
  const [contacts, setContacts] = useState([])
  // loading menandai apakah proses mengambil data masih berjalan.
  const [loading, setLoading] = useState(true)
  // message dipakai untuk memberi informasi berhasil atau gagal kepada pengguna.
  const [message, setMessage] = useState('')

  // useCallback membuat fungsi ini bisa dipakai ulang oleh useEffect dan setelah proses hapus.
  const loadContacts = useCallback(async () => {
    // Sebelum request dimulai status loading diaktifkan dan pesan lama dibersihkan.
    setLoading(true)
    setMessage('')

    // try-catch dipakai supaya error dari API tetap bisa ditampilkan dengan rapi.
    try {
      // Endpoint /api/contacts mengembalikan seluruh data kontak dari database.
      const response = await fetch('/api/contacts')
      // Kalau status HTTP tidak sukses, proses dilempar ke bagian catch.
      if (!response.ok) throw new Error('Gagal mengambil data kontak.')
      // Response JSON diubah menjadi object/array JavaScript.
      const data = await response.json()
      // Data terbaru dimasukkan ke state supaya tabel otomatis dirender ulang.
      setContacts(data)
    } catch (error) {
      // Pesan dari error disimpan agar bisa terlihat di halaman.
      setMessage(error.message || 'Terjadi kesalahan saat mengambil data.')
    } finally {
      // finally tetap berjalan baik request berhasil maupun gagal.
      setLoading(false)
    }
  }, [])

  // useEffect menjalankan loadContacts satu kali saat halaman pertama kali dibuka.
  useEffect(() => {
    loadContacts()
  }, [loadContacts])

  // Fungsi ini menangani tombol hapus berdasarkan id kontak yang dipilih.
  async function handleDelete(id) {
    // Konfirmasi sederhana mencegah data langsung terhapus karena salah klik.
    const approved = window.confirm('Yakin ingin menghapus kontak ini?')
    // Jika pengguna memilih batal, proses dihentikan sampai di sini.
    if (!approved) return

    // Pesan lama dikosongkan sebelum request DELETE dikirim.
    setMessage('')

    try {
      // Method DELETE dikirim ke endpoint detail sesuai id kontak.
      const response = await fetch(`/api/contacts/${id}`, { method: 'DELETE' })
      // Jika server menolak request, saya tampilkan pesan error dari API jika tersedia.
      if (!response.ok) {
        const result = await response.json().catch(() => ({}))
        throw new Error(result.message || 'Kontak gagal dihapus.')
      }
      // Setelah berhasil, tampilkan pesan dan ambil ulang data supaya tabel langsung terbaru.
      setMessage('Kontak berhasil dihapus.')
      await loadContacts()
    } catch (error) {
      // Error request DELETE ditampilkan ke pengguna.
      setMessage(error.message || 'Kontak gagal dihapus.')
    }
  }

  // Bagian return berisi tampilan halaman daftar kontak.
  return (
    <>
      {/* Informasi di dalam Head tidak tampil di halaman, tetapi dipakai oleh browser. */}
      <Head>
        <title>Contact App - Praktikum PBF 12</title>
        <meta name="description" content="Praktikum PBF 12 menggunakan Next.js, React Hook Form, API Route, dan Prisma" />
      </Head>

      {/* page-shell membatasi lebar isi agar tampil rapi di layar laptop maupun HP. */}
      <main className="page-shell">
        <div className="page-header">
          <div>
            {/* Teks kecil ini hanya menjadi penanda materi praktikum. */}
            <p className="eyebrow">Praktikum PBF Pertemuan 12</p>
            <h1>Daftar Kontak</h1>
            <p className="subtitle">CRUD sederhana menggunakan Next.js, React Hook Form, API Route, Prisma, dan SQLite.</p>
          </div>
          {/* Tombol ini mengarahkan pengguna ke halaman tambah data. */}
          <Link className="primary-button link-button" href="/add">+ Tambah Kontak</Link>
        </div>

        {/* Message hanya dirender kalau state-nya memiliki isi. */}
        {message && <p className="status-message">{message}</p>}

        {/* Card menjadi pembungkus utama tabel. */}
        <section className="card">
          {/* Saat loading, tabel belum ditampilkan agar pengguna tahu proses sedang berjalan. */}
          {loading ? (
            <p className="empty-state">Memuat data kontak...</p>
          ) : contacts.length === 0 ? (
            // Kondisi ini muncul kalau database belum memiliki kontak.
            <p className="empty-state">Belum ada data kontak.</p>
          ) : (
            // table-wrap membuat tabel bisa digeser secara horizontal di layar sempit.
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {/* Setiap th menjadi judul untuk kolom pada tabel. */}
                    <th>No.</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Telepon</th>
                    <th>Alamat</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {/* map mengubah setiap object contact menjadi satu baris tabel. */}
                  {contacts.map((contact, index) => (
                    <tr key={contact.id}>
                      <td>{index + 1}</td>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td>{contact.address}</td>
                      <td>
                        <div className="action-row">
                          {/* Id dimasukkan ke URL agar halaman edit tahu data mana yang harus diambil. */}
                          <Link className="secondary-button" href={`/edit/${contact.id}`}>Edit</Link>
                          {/* Arrow function dipakai supaya handleDelete baru berjalan ketika tombol diklik. */}
                          <button className="danger-button" type="button" onClick={() => handleDelete(contact.id)}>Hapus</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </>
  )
}
