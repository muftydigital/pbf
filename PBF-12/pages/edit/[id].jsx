// Head dipakai untuk memberi judul tab browser pada halaman edit.
import Head from 'next/head'
// Link dipakai untuk kembali ke halaman daftar kontak.
import Link from 'next/link'
// useRouter membaca parameter id dari URL dan juga dipakai untuk pindah halaman.
import { useRouter } from 'next/router'
// useEffect menjalankan pengambilan data saat id sudah tersedia, sedangkan useState menyimpan kondisi halaman.
import { useEffect, useState } from 'react'
// Form yang sama dengan halaman tambah digunakan kembali agar kode lebih ringkas.
import ContactForm from '../../components/ContactForm'

// EditContact menangani proses membaca dan memperbarui satu data kontak.
export default function EditContact() {
  // Object router memberikan akses ke query string dan fungsi navigasi.
  const router = useRouter()
  // id berasal dari nama file dinamis [id].jsx.
  const { id } = router.query
  // contact menyimpan data lama yang akan dimasukkan sebagai nilai awal form.
  const [contact, setContact] = useState(null)
  // loading dipakai selama request GET untuk detail kontak berlangsung.
  const [loading, setLoading] = useState(true)
  // serverError menyimpan pesan jika proses GET atau PUT gagal.
  const [serverError, setServerError] = useState('')

  // Effect ini baru bekerja setelah router berhasil mendapatkan nilai id.
  useEffect(() => {
    // Saat id belum ada, request tidak perlu dijalankan.
    if (!id) return

    // Fungsi async dibuat di dalam effect karena callback useEffect sendiri tidak dibuat async.
    async function loadContact() {
      setLoading(true)
      setServerError('')

      try {
        // GET ke endpoint detail mengambil satu kontak berdasarkan id.
        const response = await fetch(`/api/contacts/${id}`)
        if (!response.ok) {
          const result = await response.json().catch(() => ({}))
          throw new Error(result.message || 'Data kontak tidak ditemukan.')
        }
        // Data JSON yang diterima disimpan sebagai nilai awal ContactForm.
        const data = await response.json()
        setContact(data)
      } catch (error) {
        setServerError(error.message || 'Gagal mengambil data kontak.')
      } finally {
        setLoading(false)
      }
    }

    // Pemanggilan fungsi dimulai setelah seluruh fungsi didefinisikan.
    loadContact()
  }, [id])

  // Fungsi ini menerima data form terbaru untuk dikirim dengan method PUT.
  async function handleUpdate(data) {
    setServerError('')

    // PUT digunakan untuk memperbarui data yang sudah memiliki id.
    const response = await fetch(`/api/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    // Pesan API ditampilkan jika proses update tidak berhasil.
    if (!response.ok) {
      const result = await response.json().catch(() => ({ message: 'Data gagal diperbarui.' }))
      const message = result.message || 'Data gagal diperbarui.'
      setServerError(message)
      throw new Error(message)
    }

    // Setelah update berhasil, halaman kembali ke daftar utama.
    await router.push('/')
  }

  // Tampilan halaman edit dimulai di sini.
  return (
    <>
      <Head>
        <title>Edit Kontak - PBF 12</title>
      </Head>

      <main className="page-shell narrow-page">
        <Link className="back-link" href="/">← Kembali ke daftar</Link>

        <section className="card form-card">
          <p className="eyebrow">Update</p>
          <h1>Edit Kontak</h1>
          <p className="subtitle">Ubah data yang diperlukan, lalu simpan kembali.</p>
          {/* Error tetap terlihat supaya pengguna tahu jika data gagal dimuat atau disimpan. */}
          {serverError && <p className="status-message error-status">{serverError}</p>}
          {/* Saat loading tampil teks sederhana, setelah selesai baru form ditampilkan. */}
          {loading ? (
            <p className="empty-state">Memuat data...</p>
          ) : contact ? (
            // key memastikan form dibuat ulang jika pengguna berpindah ke id kontak lain.
            <ContactForm key={contact.id} defaultValues={contact} onSubmit={handleUpdate} submitText="Simpan Perubahan" />
          ) : null}
        </section>
      </main>
    </>
  )
}
