// Head mengatur judul tab untuk halaman tambah kontak.
import Head from 'next/head'
// Link menyediakan tombol kembali ke halaman utama tanpa reload penuh.
import Link from 'next/link'
// useRouter dipakai untuk memindahkan halaman setelah data berhasil disimpan.
import { useRouter } from 'next/router'
// useState menyimpan pesan error yang datang dari server.
import { useState } from 'react'
// ContactForm adalah form yang sudah dibuat menjadi komponen supaya bisa dipakai ulang.
import ContactForm from '../components/ContactForm'

// AddContact menjadi halaman untuk memasukkan satu kontak baru.
export default function AddContact() {
  // router dipakai untuk kembali ke halaman utama setelah proses POST berhasil.
  const router = useRouter()
  // serverError menampung pesan jika penyimpanan data ke API gagal.
  const [serverError, setServerError] = useState('')

  // Fungsi ini menerima data yang sudah lolos validasi dari ContactForm.
  async function handleCreate(data) {
    // Error lama dibersihkan sebelum request baru dikirim.
    setServerError('')

    // POST dipakai karena request ini bertujuan membuat data baru.
    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    // Jika API mengembalikan status gagal, pesan server ditampilkan ke halaman.
    if (!response.ok) {
      const result = await response.json().catch(() => ({ message: 'Data gagal disimpan.' }))
      const message = result.message || 'Data gagal disimpan.'
      setServerError(message)
      throw new Error(message)
    }

    // Setelah data berhasil masuk database, pengguna dikembalikan ke daftar kontak.
    await router.push('/')
  }

  // Tampilan halaman tambah kontak dimulai dari sini.
  return (
    <>
      <Head>
        <title>Tambah Kontak - PBF 12</title>
      </Head>

      <main className="page-shell narrow-page">
        {/* Link ini dipakai jika pengguna ingin kembali tanpa menambah data. */}
        <Link className="back-link" href="/">← Kembali ke daftar</Link>

        <section className="card form-card">
          <p className="eyebrow">Create</p>
          <h1>Tambah Kontak</h1>
          <p className="subtitle">Isi data berikut, kemudian tekan tombol Simpan Kontak.</p>
          {/* Error dari API hanya ditampilkan saat memang ada masalah di server. */}
          {serverError && <p className="status-message error-status">{serverError}</p>}
          {/* ContactForm menerima fungsi handleCreate sebagai proses submit-nya. */}
          <ContactForm onSubmit={handleCreate} submitText="Simpan Kontak" />
        </section>
      </main>
    </>
  )
}
