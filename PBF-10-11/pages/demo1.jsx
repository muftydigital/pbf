// Halaman Demo 1 mengambil data di sisi server sebelum halaman ditampilkan ke pengguna.
export default function Demo1(props) {
  // Bagian return digunakan untuk menampilkan data komentar dalam bentuk tabel.
  return (
    // Tabel ini menjadi tempat seluruh data komentar ditampilkan.
    <table>
      {/* Bagian thead berisi judul untuk setiap kolom tabel. */}
      <thead>
        {/* Satu baris ini digunakan untuk menampung nama-nama kolom. */}
        <tr>
          {/* Kolom pertama menampilkan ID komentar. */}
          <th>ID</th>
          {/* Kolom kedua menampilkan nama pengirim komentar. */}
          <th>Name</th>
          {/* Kolom ketiga menampilkan email pengirim komentar. */}
          <th>Email</th>
          {/* Kolom keempat menampilkan isi komentarnya. */}
          <th>Comment</th>
        {/* Menutup baris judul tabel. */}
        </tr>
      {/* Menutup bagian kepala tabel. */}
      </thead>
      {/* Bagian tbody dipakai untuk menampilkan isi data yang didapat dari server. */}
      <tbody>
        {/* Optional chaining dipakai supaya map hanya dijalankan kalau data comments tersedia. */}
        {props.comments?.map((comment) => (
          // key memakai id agar React dapat membedakan setiap baris data.
          <tr key={comment.id}>
            {/* Menampilkan nilai id dari objek comment. */}
            <td>{comment.id}</td>
            {/* Menampilkan nama dari objek comment. */}
            <td>{comment.name}</td>
            {/* Menampilkan email dari objek comment. */}
            <td>{comment.email}</td>
            {/* Menampilkan isi komentar dari objek comment. */}
            <td>{comment.body}</td>
          {/* Menutup satu baris komentar. */}
          </tr>
        // Proses map selesai setelah semua data komentar dibuat menjadi baris tabel.
        ))}
      {/* Menutup bagian isi tabel. */}
      </tbody>
    {/* Menutup elemen tabel. */}
    </table>
  // Menutup return komponen Demo1.
  )
// Menutup fungsi komponen Demo1.
}

// Fungsi khusus Next.js ini dijalankan di server setiap kali halaman Demo 1 diminta.
export async function getServerSideProps() {
  // try dipakai agar halaman tetap aman kalau layanan sumber data sedang bermasalah.
  try {
    // fetch meminta data komentar dari API JSONPlaceholder langsung dari sisi server.
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/2/comments')
    // Data respons yang masih berupa JSON diubah menjadi objek JavaScript.
    const comments = await res.json()
    // Data comments dikirim sebagai props untuk dipakai oleh komponen Demo1.
    return { props: { comments } }
  // catch akan dijalankan jika proses fetch atau pembacaan JSON gagal.
  } catch (error) {
    // Pesan ini membantu melihat masalah dari log server tanpa membuat halaman langsung error.
    console.error('Gagal mengambil data Demo 1:', error.message)
    // Jika API gagal, halaman tetap dibuka dengan data komentar kosong.
    return { props: { comments: [] } }
  // Menutup blok catch.
  }
// Menutup fungsi getServerSideProps.
}
