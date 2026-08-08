// useEffect digunakan untuk menjalankan proses setelah halaman tampil, sedangkan useState menyimpan data komentar.
import { useEffect, useState } from 'react'

// Komponen Home ini menjadi halaman untuk Demo 2 atau pengambilan data dari sisi client.
export default function Home() {
  // State comments menyimpan daftar komentar dan nilai awalnya berupa array kosong.
  const [comments, setComments] = useState([])

  // useEffect dijalankan setelah komponen pertama kali tampil di browser.
  useEffect(() => {
    // fetch meminta data ke API internal Next.js yang ada di folder pages/api.
    fetch('/api/get-comment')
      // Respons dari API diubah dari format JSON menjadi data JavaScript.
      .then((res) => res.json())
      // Setelah data diterima, state comments diperbarui supaya tabel ikut berubah.
      .then((data) => setComments(data))
      // Jika request gagal, error dicatat dan state tetap menggunakan array kosong.
      .catch((error) => console.error('Gagal mengambil data Demo 2:', error.message))
  // Array kosong membuat effect ini cukup berjalan satu kali ketika halaman pertama kali dimuat.
  }, [])

  // Bagian return digunakan untuk menampilkan data dari state comments ke tabel.
  return (
    // Tabel ini menampilkan hasil fetch yang dilakukan dari browser.
    <table>
      {/* Bagian thead dipakai untuk judul setiap kolom. */}
      <thead>
        {/* Satu baris ini menampung semua judul kolom tabel. */}
        <tr>
          {/* Judul kolom untuk ID komentar. */}
          <th>ID</th>
          {/* Judul kolom untuk nama pengguna. */}
          <th>Name</th>
          {/* Judul kolom untuk email pengguna. */}
          <th>Email</th>
          {/* Judul kolom untuk isi komentar. */}
          <th>Comment</th>
        {/* Menutup baris kepala tabel. */}
        </tr>
      {/* Menutup bagian kepala tabel. */}
      </thead>
      {/* Bagian tbody berisi data komentar yang diterima dari API. */}
      <tbody>
        {/* map mengulang setiap data komentar agar menjadi satu baris tabel. */}
        {comments.map((comment) => (
          // id digunakan sebagai key karena nilainya berbeda untuk setiap komentar.
          <tr key={comment.id}>
            {/* Mengambil nilai id dari data komentar. */}
            <td>{comment.id}</td>
            {/* Mengambil nilai nama dari data komentar. */}
            <td>{comment.name}</td>
            {/* Mengambil nilai email dari data komentar. */}
            <td>{comment.email}</td>
            {/* Mengambil nilai body sebagai isi komentar. */}
            <td>{comment.body}</td>
          {/* Menutup satu baris data komentar. */}
          </tr>
        // Menutup proses perulangan map.
        ))}
      {/* Menutup isi tabel. */}
      </tbody>
    {/* Menutup elemen tabel. */}
    </table>
  // Menutup bagian return komponen.
  )
// Menutup fungsi Home.
}
