// Axios dipakai untuk melakukan request HTTP dari API route Next.js ke layanan luar.
import axios from 'axios'

// Handler ini akan dijalankan ketika browser mengakses endpoint /api/get-comment.
export default async function handler(req, res) {
  // try digunakan supaya API tetap memberi respons yang jelas jika request ke sumber data gagal.
  try {
    // Axios mengambil data komentar dari JSONPlaceholder.
    const response = await axios.get(
      // URL ini menyediakan contoh data komentar yang digunakan pada praktikum.
      'https://jsonplaceholder.typicode.com/posts/1/comments',
      // Objek konfigurasi ini mengatur header pada request Axios.
      {
        // Bagian headers berisi informasi tambahan yang dikirim bersama request.
        headers: {
          // Accept-Encoding bintang membuat request menerima encoding yang tersedia dari server tujuan.
          'Accept-Encoding': '*',
        // Menutup objek headers.
        },
      // Menutup objek konfigurasi Axios.
      }
    // Menutup pemanggilan axios.get setelah request selesai.
    )

    // Jika berhasil, API mengirim status 200 dan data komentar dalam bentuk JSON.
    res.status(200).json(response.data)
  // catch akan menangani kondisi ketika JSONPlaceholder tidak bisa diakses.
  } catch (error) {
    // Error dicetak ke log server agar penyebab masalah lebih mudah dicek.
    console.error('Gagal mengambil data API:', error.message)
    // Respons tetap berupa array supaya halaman client tidak rusak saat melakukan map.
    res.status(200).json([])
  // Menutup blok catch.
  }
// Menutup fungsi handler API.
}
