// Ambil CSS utama untuk mengatur tampilan daftar foto.
import './App.css';
// Axios digunakan untuk mengambil data dari API melalui HTTP.
import axios from 'axios';
// useEffect menjalankan proses setelah render dan useState menyimpan data.
import { useEffect, useState } from 'react';

// Simpan alamat API di satu tempat supaya lebih mudah dibaca dan diubah.
const photoApiUrl = 'https://jsonplaceholder.typicode.com/albums/1/photos';

// Komponen App berisi contoh pengambilan data foto dari API.
export default function App() {
  // isLoading menandai apakah proses mengambil data masih berjalan.
  const [isLoading, setLoading] = useState(false);
  // photos menyimpan daftar foto yang didapat dari API.
  const [photos, setPhotos] = useState([]);
  // errorMessage menyimpan pesan jika permintaan API gagal.
  const [errorMessage, setErrorMessage] = useState('');

  // Fungsi async ini mengambil daftar foto dari JSONPlaceholder.
  async function loadPhotos() {
    // Tampilkan status loading sebelum permintaan dimulai.
    setLoading(true);
    // Bersihkan pesan error dari percobaan sebelumnya.
    setErrorMessage('');

    try {
      // Tunggu respons dari API sebelum melanjutkan proses.
      const response = await axios.get(photoApiUrl);
      // Simpan data dari respons ke state photos.
      setPhotos(response.data);
    } catch {
      // Tampilkan pesan sederhana kalau data gagal diambil.
      setErrorMessage('Data foto gagal dimuat. Silakan coba lagi.');
    } finally {
      // Hentikan status loading, baik permintaan berhasil maupun gagal.
      setLoading(false);
    }
  }

  // Effect ini dijalankan satu kali saat komponen pertama kali tampil.
  useEffect(() => {
    // Panggil fungsi untuk mengambil data foto.
    loadPhotos();
  }, []);

  // Selama data belum selesai diambil, tampilkan keterangan loading.
  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  // Kalau permintaan gagal, tampilkan pesan error dan tombol coba lagi.
  if (errorMessage) {
    return (
      <main>
        {/* Pesan ini menjelaskan bahwa data belum berhasil dimuat. */}
        <h3>{errorMessage}</h3>
        {/* Tombol berikut mengulang permintaan ke API. */}
        <button type="button" onClick={loadPhotos}>
          Coba Lagi
        </button>
      </main>
    );
  }

  // Tampilkan judul dan kirim daftar foto ke komponen PhotoList.
  return (
    <main>
      {/* Judul materi praktikum API dan Router. */}
      <h2>Belajar React - API &amp; Router</h2>
      {/* photos dikirim melalui props supaya dapat ditampilkan sebagai kartu. */}
      <PhotoList photos={photos} />
    </main>
  );
}

// PhotoList menerima props photos dari komponen App.
function PhotoList({ photos }) {
  // Susun setiap data foto menjadi kartu di dalam baris.
  return (
    <div>
      {/* row menjadi pembungkus seluruh kolom foto. */}
      <div className="row">
        {/* map mengubah setiap objek foto menjadi elemen JSX. */}
        {photos.map((photo) => (
          // Gunakan id foto sebagai key karena nilainya berbeda untuk setiap data.
          <div className="column" key={photo.id}>
            {/* card menjadi kotak untuk satu data foto. */}
            <div className="card">
              {/* Tampilkan nomor foto berdasarkan id dari API. */}
              <h3>Photo {photo.id}</h3>
              {/* Gunakan thumbnailUrl sebagai sumber gambar kecil. */}
              <img
                src={photo.thumbnailUrl}
                width="160"
                alt={`Thumbnail ${photo.title}`}
              />
              {/* Batasi judul sampai 30 karakter agar kartu tetap rapi. */}
              <p>{photo.title.substring(0, 30)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
